import {Game} from "./framework/Game";
import {IntroScene} from "./game/IntroScene";

window.onload = function () {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game'); //gets canvas element
    let game = new Game("Snake", canvas); //creates a game instance
    game.pushScene(new IntroScene(game)); //adds the initial scene
    game.init(); //initializes the game
};