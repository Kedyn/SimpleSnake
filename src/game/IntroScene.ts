import {GameScene} from "../framework/GameScene";
import {Game} from "../framework/Game";
import {RectangularGameObject, GameObject} from "../framework/GameObject";
import {Vector2D} from "../framework/Vector2D";
import {RectangleDrawing, ImageDrawing} from "../framework/Drawing";
import {MenuScene} from "./MenuScene";

const BACKGROUND = '#000000';
const DELAY: number = 3000; //from 1000 milliseconds

class IntroScene extends GameScene {
    constructor(private game: Game) {
        super("intro");
        let canvas_context = game.canvas.getContext("2d");
        let width = game.canvas.width;
        let height = game.canvas.height;
        let bg_rect = new RectangularGameObject(new Vector2D(0,0), width, height);
        let bg = new RectangleDrawing(bg_rect, BACKGROUND, true, canvas_context);
        let logo = new ImageDrawing(new Vector2D(width / 2, height / 2), <HTMLImageElement>document.getElementById("img_logo"), true, canvas_context);
        this.objects.push(new GameObject(bg));
        this.objects.push(new GameObject(logo));
        let time = new Date();
        this.start_time = time.getTime();
    }

    public update(): void {
        let time = new Date();
        if (time.getTime() - this.start_time >= DELAY) {
            this.game.changeScene(new MenuScene(this.game));
        }
    }

    private start_time: number;
}

export {IntroScene};