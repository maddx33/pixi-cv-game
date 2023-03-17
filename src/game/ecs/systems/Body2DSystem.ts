import {Container, IPoint, Point} from "pixi.js";
import '@pixi/math-extras';
import {System} from "../../../engine/ecs/System";
import {ECS} from "../../../engine/ecs/ECS";
import {Entity} from "../../../engine/ecs/Entity";
import {Body2DComponent} from "../components/Body2DComponent";

export class Body2DSystem extends System {
    ecs: ECS;
    constructor(ecs: ECS) {
        super();
        this.ecs = ecs;
    }
    requiredComponents: Set<Function> = new Set<Function>().add(Body2DComponent);

    update(entities: Set<Entity>, dt: number) {

        for (const i of entities) {
            const component = i.get(Body2DComponent);
            if(component.freeze) {
                continue;
            }
            const frictionForce = component.velocity.clone().multiplyScalar(-1 * component.frictionFactor);
            const totalForce = component.force.add(frictionForce);
            const acceleration: Point = new Point(totalForce.x / component.mass, totalForce.y / component.mass);

            component.velocity = component.velocity.add(acceleration.multiplyScalar(dt));
            component.position.x += component.velocity.x * dt;
            component.position.y += component.velocity.y * dt;
            component.force.set(0, 0)
        }

    }
}
