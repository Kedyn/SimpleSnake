import {
    DEFAULT_DRAW_CIRCLE_OPTIONS,
    DEFAULT_DRAW_OPTIONS,
    DEFAULT_DRAW_TEXT_OPTIONS,
    DEFAULT_FONT,
    DEFAULT_FONT_SIZE,
    THEME_BACKGROUND,
    THEME_FORECOLOR,
} from './constants';
import { SimpleGame } from "./../Game";

export interface DrawingOptions {
    line_width?: number,
    stroke?: boolean,
    stroke_color?: string,
    fill?: boolean,
    fill_color?: string
}

export interface DrawingCircleOptions extends DrawingOptions {
    radius?: number,
    angle?: {
        start?: number,
        end?: number
    },
    clockwise?: boolean
}

export interface DrawingImageOptions extends DrawingOptions {
    center?: boolean,
    width?: number,
    height?: number,
    only_show?: {
        x?: number,
        y?: number,
        width?: number,
        height?: number
    }
}

export interface DrawingTextOptions extends DrawingOptions {
    font_size?: number,
    font_name?: string,
    center?: boolean,
    blur?: {
        x?: number,
        y?: number,
        size?: number,
        color?: string
    }
}

function checkUnsetOptions(options: DrawingOptions, default_options: DrawingOptions): void {
    for (const prop in default_options) {
        if (!options.hasOwnProperty(prop)) {
            options[prop] = default_options[prop];
        }
    }
}
    
function drawOptions(context: CanvasRenderingContext2D, options: DrawingOptions): void {
    if (options.fill) {
        context.fillStyle = options.fill_color;
        context.fill();
    }
    if (options.stroke) {
        context.lineWidth = options.line_width;
        context.strokeStyle = options.stroke_color;
        context.stroke();
    }
}

export function drawLine(points: Array<{ x: number, y: number }>, options: DrawingOptions = {}): void {
    let context = SimpleGame.getCanvas().getContext("2d");
    context.save();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; ++i) {
        context.lineTo(points[i].x, points[i].y);
    }
    checkUnsetOptions(options, DEFAULT_DRAW_OPTIONS);
    if (options.fill) {
        context.closePath();
    }
    drawOptions(context, options);
    context.restore();
}

export function drawCircle(x: number, y: number, options: DrawingCircleOptions = {}): void {
    let context = SimpleGame.getCanvas().getContext("2d");
    context.save();
    context.beginPath();
    checkUnsetOptions(options, DEFAULT_DRAW_CIRCLE_OPTIONS);    
    context.arc(x, y, options.radius, options.angle.start, options.angle.end, options.clockwise);
    drawOptions(context, options);
    context.restore();
}

export function drawRect(x: number, y: number, width: number, height: number, options: DrawingOptions = {}): void {
    let context = SimpleGame.getCanvas().getContext("2d");
    context.save();
    checkUnsetOptions(options, DEFAULT_DRAW_OPTIONS);
    if (options.fill) {
        context.fillStyle = options.fill_color;
        context.fillRect(x, y, width, height);
    }
    if (options.stroke) {
        context.rect(x, y, width, height);
        context.lineWidth = options.line_width;
        context.strokeStyle = options.stroke_color;
        context.stroke();
    }
    context.restore();
}

export function drawImage(x: number, y: number, image: HTMLImageElement, options: DrawingImageOptions = {}): void {
    let context = SimpleGame.getCanvas().getContext("2d");
    context.save();
    if (!options.width) {
        options.width = image.width;
    }
    if (!options.height) {
        options.width = image.width;
    }
    if (!options.only_show.x) {
        options.only_show.x = 0;
    }
    if (!options.only_show.y) {
        options.only_show.y = 0;
    }
    if (!options.only_show.width) {
        options.only_show.width = options.width;
    }
    if (!options.only_show.height) {
        options.only_show.height = options.height;
    }
    if (options.center) {
        x -= options.only_show.width / 2;
        y -= options.only_show.height / 2;
    }
    context.drawImage(image, x, y, options.width, options.height, options.only_show.x, options.only_show.y, options.only_show.width, options.only_show.height);
    context.restore();
}

export function drawText(x: number, y: number, text: string, options: DrawingTextOptions = {}): void {
    let context = SimpleGame.getCanvas().getContext("2d");
    let height = getTextSize(text, options.font_size, options.font_name).height;
    context.save();
    checkUnsetOptions(options, DEFAULT_DRAW_TEXT_OPTIONS); 
    context.font = options.font_size + "px " +  options.font_name;
    if (options.center) {
        context.textAlign = "center";
        context.textBaseline = "middle";
    }
    else {
        context.textAlign = "left";
        context.textBaseline = "bottom";
    }
    if (options.fill) {
        context.fillStyle = options.fill_color;
        context.fillText(text, x, y);
    }
    if (options.stroke) {
        context.lineWidth = options.line_width;
        context.strokeStyle = options.stroke_color;
        context.strokeText(text, x, y);
    }
    if (options.blur.size) {
        context.shadowBlur = options.blur.size;
        context.shadowColor = options.blur.color;
        context.shadowOffsetX = options.blur.x;
        context.shadowOffsetY = options.blur.y;
    }
    context.restore();
}

export function getTextSize(text: string, font_size: number = DEFAULT_FONT_SIZE, font_name: string = DEFAULT_FONT): { width: number, height: number } {
    let context = SimpleGame.getCanvas().getContext("2d");
    let font = font_size + "px " +  font_name;
    context.save();
    context.font = font;
    let width = context.measureText(text).width;
    context.restore();
    return {
        width: width,
        height: font_size
    };
}