/*
 Dependencies:
 */
import {InputHandler} from "./InputHandler";
import {KEYCODE} from "./KeyCode";
import {Vector2D} from "./Vector2D";
import {GameSceneManager} from "./GameSceneManager";
import {GameScene} from "./GameScene";

/*
 Constants
 */
const SECOND: number = 1000; //in milliseconds

class Game {
    /*
     * constructor: constructs the game instance
     * @game_id: string, a game ID used for debugging purposes.
     * @canvas: HTMLCanvasElement, the canvas element that you wish your game to be drawn on.
     */
    public constructor(private game_id: string, public canvas: HTMLCanvasElement) {
        let callbacks = {
            "onKeyDown": this.onKeyDown,
            "onKeyUp": this.onKeyUp,
            "onMouseMove": this.onMouseMove,
            "onMouseDown": this.onMouseDown,
            "onMouseUp": this.onMouseUp
        };
        this.frame_rate = 60;
        let time = new Date();
        this.frame_counter = 0;
        this.last_time = time.getTime();
        this.input_handler = new InputHandler(this.canvas, callbacks);
        this.scene_manager = new GameSceneManager();
    }

    /*
     * init: initializes the game loop.
     * No parameters
     */
    public init(): void {
        requestAnimationFrame(this.animate);
    }

    /*
     * frameRate: sets frame rate.
     * @frame_rate: number, the number of frames per second.
     */
    public frameRate(frame_rate) {
        this.frame_rate = frame_rate;
    }

    /*
     * inputHandler: returns the current input handler.
     */
    public inputHandler(): InputHandler {
        return this.input_handler;
    }

    /*
     * Input Handler functions:
     */

    public isKeyDown(key: KEYCODE): boolean {
        return this.input_handler.isKeyDown(key);
    }

    public mousePos(): Vector2D {
        return this.input_handler.mousePos();
    }

    public isMouseButtonDown(button: number): boolean {
        return this.input_handler.isMouseButtonDown(button);
    }

    /*
     * Game Scene Manager functions:
     */

    public pushScene(scene: GameScene): void {
        this.scene_manager.pushScene(scene);
    }

    public changeScene(scene: GameScene): void {
        this.scene_manager.changeScene(scene);
    }

    public popScene(): void {
        this.scene_manager.popScene();
    }

    private frame_rate: number;
    private frame_counter: number;
    private last_time: number;
    private input_handler: InputHandler;
    private scene_manager: GameSceneManager;

    /*
     * Game Loop
     */
    private animate = (): void => {
        let time = new Date();
        let elapse = time.getTime() - this.last_time;
        let interval = SECOND / this.frame_rate;
        if (elapse > interval) {
            this.scene_manager.update();
            this.scene_manager.render();
            this.last_time = time.getTime() - (elapse % interval);
        }
        requestAnimationFrame(this.animate);
    };

    /*
     * The following are input handler callbacks
     */

    private onKeyDown = (key: KEYCODE): void => {
        this.scene_manager.onKeyDown(key);
    };

    private onKeyUp = (key: KEYCODE): void => {
        this.scene_manager.onKeyUp(key);
    };

    private onMouseMove = (pos: Vector2D): void => {
        this.scene_manager.onMouseMove(pos);
    };

    private onMouseDown = (button: number, pos: Vector2D): void => {
        this.scene_manager.onMouseDown(button, pos);
    };

    private onMouseUp = (button: number, pos: Vector2D): void => {
        this.scene_manager.onMouseUp(button, pos);
    };
}

export {Game};