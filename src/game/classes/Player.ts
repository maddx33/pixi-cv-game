import {Entity} from "../../engine/ecs/Entity";
import {ECS} from "../../engine/ecs/ECS";
import {Body2DComponent} from "../ecs/components/Body2DComponent";
import {AnimatedSprite, Container, Spritesheet} from "pixi.js";
import {InputHandler} from "../../engine/user-input/InputHandler";
import {AnimationComponent} from "../ecs/components/AnimationComponent";
import {ColliderComponent} from "../ecs/components/ColliderComponent";
import {GameObjectComponent} from "../ecs/components/GameObjectComponent";
import {Command} from "../../engine/user-input/Command";

export class Player {

    entity: Entity;
    inputHandler: InputHandler = new InputHandler();

    leftArrow: Command;
    rightArrow: Command;

    static score: number = 0;
    static health: number = 3;

    constructor(sheet: Spritesheet) {
        const ecs = ECS.instance;
        this.entity = ecs.createEntity();

        const gameObjectComponent = new GameObjectComponent();
        const body2DComponent = new Body2DComponent(gameObjectComponent.container.position);
        this.rightArrow = new Command(() => {
            body2DComponent.force.x = 15
        });
        this.leftArrow = new Command(() => {
            body2DComponent.force.x = -15
        });
        const collider = new ColliderComponent(gameObjectComponent.container, "PLAYER", ["FOOD"], () => {
            Player.score++;
            this.addScore(Player.score);
        });
        const animationMap: Map<string, AnimatedSprite> = new Map([
            ["IDLE", new AnimatedSprite(sheet.animations['knight iso char_idle'])],
            ["RIGHT", new AnimatedSprite(sheet.animations['knight iso char_run right'])],
            ["LEFT", new AnimatedSprite(sheet.animations['knight iso char_run left'])],
        ]);
        const animator = new AnimationComponent<Body2DComponent>(gameObjectComponent.container, new Map(
                [
                    ["RIGHT", (b2D) => b2D.velocity.x > 0.5],
                    ["LEFT", (b2D) => b2D.velocity.x < -0.5],
                    ["IDLE", (b2D) => b2D.velocity.x < 0.5 && b2D.velocity.x > -0.5 && !this.inputHandler.isKeyDown("ArrowRight") && !this.inputHandler.isKeyDown("ArrowLeft")]
                ]),
            body2DComponent, animationMap)
        gameObjectComponent.onUpdate = () => {
            if (this.inputHandler.isKeyDown("ArrowRight")) {
                this.rightArrow.execute();

            }

            if (this.inputHandler.isKeyDown("ArrowLeft")) {
                this.leftArrow.execute();
            }
        }
        ecs.addComponent(this.entity, gameObjectComponent);
        ecs.addComponent(this.entity, body2DComponent);
        ecs.addComponent(this.entity, collider);
        ecs.addComponent(this.entity, animator);
        gameObjectComponent.container.position.y = window.innerHeight - 100;
        gameObjectComponent.container.position.x = window.innerWidth / 2;

    }

    addScore(score: number) {
        const scoreUI = document.getElementById("score");
        if (scoreUI)
            scoreUI.innerHTML = `Score ${score}`;
    }

    static updateHealth() {
        const scoreUI = document.getElementById("health");
        const gameOverUI = document.getElementById("game-over");

        if (scoreUI) {
            Player.health--;
            scoreUI.innerHTML = `Health ${Player.health}`;
        }

        if(Player.health < 1 && gameOverUI) {
            gameOverUI.style.display = "block";
            ECS.instance.app?.stop();
        }
    }
}
