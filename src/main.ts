import { SimpleGame } from './framework/Game';
import { IntroScene } from "./game/IntroScene";
import { SimpleSceneManager } from './framework/SceneManager';

window.onload = function () {
    SimpleGame.create({ title: "Snake"});
    SimpleSceneManager.pushScene(new IntroScene());
    SimpleGame.init();
};