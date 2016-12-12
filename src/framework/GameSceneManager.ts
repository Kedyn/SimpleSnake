/*
 Dependencies:
 */
import {GameScene} from "./GameScene";
import {KEYCODE} from "./KeyCode";
import {Vector2D} from "./Vector2D";

class GameSceneManager {
    public constructor() {}

    /*
     * pushScene: adds a scene and makes it the current scene of the game.
     * @scene: GameScene, the scene you want to add to your game.
     */
    public pushScene(scene: GameScene): void {
        this.scenes.push(scene);
    }

    /*
     * changeScene: replaces the current scene with the specified scene.
     * @scene: GameScene, the scene you want to put in place of the current scene.
     */
    public changeScene(scene: GameScene): void {
        if (this.scenes.length) {
            if (this.scenes[this.scenes.length - 1].id != scene.id) {
                this.scenes.push(scene);
                if (this.scenes[this.scenes.length - 1].onExit()) {
                    this.scenes.splice(this.scenes.length - 2, 1);
                }
                else {
                    console.log("Error exiting scene " + this.scenes[this.scenes.length - 1].id);
                }
                if (!this.scenes[this.scenes.length - 1].onEnter()) {
                    console.log("Error while changing scene");
                }
            }
            else {
                console.log("Cannot change to the same scene");
            }
        }
        else {
            console.log("Cannot change scene when there are no current scenes");
        }
    }

    /*
     * popScene: removes the current scene and makes the previous scene the current scene.
     * no parameters
     */
    public popScene(): void {
        if (this.scenes.length > 1) {
            if (this.scenes[this.scenes.length - 1].onExit()) {
                this.scenes.pop();
            }
        }
    }

    /*
     * currentScene: returns the current game scene.
     * no parameters
     */
    public currentScene(): GameScene {
        return this.scenes[this.scenes.length - 1];
    }

    /*
     * update: updates the current scene.
     * no parameters
     */
    public update(): void {
        this.currentScene().update();
    }

    /*
     * render: renders the current scene.
     * no parameters
     */
    public render(): void {
        this.currentScene().render();
    }

    private scenes: GameScene[] = [];

    /*
     * Input Handler functions:
     */

    public onKeyDown(key: KEYCODE): void {
        this.currentScene().onKeyDown(key);
    }

    public onKeyUp(key: KEYCODE): void {
        this.currentScene().onKeyUp(key);
    }

    public onMouseMove(pos: Vector2D): void {
        this.currentScene().onMouseMove(pos);
    }

    public onMouseDown(button: number, pos: Vector2D): void {
        this.currentScene().onMouseDown(button, pos);
    }

    public onMouseUp(button: number, pos: Vector2D): void {
        this.currentScene().onMouseUp(button, pos);
    }
}

export {GameSceneManager};