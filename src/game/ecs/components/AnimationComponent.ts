import {AnimatedSprite, Container} from "pixi.js";
import {Component} from "../../../engine/ecs/Component";

export class AnimationComponent<T> extends Component {
    currentAnimation?: AnimatedSprite;
    animations: Map<string, AnimatedSprite>;
    transitions: Map<string, (args: T) => boolean>;
    data: T;
    parent: Container;

    setCurrentAnimation(animationKey: string) {
        const animation = this.animations.get(animationKey);

        if (!animation) {
            return;
        }

        if (this.currentAnimation) {
            this.currentAnimation.stop();
            this.currentAnimation.visible = false;
        }

        this.currentAnimation = animation;
        this.currentAnimation.play()
        this.currentAnimation.animationSpeed = 0.1;
        this.currentAnimation.visible = true;
        return animation;

    }

    constructor(parent: Container, transitions: Map<string, (args: T) => boolean>, data: T, animations: Map<string, AnimatedSprite>) {
        super();
        this.parent = parent;
        this.animations = animations;
        this.transitions = transitions;
        this.data = data;
        animations.forEach((p) => {
            p.visible = false;
            p.stop();
            parent.addChild(p);
        })
    }
}
