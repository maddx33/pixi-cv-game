import {Application} from "pixi.js";
import {Game} from "./game/Game";

const app = new Application({width: window.innerWidth, height: window.innerHeight, background: "white"});
const el: HTMLElement | null = document.getElementById("game")
el && el.appendChild(app.renderer.view as unknown as Node);
const game = new Game(app);
game.setup();
