import {Component} from "./Component";
import {System} from "./System";
import {Entity} from "./Entity";
import {Application} from "pixi.js";

export class ECS {
    public app?: Application;
    private systems = new Map<System, Set<Entity>>()
    private static _instance: ECS;
    private entities: Array<Entity> = [];
    private entityID = 0;
    public static get instance() {
        if (!ECS._instance) {
            ECS._instance = new ECS();
        }

        return ECS._instance;
    }
    private constructor() {
    }

    public createEntity(): Entity {
        let entity = new Entity(this.entityID)
        this.entityID++;
        this.entities.push(entity);
        this.systems.forEach((v, k) => this.addEntityToSystem(entity, k));
        return entity;
    }

    public addSystem(system: System): void {

        system.ecs = this;
        this.systems.set(system, new Set());
        this.entities.forEach((e) => {
            this.addEntityToSystem(e, system);
        })

    }
    public addComponent(entity: Entity, component: Component): void {
        entity.add(component);
        this.systems.forEach((v, k) => this.addEntityToSystem(entity, k));
    }
    public update(dt: number): void {

        for (let [system, entities] of this.systems.entries()) {
            system.update(entities, dt)
        }

    }


    private addEntityToSystem(entity: Entity, system: System): void {

        for (const el of system.requiredComponents) {
            if (!entity.components.has(el)) {
                return;
            }
        }
        this.systems.get(system)?.add(entity);
    }
}
