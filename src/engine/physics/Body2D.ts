import {Container, IPoint, Point} from "pixi.js";
import '@pixi/math-extras';

export class Body2D extends Container {
    public mass: number = 25;
    public velocity: Point = new Point();
    public force: Point = new Point();
    frictionFactor: number = 1;
    update(dt: number) {

        const frictionForce = this.velocity.clone().multiplyScalar(-1 * this.frictionFactor);
        const totalForce = this.force.add(frictionForce);
        const acceleration: Point = new Point(totalForce.x / this.mass, totalForce.y / this.mass);

        this.velocity = this.velocity.add(acceleration.multiplyScalar(dt));
        this.position = this.position.add(this.velocity.multiplyScalar(dt));
        this.force.set(0, 0)
    }
}
