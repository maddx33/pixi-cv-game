import {ECS} from "./ECS";
import {Entity} from "./Entity";

export abstract class System {
    public abstract requiredComponents: Set<Function>
    public abstract update(entities: Set<Entity>, dt: number): void
    public abstract ecs: ECS;
}
