import { DrawingOptions, DrawingCircleOptions, DrawingTextOptions } from './Drawings';

export const VERSION: string = "0.0.2";

export const SECOND: number = 1000;

export enum INPUT_TYPE {
    KEYDOWN,
    KEYUP,
    MOUSE_MOVE,
    MOUSE_DOWN,
    MOUSE_UP
}

export enum MOUSE_BUTTON {
    LEFT,
    MIDDLE,
    RIGHT
}

export const DEFAULT_FONT: string = "impact";
export const DEFAULT_FONT_SIZE: number = 16;

export const THEME_BACKGROUND: string = "black";
export const THEME_FORECOLOR: string = "white";

export const DEFAULT_DRAW_OPTIONS: DrawingOptions = {
    line_width: 1,
    stroke: true,
    stroke_color: THEME_FORECOLOR,
    fill: false,
    fill_color: THEME_BACKGROUND
}

export const DEFAULT_DRAW_CIRCLE_OPTIONS: DrawingCircleOptions = {
    line_width: DEFAULT_DRAW_OPTIONS.line_width,
    stroke: DEFAULT_DRAW_OPTIONS.stroke,
    stroke_color: DEFAULT_DRAW_OPTIONS.stroke_color,
    fill: DEFAULT_DRAW_OPTIONS.fill,
    fill_color: DEFAULT_DRAW_OPTIONS.fill_color,
    radius: 0,
    angle: {
        start: 0,
        end: 2 * Math.PI
    },
    clockwise: false
}

export const DEFAULT_DRAW_TEXT_OPTIONS: DrawingTextOptions = {
    line_width: DEFAULT_DRAW_OPTIONS.line_width,
    stroke: false,
    stroke_color: DEFAULT_DRAW_OPTIONS.stroke_color,
    fill: true,
    fill_color: DEFAULT_DRAW_OPTIONS.fill_color,
    font_size: DEFAULT_FONT_SIZE,
    font_name: DEFAULT_FONT,
    center: true,
    blur: {
        x: 0,
        y: 0,
        size: 0,
        color: THEME_BACKGROUND,
    }
}