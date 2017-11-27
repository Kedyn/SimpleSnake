import { SimpleGame } from '../framework/Game';
import { Scene } from '../framework/Scene';
import { drawRect, drawText } from '../framework/Tools/Drawings';
import { SECOND } from '../framework/Tools/constants';
import { SimpleSceneManager } from '../framework/SceneManager';
import { GameScene } from './GameScene';

const DELAY: number = 3 * SECOND;

export class IntroScene extends Scene {
    public constructor() {
        super("Intro");
    }

    public onEnter(): boolean {
        this.time = 0;
        return true;        
    }

    public update(elapse_time: number): void {
        this.time += elapse_time;
        if (this.time >= DELAY) {
            SimpleSceneManager.pushScene(new GameScene());
        }
    }

    public render(elapse_time: number): void {
        let width = SimpleGame.getCanvas().width;
        let height = SimpleGame.getCanvas().height;
        drawRect(0, 0, width, height, { stroke: false, fill: true, fill_color: "black" });
        drawText(width / 2, height / 2, "Simple Kreations", { font_size: 30, fill_color: "teal" }); 
    }

    private time: number;    
}