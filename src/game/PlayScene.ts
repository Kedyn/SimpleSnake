import {GameScene} from "../framework/GameScene";
import {Game} from "../framework/Game";
import {RectangularGameObject, GameObject} from "../framework/GameObject";
import {Vector2D} from "../framework/Vector2D";
import {RectangleDrawing, TextDrawing} from "../framework/Drawing";
import {KEYCODE} from "../framework/KeyCode";
import {GameOverScene} from "./GameOverScene";
import {PauseScene} from "./PauseScene";

const BACKGROUND  = "#000000";
const SNAKE_COLOR = "#005599";
const FOOD_COLOR  = "#770000";
const SCORE_COLOR = "rgba(255,255,255,0.75)";
const TEXT_SIZE   = 12;
const TEXT_FONT   = "impact";
const CELL_SIZE   = 20;

enum DIRECTION {
    LEFT,
    UP,
    RIGHT,
    DOWN
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class PlayScene extends GameScene {
    public constructor(private game: Game) {
        super("play");
        let canvas_context = game.canvas.getContext("2d");
        let width = game.canvas.width;
        let height = game.canvas.height;
        let bg_rect = new RectangularGameObject(new Vector2D(0,0), width, height);
        let bg = new RectangleDrawing(bg_rect, BACKGROUND, true, canvas_context);
        let head_rect = new RectangularGameObject(new Vector2D(CELL_SIZE * 2,0), CELL_SIZE, CELL_SIZE);
        this.head = new RectangleDrawing(head_rect, SNAKE_COLOR, true, canvas_context);
        let body_rect = new RectangularGameObject(new Vector2D(CELL_SIZE,0), CELL_SIZE, CELL_SIZE);
        this.body.push(new RectangleDrawing(body_rect, SNAKE_COLOR, true, canvas_context));
        body_rect = new RectangularGameObject(new Vector2D(0,0), CELL_SIZE, CELL_SIZE);
        this.body.push(new RectangleDrawing(body_rect, SNAKE_COLOR, true, canvas_context));
        this.objects.push(new GameObject(bg));
        this.objects.push(new GameObject(this.head));
        for (let body_part of this.body) {
            this.objects.push(new GameObject(body_part));
        }
        this.direction = DIRECTION.RIGHT;
        let food_rect = new RectangularGameObject(new Vector2D(0,0), CELL_SIZE, CELL_SIZE);
        this.food = new RectangleDrawing(food_rect, FOOD_COLOR, true, canvas_context);
        this.objects.push(new GameObject(this.food));
        this.setFood();
        this.pause_scene = new PauseScene(game);
        this.frame_rate = 5;
        this.score = 0;
        this.score_text = new TextDrawing(new Vector2D(12, 12), TEXT_SIZE, TEXT_FONT, SCORE_COLOR, "Score: "+this.score, false, true, canvas_context);
        this.objects.push(new GameObject(this.score_text));
    }

    public onEnter(): boolean {
        this.game.frameRate(this.frame_rate);
        return true;
    }

    public onExit(): boolean {
        this.game.frameRate(60);
        return true;
    }

    public onKeyDown(key: KEYCODE): void {
        super.onKeyDown(key); //it does nothing but just in case :)
        switch (key) {
            case KEYCODE.LEFT_ARROW:
                this.direction = DIRECTION.LEFT;
                break;
            case KEYCODE.UP_ARROW:
                this.direction = DIRECTION.UP;
                break;
            case KEYCODE.RIGHT_ARROW:
                this.direction = DIRECTION.RIGHT;
                break;
            case KEYCODE.DOWN_ARROW:
                this.direction = DIRECTION.DOWN;
                break;
            case KEYCODE.KEY_P:
                this.game.pushScene(this.pause_scene);
                break;
        }
    }

    public update(): void {
        let neck = this.body[0];
        let head_pos = this.head.object.position;
        let new_neck_pos = new Vector2D(head_pos.x, head_pos.y);
        switch (this.direction) {
            case DIRECTION.LEFT:
                this.head.object.position.x -= CELL_SIZE;
                break;
            case DIRECTION.UP:
                this.head.object.position.y -= CELL_SIZE;
                break;
            case DIRECTION.RIGHT:
                this.head.object.position.x += CELL_SIZE;
                break;
            case DIRECTION.DOWN:
                this.head.object.position.y += CELL_SIZE;
                break;
        }
        let canvas = this.game.canvas;
        let dead = false;
        if (head_pos.isEqual(neck.object.position) || head_pos.x < 0 || head_pos.x > canvas.width || head_pos.y < 0 || head_pos.y > canvas.height) {
            dead = true;
        }
        else {
            let i = this.body.length - 1;
            let repositioning = true;
            while (repositioning) {
                if (i > 0) {
                    this.body[i].object.position.copy(this.body[i - 1].object.position);
                    if (head_pos.isEqual(this.body[i].object.position)) {
                        dead = true;
                        repositioning = false;
                    }
                }
                else {
                    repositioning = false;
                }
                i--;
            }
            if (!dead) {
                neck.object.position.copy(new_neck_pos);
                if (head_pos.isEqual(this.food.object.position)) {
                    let body_rect = new RectangularGameObject(new Vector2D(head_pos.x, head_pos.y), CELL_SIZE, CELL_SIZE);
                    this.body.push(new RectangleDrawing(body_rect, SNAKE_COLOR, true, this.game.canvas.getContext("2d")));
                    this.objects.push(new GameObject(this.body[this.body.length - 1]));
                    this.setFood();
                    this.score++;
                    this.score_text.text = "Score: " + (this.score * 10);
                    if (this.score % 3 == 0 && this.frame_rate != 30) {
                        this.frame_rate++;
                        this.game.frameRate(this.frame_rate);
                    }
                }
            }
        }
        if (dead) {
            this.game.changeScene(new GameOverScene(this.game));
        }
    }

    private head: RectangleDrawing;
    private direction: DIRECTION;
    private body: RectangleDrawing[] = [];
    private food: RectangleDrawing;
    private pause_scene: PauseScene;
    private frame_rate: number;
    private score: number;
    private score_text: TextDrawing;

    private setFood(): void {
        let set = false;
        let cols = this.game.canvas.width / CELL_SIZE;
        let rows = this.game.canvas.height / CELL_SIZE;
        let x = 0;
        let y = 0;
        while (!set) {
            x = getRandomIntInclusive(0, cols - 1);
            y = getRandomIntInclusive(0, rows - 1);
            let attempt = new Vector2D(x * 20, y * 20);
            if (!this.isInSnake(attempt)) {
                this.food.object.position.copy(attempt);
                set = true;
            }
        }
    }

    private isInSnake(vector: Vector2D): boolean {
        let answer = false;
        if (this.head.object.position.isEqual(vector)) {
            answer = true;
        }
        else {
            let i = 0;
            let searching = false;
            while (searching) {
                if (this.body[i].object.position.isEqual(vector)) {
                    searching = false;
                    answer = true;
                }
                i++;
                if (i == this.body.length) {
                    searching = false;
                }
            }
        }
        return answer;
    }
}

export {PlayScene}