import { SimpleGame } from './Game';
import { KEYCODE } from './Tools/KeyCode';
import { GameObject } from './GameObject';
import { MOUSE_BUTTON } from './Tools/constants';

export abstract class Scene {
    public game_objects: GameObject[];

    public constructor(public id: string) {
        SimpleGame.log(`Creating ${id} scene...`);
        this.game_objects = [];
    }

    public update(elapse_time: number): void {}

    public render(elapse_time: number): void {}

    public onEnter(): boolean {
        return true;
    }

    public onKeyDown(key: KEYCODE): void {}

    public onKeyUp(key: KEYCODE): void {}

    public onMouseMove(x: number, y: number): void {}

    public onMouseDown(button: MOUSE_BUTTON, x: number, y: number): void {}

    public onMouseUp(button: MOUSE_BUTTON, x: number, y: number): void {}

    public onExit(): boolean {
        return true;
    }
}