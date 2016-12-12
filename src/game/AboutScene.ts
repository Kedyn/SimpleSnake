import {GameScene} from "../framework/GameScene";
import {RectangularGameObject, GameObject} from "../framework/GameObject";
import {Vector2D} from "../framework/Vector2D";
import {RectangleDrawing, TextDrawing} from "../framework/Drawing";
import {ButtonGameObject} from "../framework/Button";

const BACKGROUND    = "#000000";
const TITLE_SIZE    = 50;
const TITLE_FONT    = "impact";
const TITLE_COLOR   = '#FFFFFF';
const BUTTON_WIDTH  = 150;
const BUTTON_HEIGHT = 30;
const BUTTON_SPACE  = 10;
const TEXT_SIZE     = 14;
const TEXT_FONT     = "impact";
const TEXT_SPACE    = 4;
const TEXT_COLOR    = '#FFFFFF';

class AboutScene extends GameScene {
    public constructor(private game) {
        super("about");
        let canvas_context = game.canvas.getContext("2d");
        let width = game.canvas.width;
        let height = game.canvas.height;
        let bg_rect = new RectangularGameObject(new Vector2D(0,0), width, height);
        let menu_rect = new RectangularGameObject(new Vector2D((width - BUTTON_WIDTH) / 2, height - BUTTON_HEIGHT - BUTTON_SPACE), BUTTON_WIDTH, BUTTON_HEIGHT);
        let bg = new RectangleDrawing(bg_rect, BACKGROUND, true, canvas_context);
        let title = new TextDrawing(new Vector2D(width / 2, TITLE_SIZE + 5), TITLE_SIZE, TITLE_FONT, TITLE_COLOR, "SIMPLE SNAKE", true, true, canvas_context);
        this.menu_button = new ButtonGameObject(menu_rect, "MENU", canvas_context,this.game.inputHandler());
        this.objects.push(new GameObject(bg));
        this.objects.push(new GameObject(title));
        this.objects.push(this.menu_button);
        let text_items = this.context_text.length;
        let x = width / 2;
        let y = height / 2 - (TEXT_SIZE / 2 * (text_items / 2) + (TEXT_SPACE * (text_items / 2)));
        for (let string of this.context_text) {
            this.objects.push(new GameObject(new TextDrawing(new Vector2D(x, y), TEXT_SIZE, TEXT_FONT, TEXT_COLOR, string, true, true, canvas_context)));
            y += TEXT_SPACE + TEXT_SIZE;
        }
    }

    public update(): void {
        super.update();
        if (this.menu_button.clicked) {
            this.game.popScene();
        }
    }

    private menu_button: ButtonGameObject;
    private context_text = [
        "This game is a simple remake of the classic Snake game.",
        "The objective of the game is to make the snake grow as much as possible without colliding with anything.",
        " ",
        "Code by Kedyn Macedonio"
    ];
}

export {AboutScene};
