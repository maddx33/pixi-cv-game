import {ColliderTag} from "../systems/CollisionSystem";
import {Container} from "pixi.js";
import {Component} from "../../../engine/ecs/Component";

export class ColliderComponent extends Component {
    tag: ColliderTag;
    collideWith: ColliderTag[] = [];
    object: Container;
    onCollision?: () => void;
    constructor(object: Container, colliderTag: ColliderTag, collideWith: ColliderTag[], onCollision?: () => void) {
        super();
        this.object = object;
        this.tag = colliderTag;
        this.collideWith = collideWith;
        this.onCollision = onCollision;
    }

}
