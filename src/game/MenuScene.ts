import {GameScene} from "../framework/GameScene";
import {Game} from "../framework/Game";
import {RectangularGameObject, GameObject} from "../framework/GameObject";
import {RectangleDrawing, TextDrawing} from "../framework/Drawing";
import {Vector2D} from "../framework/Vector2D";
import {ButtonGameObject} from "../framework/Button";
import {PlayScene} from "./PlayScene";
import {AboutScene} from "./AboutScene";

const BACKGROUND    = "#000000";
const TITLE_SIZE    = 50;
const TITLE_FONT    = "impact";
const TITLE_COLOR   = '#FFFFFF';
const BUTTON_WIDTH  = 150;
const BUTTON_HEIGHT = 30;
const BUTTON_SPACE  = 10;

class MenuScene extends GameScene {
    public constructor(private game: Game) {
        super("menu");
        let canvas_context = game.canvas.getContext("2d");
        let width = game.canvas.width;
        let height = game.canvas.height;
        let bg_rect = new RectangularGameObject(new Vector2D(0,0), width, height);
        let play_rect = new RectangularGameObject(new Vector2D((width - BUTTON_WIDTH) / 2, ((height - BUTTON_HEIGHT * 2 - BUTTON_SPACE) / 2 - BUTTON_SPACE)), BUTTON_WIDTH, BUTTON_HEIGHT);
        let about_rect = new RectangularGameObject(new Vector2D((width - BUTTON_WIDTH) / 2, ((height - BUTTON_HEIGHT * 2 - BUTTON_SPACE) / 2) + BUTTON_HEIGHT), BUTTON_WIDTH, BUTTON_HEIGHT);
        let bg = new RectangleDrawing(bg_rect, BACKGROUND, true, canvas_context);
        let title = new TextDrawing(new Vector2D(width / 2, TITLE_SIZE + 5), TITLE_SIZE, TITLE_FONT, TITLE_COLOR, "SIMPLE SNAKE", true, true, canvas_context);
        this.play_button = new ButtonGameObject(play_rect, "PLAY", canvas_context, game.inputHandler());
        this.about_button = new ButtonGameObject(about_rect, "ABOUT", canvas_context, game.inputHandler());
        this.objects.push(new GameObject(bg));
        this.objects.push(new GameObject(title));
        this.objects.push(this.play_button);
        this.objects.push(this.about_button);
    }

    public update(): void {
        super.update();
        if (this.play_button.clicked) {
            this.game.changeScene(new PlayScene(this.game));
        }
        else if (this.about_button.clicked) {
            this.game.pushScene(this.about_scene);
        }
    }

    private play_button: ButtonGameObject;
    private about_button: ButtonGameObject;
    private about_scene: AboutScene = new AboutScene(this.game);
}

export {MenuScene};