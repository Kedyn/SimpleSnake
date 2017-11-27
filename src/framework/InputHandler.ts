import { INPUT_TYPE } from './Tools/constants';
import { KEYCODE } from './Tools/KeyCode';
import { MOUSE_BUTTON } from "./Tools/constants";
import { SimpleGame } from './Game';

interface mouse_callbacks {
    onKeyDown:   Array<any>;
    onKeyUp:     Array<any>;
    onMouseMove: Array<any>;
    onMouseDown: Array<any>;
    onMouseUp:   Array<any>;
}

class InputHandler {
    public static GetInstance(): InputHandler {
        if (!InputHandler.instance) {
            InputHandler.instance = new InputHandler();
        }

        return InputHandler.instance;
    }

    public listen(type: INPUT_TYPE, callback: any): void {
        if (!this.initiated) {
            this.init();
        }

        if (type == INPUT_TYPE.KEYDOWN) {
            this.callbacks.onKeyDown.push(callback);
        }
        else if (type == INPUT_TYPE.KEYUP) {
            this.callbacks.onKeyUp.push(callback);
        }
        else if (type == INPUT_TYPE.MOUSE_MOVE) {
            this.callbacks.onMouseMove.push(callback);
        }
        else if (type == INPUT_TYPE.MOUSE_DOWN) {
            this.callbacks.onMouseDown.push(callback);
        }
        else if (type == INPUT_TYPE.MOUSE_UP) {
            this.callbacks.onMouseUp.push(callback);
        }
    }

    public removeListens(): void {
        this.resetCallbacks();
    }

    public isKeyDown(key: KEYCODE): boolean {
        if (this.keys[key]) {
            return this.keys[key];
        }

        return false;
    }

    public mousePos(): { x: number, y: number } {
        return this.mouse_pos;
    }

    public isMouseButtonDown(button: MOUSE_BUTTON): boolean {
        if (this.mouse_buttons[button]) {
            return this.mouse_buttons[button];
        }

        return false;
    }

    private static instance: InputHandler;

    private keys:          boolean[];
    private mouse_buttons: boolean[];
    private mouse_pos:     { x: number, y: number };
    private callbacks:     mouse_callbacks;
    private initiated:     boolean;

    private constructor() {
        this.keys          = [];
        this.mouse_buttons = [];

        this.resetCallbacks();

        for (let key in KEYCODE) {
            let int = parseInt(key, 10);
            if (!isNaN(int)) {
                this.keys[int] = false;
            }
        }

        this.mouse_buttons[MOUSE_BUTTON.LEFT] = false;
        this.mouse_buttons[MOUSE_BUTTON.MIDDLE] = false;
        this.mouse_buttons[MOUSE_BUTTON.RIGHT] = false;
        
        this.mouse_pos = { x: 0, y: 0 };

        this.initiated = false;
    }

    private init(): void {
        SimpleGame.getCanvas().tabIndex = 0;

        SimpleGame.getCanvas().addEventListener("keydown",   this.onKeyDown,   false);
        SimpleGame.getCanvas().addEventListener("keyup",     this.onKeyUp,     false);
        SimpleGame.getCanvas().addEventListener("mousemove", this.onMouseMove, false);
        SimpleGame.getCanvas().addEventListener("mousedown", this.onMouseDown, false);
        SimpleGame.getCanvas().addEventListener("mouseup",   this.onMouseUp,   false);

        SimpleGame.getCanvas().onclick       = (ev: MouseEvent)   => { return false; };
        SimpleGame.getCanvas().oncontextmenu = (ev: PointerEvent) => { return false; };
        SimpleGame.getCanvas().onwheel       = (ev: WheelEvent)   => { return false; };

        SimpleGame.getCanvas().focus();

        this.initiated = true;

        SimpleGame.log("Input Handler initiated...");
    }

    private resetCallbacks(): void {
        this.callbacks = {
            onKeyDown  :  [],
            onKeyUp    :  [],
            onMouseMove:  [],
            onMouseDown:  [],
            onMouseUp  :  []
        };
    }

    private onKeyDown(ev: KeyboardEvent): void {
        ev.preventDefault();
        SimpleInputHandler.keys[ev.keyCode] = true;

        for (let callback of SimpleInputHandler.callbacks["onKeyDown"]) {
            callback(ev.keyCode);
        }
    }

    private onKeyUp(ev: KeyboardEvent): void {
        SimpleInputHandler.keys[ev.keyCode] = false;

        for (let callback of SimpleInputHandler.callbacks["onKeyUp"]) {
            callback(ev.keyCode);
        }
    }

    private onMouseMove(ev: MouseEvent): void {
        let x: number = ev.pageX;
        let y: number = ev.pageY;

        x -= SimpleGame.getCanvas().offsetLeft;
        y -= SimpleGame.getCanvas().offsetTop;

        SimpleInputHandler.mouse_pos.x = x;
        SimpleInputHandler.mouse_pos.y = y;

        for (let callback of SimpleInputHandler.callbacks["onMouseMove"]) {
            callback(SimpleInputHandler.mouse_pos);
        }
    }

    private onMouseDown(ev: MouseEvent): void {
        SimpleInputHandler.mouse_buttons[ev.button] = true;
        
        for (let callback of SimpleInputHandler.callbacks["onMouseDown"]) {
            callback(ev.button, SimpleInputHandler.mouse_pos);
        }
    }

    private onMouseUp(ev: MouseEvent): void {
        SimpleInputHandler.mouse_buttons[ev.button] = false;

        for (let callback of SimpleInputHandler.callbacks["onMouseUp"]) {
            callback(ev.button, SimpleInputHandler.mouse_pos);
        }
    }
}

export const SimpleInputHandler: InputHandler = InputHandler.GetInstance();