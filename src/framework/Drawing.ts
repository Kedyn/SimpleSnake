/*
 Dependencies:
 */
import {AnyGameObject, RectangularGameObject, PolyGameObject, CircularGameObject} from "./GameObject";
import {Vector2D} from "./Vector2D";

abstract class Drawing {
    public object: AnyGameObject;

    public constructor() {}

    abstract draw(): void;
}

class RectangleDrawing extends Drawing {
    public constructor(public object: RectangularGameObject, public color: string, public fill: boolean, private canvas_context: CanvasRenderingContext2D) {
        super();
    }

    draw(): void {
        if (this.fill) {
            this.canvas_context.fillStyle = this.color;
            this.canvas_context.fillRect(this.object.position.x, this.object.position.y, this.object.width, this.object.height);
        }
        else {
            this.canvas_context.strokeStyle = this.color;
            this.canvas_context.lineWidth = 1;
            this.canvas_context.strokeRect(this.object.position.x, this.object.position.y, this.object.width, this.object.height);
        }
    }
}

class LineDrawing extends Drawing {
    constructor(public start_position: Vector2D, public end_position: Vector2D, public color: string, private canvas_context: CanvasRenderingContext2D) {
        super();
        this.object = new PolyGameObject(start_position, [end_position]);
    }

    draw(): void {
        this.canvas_context.strokeStyle = this.color;
        this.canvas_context.moveTo(this.start_position.x, this.start_position.y);
        this.canvas_context.lineTo(this.end_position.x,this.end_position.y);
        this.canvas_context.lineWidth = 1;
        this.canvas_context.stroke();
    }
}

class CircleDrawing extends Drawing {
    constructor(public object: CircularGameObject, public color: string, public start_angle: number, public end_angle: number, public clockwise: boolean, public fill: boolean, private canvas_context: CanvasRenderingContext2D) {
        super();
    }

    draw(): void {
        this.canvas_context.beginPath();
        this.canvas_context.arc(this.object.position.x, this.object.position.y, this.object.radius, this.start_angle, this.end_angle, this.clockwise);
        if (this.fill) {
            this.canvas_context.fillStyle = this.color;
            this.canvas_context.fill();
        }
        else {
            this.canvas_context.strokeStyle = this.color;
            this.canvas_context.lineWidth = 1;
            this.canvas_context.stroke();
        }
    }
}

class TextDrawing extends Drawing {
    constructor(position: Vector2D, public font_size: number, public font_name: string, public color: string, public text: string, public center: boolean, public fill: boolean, private canvas_context: CanvasRenderingContext2D) {
        super();
        canvas_context.save();
        canvas_context.font = font_size + "px " + font_name;
        let width = canvas_context.measureText(text).width;
        this.object = new RectangularGameObject(position,width,font_size);
        canvas_context.restore();
    }

    draw(): void {
        this.canvas_context.font = this.font_size + "px " + this.font_name;
        this.canvas_context.textAlign = "left";
        if (this.center) {
            this.canvas_context.textAlign = "center";
        }
        if (this.fill) {
            this.canvas_context.fillStyle = this.color;
            this.canvas_context.fillText(this.text, this.object.position.x, this.object.position.y);
        }
        else {
            this.canvas_context.strokeStyle = this.color;
            this.canvas_context.strokeText(this.text, this.object.position.x, this.object.position.y);
        }
    }
}

class ImageDrawing extends Drawing {
    public width: number;
    public height: number;
    constructor(public position: Vector2D, public image: HTMLImageElement, public center: boolean, private canvas_context: CanvasRenderingContext2D, width?: number, height?: number) {
        super();
        if (this.center) {
            position.x -= image.width / 2;
            position.y -= image.height / 2;
        }
        if (width && height) {
            this.width = width;
            this.height = height;
        }
        else {
            this.width = image.width;
            this.height = image.height;
        }
        this.object = new RectangularGameObject(position,width,height);
    }

    draw(): void {
        this.canvas_context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

export {Drawing, RectangleDrawing, LineDrawing, CircleDrawing, TextDrawing, ImageDrawing};