import {Drawing, RectangleDrawing, TextDrawing} from "./Drawing";
import {RectangularGameObject, GameObject} from "./GameObject";
import {Vector2D} from "./Vector2D";
import {InputHandler} from "./InputHandler";

const BACKGROUND = "#1F1F1F";
const LIGHT      = "#2F2F2F";
const SHADOW     = "#0F0F0F";
const BORDER     = "#000000";
const TEXT       = "#FFFFFF";
const FONT_SIZE  = 14;
const FONT_NAME  = "impact";

class ButtonDrawing extends Drawing {
    public pressed: boolean;

    public constructor(public object: RectangularGameObject, public text: string, private canvas_context: CanvasRenderingContext2D) {
        super();
        let bg_rect = new RectangularGameObject(new Vector2D(object.position.x, object.position.y), object.width, object.height);
        let light_rect = new RectangularGameObject(new Vector2D(object.position.x + 1, object.position.y + 1), object.width - 1, object.height - 1);
        let shadow_rect = new RectangularGameObject(new Vector2D(object.position.x, object.position.y), object.width - 1, object.height - 1);
        let border_rect = new RectangularGameObject(new Vector2D(object.position.x, object.position.y), object.width, object.height);
        this.background = new RectangleDrawing(bg_rect, BACKGROUND, true, canvas_context);
        this.light = new RectangleDrawing(light_rect, LIGHT, false, canvas_context);
        this.shadow = new RectangleDrawing(shadow_rect, SHADOW, false, canvas_context);
        this.border = new RectangleDrawing(border_rect, BORDER, false, canvas_context);
        this.button_text = new TextDrawing(new Vector2D(object.position.x + (object.width / 2), object.position.y + (object.height + FONT_SIZE / 2) / 2), FONT_SIZE, FONT_NAME, TEXT, text, true, true, canvas_context);
    }

    public draw() {
        this.light.object.position.x = this.object.position.x + 1;
        this.light.object.position.y = this.object.position.y + 1;
        this.shadow.object.position.x = this.object.position.x;
        this.shadow.object.position.y = this.object.position.y;
        this.button_text.object.position.x = this.object.position.x + (this.object.width / 2);
        this.button_text.object.position.y = this.object.position.y + (this.object.height + FONT_SIZE / 2) / 2;
        if (this.pressed) {
            this.light.object.position.x = this.object.position.x;
            this.light.object.position.y = this.object.position.y;
            this.shadow.object.position.x = this.object.position.x + 1;
            this.shadow.object.position.y = this.object.position.y + 1;
            this.button_text.object.position.x = this.object.position.x + (this.object.width / 2) - 1;
            this.button_text.object.position.y = this.object.position.y + (this.object.height + FONT_SIZE / 2) / 2 - 1;
        }
        this.background.draw();
        this.light.draw();
        this.shadow.draw();
        this.border.draw();
        this.button_text.draw();
    }

    private background: RectangleDrawing;
    private light: RectangleDrawing;
    private shadow: RectangleDrawing;
    private border: RectangleDrawing;
    private button_text: TextDrawing;
}

class ButtonGameObject extends GameObject {
    public clicked: boolean;

    public constructor(object: RectangularGameObject, text: string, canvas_context: CanvasRenderingContext2D, private input_handler: InputHandler) {
        super(new ButtonDrawing(object, text, canvas_context));
        this.clicked = false;
    }

    public update(): void {
        this.clicked = ((<ButtonDrawing>this.drawing).pressed && !this.input_handler.isMouseButtonDown(0));
        (<ButtonDrawing>this.drawing).pressed = (this.cooInObject(this.input_handler.mousePos()) && this.input_handler.isMouseButtonDown(0));
    }
}

export {ButtonGameObject};