/*
 Dependencies:
 */
import {GameObject} from "./GameObject";
import {Vector2D} from "./Vector2D";

class GameScene {
    public objects: GameObject[] = [];

    public constructor(public id: string) {}

    /*
     * update: updates the scene.
     * no parameters
     */
    public update(): void {
        for (let object of this.objects) {
            object.update();
        }
    }

    /*
     * render: renders the scene.
     * no parameters
     */
    public render(): void {
        for (let object of this.objects) {
            object.render();
        }
    }

    /*
     * onEnter: returns true if entering the scene was successful, false otherwise
     * no parameters
     */
    public onEnter(): boolean {
        return true;
    }

    /*
     * Input Handler functions:
     */

    public onKeyDown(key: number): void {}

    public onKeyUp(key: number): void {}

    public onMouseMove(pos: Vector2D): void {}

    public onMouseDown(button: number, pos: Vector2D): void {}

    public onMouseUp(button: number, pos: Vector2D): void {}

    /*
     * onExit: returns true if exiting the scene was successful, false otherwise
     * no parameters
     */
    public onExit(): boolean {
        return true;
    }
}

export {GameScene};
