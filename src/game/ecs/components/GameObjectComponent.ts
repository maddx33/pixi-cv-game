import {ColliderTag} from "../systems/CollisionSystem";
import {Container, DisplayObject, ICanvas} from "pixi.js";
import {Component} from "../../../engine/ecs/Component";
import {Entity} from "../../../engine/ecs/Entity";

export class GameObjectComponent extends Component {

    public container: Container;
    onUpdate?: Function;
    constructor(onUpdate?: (e: Entity, dt: number) => void) {
        super();
        this.container = new Container();
        this.onUpdate = onUpdate;
    }
}
