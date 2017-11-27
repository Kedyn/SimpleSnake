import { SimpleGame } from "./Game";
import { Scene } from "./Scene";
import { SimpleInputHandler } from './InputHandler';
import { KEYCODE } from "./Tools/KeyCode";
import { INPUT_TYPE, MOUSE_BUTTON } from "./Tools/constants";

class SceneManager {
    public static GetInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        
        return SceneManager.instance;
    }

    public pushScene(scene: Scene): void {
        if (!this.input_handler) {
            SimpleInputHandler.listen(INPUT_TYPE.KEYDOWN   , this.onKeyDown);
            SimpleInputHandler.listen(INPUT_TYPE.KEYUP     , this.onKeyUp);
            SimpleInputHandler.listen(INPUT_TYPE.MOUSE_MOVE, this.onMouseMove);
            SimpleInputHandler.listen(INPUT_TYPE.MOUSE_DOWN, this.onMouseDown);
            SimpleInputHandler.listen(INPUT_TYPE.MOUSE_UP  , this.onMouseUp);
            
            this.input_handler = true;
        }
        if (this.onCurrentSceneExit()) {
            //SimpleInputHandler.removeListens();
            this.scenes.push(scene);
        }
        else {
            SimpleGame.log("Error exiting scene " + this.currentScene().id);
        }
        if (!this.onCurrentSceneEnter()) {
            SimpleGame.log("Error while entering scene");            
        }
    }

    public changeScene(scene: Scene): void {
        if (this.scenes.length) {
            if (this.scenes[this.scenes.length - 1].id != scene.id) {
                this.scenes.push(scene);
                if (this.onCurrentSceneExit()) {
                    //SimpleInputHandler.removeListens();
                    this.scenes.splice(this.scenes.length - 2, 1);
                }
                else {
                    SimpleGame.log("Error exiting scene " + this.currentScene().id);
                }
                if (!this.onCurrentSceneEnter()) {
                    SimpleGame.log("Error while changing scene");
                }
            }
            else {
                SimpleGame.log("Cannot change to the same scene");
            }
        }
        else {
            SimpleGame.log("Cannot change scene when there are no current scenes");
        }
    }

    public popScene(): void {
        if (this.scenes.length > 1) {
            if (this.onCurrentSceneExit()) {
                //SimpleInputHandler.removeListens();
                this.scenes.pop();
                if (!this.onCurrentSceneEnter()) {
                    SimpleGame.log("Error while entering scene");            
                }
            }
        }
    }

    public currentScene(): Scene {
        return this.scenes[this.scenes.length - 1];
    }

    public update(elapse_time: number): void {
        this.currentScene().update(elapse_time);
        for (let game_object of this.currentScene().game_objects) {
            game_object.update();
        }
    }

    public render(elapse_time: number): void {
        this.currentScene().render(elapse_time);
        for (let game_object of this.currentScene().game_objects) {
            game_object.render();
        }
    }
    
    private static instance: SceneManager;

    private scenes:        Scene[];
    private input_handler: boolean;

    private constructor() {
        this.scenes = [];
        this.input_handler = false;
    }

    private onCurrentSceneEnter(): boolean {
        let enter = false;
        if (this.currentScene().onEnter()) {
            enter = true;
            let i = 0;
            let looping = true;
            let game_objects = this.currentScene().game_objects;
            while (looping) {
                if (i < game_objects.length) {
                    if (!game_objects[i].onEnter()) {
                        enter = false;
                        looping = false;
                    }
                }
                else {
                    looping = false;
                }
                i++;
            }
        }
        return enter;
    }

    private onCurrentSceneExit(): boolean {
        let exit = false;
        if (this.scenes.length) {
            if (this.currentScene().onExit()) {
                exit = true;
                let i = 0;
                let looping = true;
                let game_objects = this.currentScene().game_objects;
                while (looping) {
                    if (i < game_objects.length) {
                        if (!game_objects[i].onExit()) {
                            exit = false;
                            looping = false;
                        }
                    }
                    else {
                        looping = false;
                    }
                    i++;
                }
            }
        }
        else {
            exit = true;
        }
        return exit;
    }

    private onKeyDown(key: KEYCODE): void {
        SimpleSceneManager.currentScene().onKeyDown(key);
        for (let game_object of SimpleSceneManager.currentScene().game_objects) {
            game_object.onKeyDown(key);
        }
    }

    private onKeyUp(key: KEYCODE): void {
        SimpleSceneManager.currentScene().onKeyUp(key);
        for (let game_object of SimpleSceneManager.currentScene().game_objects) {
            game_object.onKeyUp(key);
        }
    }

    private onMouseMove(pos: { x: number, y: number }): void {
        SimpleSceneManager.currentScene().onMouseMove(pos.x, pos.y);
        for (let game_object of SimpleSceneManager.currentScene().game_objects) {
            game_object.onMouseMove(pos.x, pos.y);
        }
    }

    private onMouseDown(button: MOUSE_BUTTON, pos: { x: number, y: number }): void {
        SimpleSceneManager.currentScene().onMouseDown(button, pos.x, pos.y);
        for (let game_object of SimpleSceneManager.currentScene().game_objects) {
            game_object.onMouseDown(button, pos.x, pos.y);
        }
    }

    private onMouseUp(button: MOUSE_BUTTON, pos: { x: number, y: number }): void {
        SimpleSceneManager.currentScene().onMouseUp(button, pos.x, pos.y);
        for (let game_object of SimpleSceneManager.currentScene().game_objects) {
            game_object.onMouseUp(button, pos.x, pos.y);
        }
    }
}

export const SimpleSceneManager: SceneManager = SceneManager.GetInstance();