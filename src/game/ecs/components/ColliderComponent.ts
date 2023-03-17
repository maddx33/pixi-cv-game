import {ColliderTag} from "../systems/CollisionSystem";
import {Container} from "pixi.js";
import {Component} from "../../../engine/ecs/Component";

export class ColliderComponent extends Component {
    tag: ColliderTag;
    collideWith: ColliderTag[] = [];
    onCollision?: () => void;
    constructor(colliderTag: ColliderTag, collideWith: ColliderTag[], onCollision?: () => void) {
        super();
        this.tag = colliderTag;
        this.collideWith = collideWith;
        this.onCollision = onCollision;
    }

}
