import * as PIXI from "pixi.js";
import {ECS} from "../engine/ecs/ECS";
import {Body2DSystem} from "./ecs/systems/Body2DSystem";
import {CollisionSystem} from "./ecs/systems/CollisionSystem";
import {AnimatorSystem} from "./ecs/systems/AnimatorSystem";
import {GameObjectSystem} from "./ecs/systems/GameObjectSystem";
import {Assets, Spritesheet} from "pixi.js";
import {Player} from "./classes/Player";
import {GameObjectComponent} from "./ecs/components/GameObjectComponent";
import {FoodSpawner} from "./classes/FoodSpawner";

export class Game {

    app: PIXI.Application;
    constructor(app: PIXI.Application) {
        this.app = app;
    }
    async setup() {
        const ecs: ECS = ECS.instance;
        ecs.app = this.app;
        ecs.addSystem(new Body2DSystem(ecs));
        ecs.addSystem(new CollisionSystem(ecs));
        ecs.addSystem(new AnimatorSystem(ecs));
        ecs.addSystem(new GameObjectSystem(ecs));

        const sheet: Spritesheet = await Assets.load('assets/knight_spritesheet.json');
        const player: Player = new Player(sheet);
        this.app.stage.addChild(player.entity.get(GameObjectComponent).container);

        const spawner: FoodSpawner = new FoodSpawner(this.app);
        await spawner.init();
        this.app.ticker.add((delta) => {
            ecs.update(delta)
        });
    }


}
