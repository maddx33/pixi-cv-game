import {IPointData, Point} from "pixi.js";
import {Component} from "../../../engine/ecs/Component";

export class Body2DComponent extends Component {
    public mass: number = 25;
    public force: Point = new Point();
    public freeze: boolean = false;
    public position: IPointData;
    velocity: Point = new Point();
    frictionFactor: number = 1;
    constructor(position: IPointData) {
        super();
        this.position = position;
    }
}
