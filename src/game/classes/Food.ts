import {Entity} from "../../engine/ecs/Entity";
import {ECS} from "../../engine/ecs/ECS";
import {Body2DComponent} from "../ecs/components/Body2DComponent";
import {Sprite} from "pixi.js";
import {ColliderComponent} from "../ecs/components/ColliderComponent";
import {GameObjectComponent} from "../ecs/components/GameObjectComponent";
import {Player} from "./Player";

export const FOOD_Y_STARTING_POINT = -500;
export class Food {
    entity: Entity;
    constructor(sprite: Sprite) {
        const ecs = ECS.instance;
        this.entity = ecs.createEntity();

        const gameObjectComponent = new GameObjectComponent();
        const body2DComponent = new Body2DComponent(gameObjectComponent.container.position);

        gameObjectComponent.container.position.y = FOOD_Y_STARTING_POINT;
        gameObjectComponent.container.addChild(sprite);
        gameObjectComponent.onUpdate = () => {
            body2DComponent.force.y = 7.5;
            if(body2DComponent.position.y > window.innerHeight) {
                gameObjectComponent.container.position.y = FOOD_Y_STARTING_POINT;
                body2DComponent.freeze = true;
                Player.health--;
                Player.updateHealth();
            }
        };
        const collider = new ColliderComponent("FOOD", ["PLAYER"], () => {
            gameObjectComponent.container.position.y = FOOD_Y_STARTING_POINT;
            body2DComponent.freeze = true;
        });


        ecs.addComponent(this.entity, gameObjectComponent);
        ecs.addComponent(this.entity, body2DComponent);
        ecs.addComponent(this.entity, collider);
    }
}
