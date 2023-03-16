import {Component} from "./Component";
type ComponentClass<T extends Component> = new (...args: any[]) => T

export class Entity {

    public id: number;
    public components: Map<Function, Component> = new Map<Function, Component>();

    constructor(id: number) {
        this.id = id;
    }

    public add(component: Component): void {
        this.components.set(component.constructor, component);
    }

    public get<T extends Component>(
        componentClass: ComponentClass<T>
    ): T {
        return this.components.get(componentClass) as T;
    }

    public has(componentClass: Function): boolean {
        return this.components.has(componentClass);
    }

    public delete(componentClass: Function): void {
        this.components.delete(componentClass);
    }
}
