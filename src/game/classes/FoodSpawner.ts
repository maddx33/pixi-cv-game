import {Application, Assets, Sprite, Spritesheet} from "pixi.js";
import {GameObjectComponent} from "../ecs/components/GameObjectComponent";
import {Food} from "./Food";
import {Body2DComponent} from "../ecs/components/Body2DComponent";

export class FoodSpawner {

    app: Application;
    objectPool: Food[] = [];
    foodSheet?: Spritesheet;

    foodRandomX = () => Math.floor((Math.random() * 0.5 + 0.25) * window.innerWidth);

    constructor(app: Application) {
        this.app = app;
    }

    async init() {
        this.foodSheet = await Assets.load('assets/food.json');
        let interval = setInterval(this.spawn.bind(this), 2000);
        window.addEventListener("focus", () => {interval = setInterval(this.spawn.bind(this), 2000)});
        window.addEventListener("blur", () => {clearInterval(interval)});
    }

    spawn() {
        const food = this.objectPool.find(i => i.entity.get(Body2DComponent).freeze);
        if (food) {
            const gameObject = food.entity.get(GameObjectComponent);
            gameObject.container.x = this.foodRandomX();
            food.entity.get(Body2DComponent).freeze = false;
        } else {
            this.createFood();
        }
    }

    createFood() {
        if (!this.foodSheet) {
            return;
        }
        const foodSprite = Object.values(this.foodSheet.textures)[Math.floor(Math.random() * Object.keys(this.foodSheet.textures).length)];
        const food = new Food(new Sprite(foodSprite));
        this.app.stage.addChild(food.entity.get(GameObjectComponent).container);
        food.entity.get(GameObjectComponent).container.position.x = this.foodRandomX();
        this.objectPool.push(food);
    }
}
