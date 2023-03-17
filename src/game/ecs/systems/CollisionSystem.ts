import {Container, DisplayObject, IPoint, Point} from "pixi.js";
import '@pixi/math-extras';
import {System} from "../../../engine/ecs/System";
import {ECS} from "../../../engine/ecs/ECS";
import {Entity} from "../../../engine/ecs/Entity";
import {ColliderComponent} from "../components/ColliderComponent";
import {GameObjectComponent} from "../components/GameObjectComponent";

export type ColliderTag = "FOOD" | "PLAYER";

export class CollisionSystem extends System {
    ecs: ECS;

    constructor(ecs: ECS) {
        super();
        this.ecs = ecs;
    }

    requiredComponents: Set<Function> = new Set<Function>([ColliderComponent, GameObjectComponent])

    update(entities: Set<Entity>, dt: number) {
        const clonedSet = new Set(entities);
        for (let entity of entities) {
            const collider = entity.get(ColliderComponent);
            const colliderGameObject = entity.get(GameObjectComponent);
            for (let entity2 of clonedSet) {
                const collider2 = entity2.get(ColliderComponent);
                const colliderGameObject2 = entity2.get(GameObjectComponent);

                if(entity.id === entity2.id) {
                    continue;
                }

                if(!collider.collideWith.includes(collider2.tag)) {
                    continue;
                }

                if(this.detectContainerCollision(colliderGameObject.container, colliderGameObject2.container)){
                    collider.onCollision?.call(collider)
                    collider2.onCollision?.call(collider2)
                }
            }

            clonedSet.delete(entity);
        }
    }

    checkCollision(sprite1: DisplayObject, sprite2: DisplayObject) {
        const bounds1 = sprite1.getBounds();
        const bounds2 = sprite2.getBounds();
        return bounds1.x + bounds1.width > bounds2.x &&
            bounds1.x < bounds2.x + bounds2.width &&
            bounds1.y + bounds1.height > bounds2.y &&
            bounds1.y < bounds2.y + bounds2.height;
    }

    detectContainerCollision(container1: Container, container2: Container) {
        for (let i = 0; i < container1.children.length; i++) {
            const child1 = container1.children[i];
            for (let j = 0; j < container2.children.length; j++) {
                const child2 = container2.children[j];
                if (this.checkCollision(child1, child2)) {
                    return true;
                }
            }
        }

        return false;
    }
}
