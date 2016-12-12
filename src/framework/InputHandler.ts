/*
 Dependencies:
 */
import {Vector2D} from "./Vector2D";
import {KEYCODE} from "./KeyCode";

class InputHandler {
    /*
     Public:
    */

    /*
     * constructor: constructs the input handler instance
     * @canvas: HTMLCanvasElement, the canvas element that you wish your game to be drawn on.
     * @callbacks: Callback Functions array, array of callbacks for events.
     *             Current callbacks:
     *             "onKeyDown"   : emitted when a key is pressed
     *             "onKeyUp"     : emitted when a key is released
     *             "onMouseMove" : emitted when the mouse is moved
     *             "onMouseDown" : emitted when a mouse button is pressed
     *             "onMouseUp"   : emitted when a mouse button is released
     */
    public constructor(private canvas: HTMLCanvasElement, private callbacks: any) {
        //Adding event listeners for canvas
        canvas.tabIndex = 0;
        canvas.addEventListener("keydown",this.onKeyDown,false);
        canvas.addEventListener("keyup",this.onKeyUp,false);
        canvas.addEventListener("mousemove",this.onMouseMove,false);
        canvas.addEventListener("mousedown",this.onMouseDown,false);
        canvas.addEventListener("mouseup",this.onMouseUp,false);
        canvas.onclick = function (ev: MouseEvent) { return false; };
        canvas.oncontextmenu = function (ev: PointerEvent){ return false; };
        canvas.onwheel = function (ev: WheelEvent) { return false; };
        canvas.focus();

        //populating arrays
        for (let key in KEYCODE) {
            let int = parseInt(key,10);
            if (!isNaN(int)) {
                this.keys[int] = false;
            }
        }

        for (let i = 0; i < 10; i++) {
            this.mouse_buttons[i] = false;
        }

        this.mouse_pos = new Vector2D(0,0);
    }

    /*
     * isKeyDown: returns true if a "key" (KEYCODE) has been pressed, returns false otherwise
     * @key: KEYCODE, the key you wish to know if the key is down.
     */
    public isKeyDown(key: KEYCODE): boolean {
        if (this.keys[key]) {
            return this.keys[key];
        }
        return false;
    }

    /*
     * mousePos: returns a Vector2D with the mouse position
     * no parameters
     */
    mousePos(): Vector2D {
        return this.mouse_pos;
    }

    /*
     * isMouseButtonDown: returns true if a mouse button is pressed, false otherwise
     * @button: number, the mouse button you want to check
     *          Currently it can store up to 10 mouse buttons.
     *          0 is usually the left button
     *          1 is usually the mid button
     *          2 is usaully the right button
     */
    isMouseButtonDown(button: number): boolean {
        if (this.mouse_buttons[button]) {
            return this.mouse_buttons[button];
        }
        return false;
    }

    /*
     Private:
     */

    private keys: boolean[] = [];
    private mouse_buttons: boolean[] = [];
    private mouse_pos: Vector2D;

    //functions:

    /*
     * The following are function callbacks for events
     */

    private onKeyDown = (ev: KeyboardEvent): void => {
        ev.preventDefault();
        this.keys[ev.keyCode] = true;
        if (this.callbacks["onKeyDown"]) {
            this.callbacks["onKeyDown"](ev.keyCode);
        }
    };

    private onKeyUp = (ev: KeyboardEvent): void => {
        this.keys[ev.keyCode] = false;
        if (this.callbacks['onKeyUp']) {
            this.callbacks['onKeyUp'](ev.keyCode);
        }
    };

    private onMouseMove = (ev: MouseEvent): void => {
        let x: number = ev.pageX;
        let y: number = ev.pageY;
        x -= this.canvas.offsetLeft;
        y -= this.canvas.offsetTop;
        this.mouse_pos.x = x;
        this.mouse_pos.y = y;
        if (this.callbacks["onMouseMove"]) {
            this.callbacks["onMouseMove"](this.mouse_pos);
        }
    };

    private onMouseDown = (ev: MouseEvent): void => {
        this.mouse_buttons[ev.button] = true;
        if (this.callbacks["onMouseDown"]) {
            this.callbacks["onMouseDown"](ev.button,this.mouse_pos);
        }
    };

    private onMouseUp = (ev: MouseEvent): void => {
        this.mouse_buttons[ev.button] = false;
        if (this.callbacks["onMouseUp"]) {
            this.callbacks["onMouseUp"](ev.button,this.mouse_pos);
        }
    };
}

export {InputHandler};