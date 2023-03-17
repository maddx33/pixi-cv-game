import '@pixi/math-extras';
import {System} from "../../../engine/ecs/System";
import {ECS} from "../../../engine/ecs/ECS";
import {Entity} from "../../../engine/ecs/Entity";
import {AnimationComponent} from "../components/AnimationComponent";


export class AnimatorSystem extends System {
    ecs: ECS;

    constructor(ecs: ECS) {
        super();
        this.ecs = ecs;
    }

    requiredComponents: Set<Function> = new Set<Function>().add(AnimationComponent);

    update(entities: Set<Entity>, dt: number) {
        entities.forEach(i => {
            const animator = i.get(AnimationComponent);
            for (const [k, v] of animator.transitions) {
                if (v.call(animator, animator.data)) {
                    animator.setCurrentAnimation(k);
                }
            }
            animator.currentAnimation?.update(dt);
        })
    }

}
