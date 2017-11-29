import { SimpleSceneManager } from '../framework/SceneManager';
import { Scene } from '../framework/Scene';
import { SimpleGame } from '../framework/Game';
import { drawRect, drawText } from '../framework/Tools/Drawings';
import { SECOND } from '../framework/Tools/constants';
import { KEYCODE } from '../framework/Tools/KeyCode';

const BACKGROUND  = "#000000";
const SNAKE_COLOR = "#005599";
const FRUIT_COLOR = "#770000";
const SCORE_COLOR = "rgba(255,255,255,0.75)";
const TEXT_SIZE   = 12;
const TEXT_FONT   = "impact";
const CELL_SIZE   = 20;

const INITIAL_SPEED = 4;

enum DIRECTION {
    LEFT,
    UP,
    RIGHT,
    DOWN
}

interface Point {
    x: number,
    y: number
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class GameScene extends Scene {
    public constructor() {
        super("GameScene");
        this.width = SimpleGame.getCanvas().width;
        this.height = SimpleGame.getCanvas().height;
        this.cols = Math.floor(this.width / CELL_SIZE);
        this.rows = Math.floor(this.height / CELL_SIZE);
        this.reset();        
    }

    public update(elapse_time: number): void {
        this.time += elapse_time;
        if (this.time >= SECOND / this.speed && !this.pause && !this.game_over) {
            if (!this.grow) {
                this.snake.shift();
            }
            this.grow = false;
            let x = 0;
            let y = 0;
            let head = this.snake[this.snake.length - 1];            
            switch (this.direction) {
                case DIRECTION.LEFT:
                    if (head.x == 0) {
                        x = this.cols * CELL_SIZE;
                    }
                    else {
                        x -= CELL_SIZE;
                    }
                    break;
                case DIRECTION.UP:
                    if (head.y == 0) {
                        y = this.rows * CELL_SIZE;
                    }
                    else {
                        y -= CELL_SIZE;
                    }
                    break;
                case DIRECTION.RIGHT:
                    if (head.x == this.cols * CELL_SIZE - CELL_SIZE) {
                        x -= this.cols * CELL_SIZE;
                    }
                    else {
                        x = CELL_SIZE;
                    }
                    break;
                case DIRECTION.DOWN:
                    if (head.y == this.rows * CELL_SIZE - CELL_SIZE) {
                        y -= this.rows * CELL_SIZE;
                    }
                    else {
                        y = CELL_SIZE;
                    }
                    break;
            }
            let new_x = head.x + x;
            let new_y = head.y + y;
            if (this.isPointInSnake({x: new_x, y: new_y})) {
                this.game_over = true;
            }
            else {
                this.snake.push({x: new_x, y: new_y});
                head = this.snake[this.snake.length - 1];
                if (head.x == this.fruit.x && head.y == this.fruit.y) {
                    this.grow = true;
                    this.setFruit();
                }
            }
            this.time = 0;
        }
        else if (this.game_over && this.time >= SECOND * 3) {
            SimpleSceneManager.popScene();
        }
    }

    public render(elapse_time: number): void {
        drawRect(0, 0, this.width, this.height, { stroke: false, fill: true, fill_color: "black" });
        
        for (let body of this.snake) {
            drawRect(body.x, body.y, CELL_SIZE, CELL_SIZE, { stroke: false, fill: true, fill_color: SNAKE_COLOR });
        }

        drawRect(this.fruit.x, this.fruit.y, CELL_SIZE, CELL_SIZE, { stroke: false, fill: true, fill_color: FRUIT_COLOR });

        if (this.pause) {
            drawText(this.width / 2, this.height / 2, "PAUSE", { font_size: 30, fill_color: "teal" });             
        }
        if (this.game_over) {
            drawText(this.width / 2, this.height / 2, "GAME OVER", { font_size: 30, fill_color: "teal" });             
        }
    }

    public onKeyDown(key: KEYCODE): void {
        super.onKeyDown(key); //it does nothing but just in case :)
        switch (key) {
            case KEYCODE.LEFT_ARROW:
                if (this.direction != DIRECTION.RIGHT) {
                    this.direction = DIRECTION.LEFT;
                }
                break;
            case KEYCODE.UP_ARROW:
                if (this.direction != DIRECTION.DOWN) {
                    this.direction = DIRECTION.UP;
                }
                break;
            case KEYCODE.RIGHT_ARROW:
                if (this.direction != DIRECTION.LEFT) {
                    this.direction = DIRECTION.RIGHT;
                }
                break;
            case KEYCODE.DOWN_ARROW:
                if (this.direction != DIRECTION.UP) {
                    this.direction = DIRECTION.DOWN;
                }
                break;
            case KEYCODE.KEY_P:
                this.pause = !this.pause;
                break;
        }
    }

    private width: number;
    private height: number;
    private cols: number;
    private rows: number;
    private snake: Point[];
    private fruit: Point;
    private grow: boolean;
    private direction: DIRECTION;
    private time: number;
    private pause: boolean;
    private game_over: boolean;
    private speed: number;

    private isPointInSnake(point: Point): boolean {
        let looping = true;
        let answer = false;
        let index = 0;
        while (looping) {
            if (index < this.snake.length) {
                let body = this.snake[index];
                if (body.x == point.x && body.y == point.y) {
                    looping = false;
                    answer = true;
                }
                index++;
            }
            else {
                looping = false;
            }
        }
        return answer;
    }

    private reset(): void {
        this.snake = [];
        for (let i = 0; i < 4; ++i) {
            this.snake.push({x: i*CELL_SIZE, y: 0});
        }
        this.setFruit();
        this.grow = false;
        this.direction = DIRECTION.RIGHT;
        this.time = 0;
        this.pause = false;
        this.game_over = false;
        this.speed = INITIAL_SPEED;
    }

    private setFruit(): void {
        let point = {
            x: CELL_SIZE * getRandomIntInclusive(0, this.cols - 1),
            y: CELL_SIZE * getRandomIntInclusive(0, this.rows - 1)
        };
        while (this.isPointInSnake(point)) {
            point = {
                x: CELL_SIZE * getRandomIntInclusive(0, this.cols),
                y: CELL_SIZE * getRandomIntInclusive(0, this.rows)
            };
        }
        this.fruit = point;
    }
}