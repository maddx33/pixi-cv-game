import {Container, IPoint, Point} from "pixi.js";
import '@pixi/math-extras';
import {System} from "../../../engine/ecs/System";
import {ECS} from "../../../engine/ecs/ECS";
import {Entity} from "../../../engine/ecs/Entity";
import {Body2DComponent} from "../components/Body2DComponent";
import {GameObjectComponent} from "../components/GameObjectComponent";

export class GameObjectSystem extends System {
    ecs: ECS;

    constructor(ecs: ECS) {
        super();
        this.ecs = ecs;
    }

    requiredComponents: Set<Function> = new Set<Function>().add(GameObjectComponent);

    update(entities: Set<Entity>, dt: number) {

        entities.forEach((i) => {
            const component = i.get(GameObjectComponent);
            component.onUpdate?.call(component, i, dt);
        });
    }
}
