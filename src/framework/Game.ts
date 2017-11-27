import { SimpleSceneManager } from './SceneManager';
import { VERSION, SECOND } from "./Tools/constants";

interface GameOptions {
    title?: string,
    frame_rate?: number,
    debug_mode?: boolean,
    canvas?: {
        id: string,
        width?: number,
        height?: number,
    },
    version?: string
}

const DEFAULT_GAME_OPTIONS: GameOptions = {
    title: "Simple Game",
    frame_rate: 60,
    debug_mode: true,
    canvas: {
        id: "SimpleGame",
        width: 960,
        height: 540
    },
    version: VERSION
}

class Game {
    public static GetInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    public create(options?: GameOptions): boolean {
        if (options) this.checkOptions(options);
        else this.options = DEFAULT_GAME_OPTIONS;

        if (this.checkCanvas()) {            
            this.time = new Date();

            this.frame_counter = 0;
            this.last_frame_time = this.time.getTime();

            this.log("Game creation successful");
            return true;
        }
        else {
            this.log("Game creation failed");
            return false;
        }
    }

    public init(): boolean {
        if (SimpleSceneManager.currentScene()) {
            requestAnimationFrame(this.animate);
            this.log("Initiating game animation");
            return true;
        }
        else {
            this.log("Failed to initialize game [no game scene]");
            return false;
        }
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public log(message: string): void {
        if (this.options.debug_mode) console.log(this.options.title+": "+message+"...");
    }

    private static instance: Game;

    private options: GameOptions;
    private canvas: HTMLCanvasElement;
    private time: Date;
    private frame_counter: number;
    private last_frame_time: number;

    private constructor() {}    

    private checkOptions(options: GameOptions): void {
        if (!options.title) options.title = DEFAULT_GAME_OPTIONS.title;
        if (!options.frame_rate) options.frame_rate = DEFAULT_GAME_OPTIONS.frame_rate;
        if (!options.debug_mode) options.debug_mode = DEFAULT_GAME_OPTIONS.debug_mode;
        if (!options.canvas) options.canvas = DEFAULT_GAME_OPTIONS.canvas;
        else {
            if (!options.canvas.id) options.canvas.id = DEFAULT_GAME_OPTIONS.canvas.id;
            if (!options.canvas.width) options.canvas.width = DEFAULT_GAME_OPTIONS.canvas.width;
            if (!options.canvas.height) options.canvas.height = DEFAULT_GAME_OPTIONS.canvas.height;
        }
        this.options = options;
    }

    private checkCanvas(): boolean {
        let canvas = document.getElementById(this.options.canvas.id);
        if (!canvas) {
            canvas = document.createElement("canvas");
            (<HTMLCanvasElement>canvas).width = this.options.canvas.width;
            (<HTMLCanvasElement>canvas).height = this.options.canvas.height;
            document.getElementsByTagName("body")[0].insertBefore(canvas, document.body.firstChild);
        }
        if (canvas.tagName === "CANVAS") {
            this.canvas = <HTMLCanvasElement>canvas;
            return true;
        }
        return false;
    }

    private animate(): void {
        let time     = new Date();
        let elapse   = time.getTime() - SimpleGame.last_frame_time;
        let interval = SECOND / SimpleGame.options.frame_rate;

        if (elapse > interval) {
            SimpleSceneManager.update(elapse);
            SimpleSceneManager.render(elapse);

            SimpleGame.last_frame_time = time.getTime() - (elapse % interval);
        }

        requestAnimationFrame(SimpleGame.animate);
    }
}

export const SimpleGame: Game = Game.GetInstance();