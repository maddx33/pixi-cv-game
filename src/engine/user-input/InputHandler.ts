import {InputKey} from "./InputKey";

export class InputHandler {

    private readonly _keys: Record<string, InputKey> = {};

    constructor() {
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    public getInputKey(key: string): InputKey {
        return this._keys[key] ? this._keys[key] : this._keys[key] = new InputKey();
    }

    public isKeyDown(key: string): boolean {
        return this.getInputKey(key).pressed;
    }
    public addKeyPressListener(key: string, listener: () => void): void {
        this.getInputKey(key).onKeyPress.push(listener);
    }

    public removeKeyPressListener(key: string, listener: () => void): void {
        this.getInputKey(key).onKeyPress =  this.getInputKey(key).onKeyPress.filter(i => i !== listener);
    }

    public addKeyReleasedListener(key: string, listener: () => void): void {
        this.getInputKey(key).onKeyReleased.push(listener);
    }

    public removeKeyReleasedListener(key: string, listener: () => void): void {
        this.getInputKey(key).onKeyReleased =  this.getInputKey(key).onKeyReleased.filter(i => i !== listener);
    }

    private handleKeyDown(event: KeyboardEvent): void {
        const key = this.getInputKey(event.key);
        if(!key.pressed) {
            key.onKeyPress?.forEach((listener) => listener());
        }
        key.pressed = true;
    }

    private handleKeyUp(event: KeyboardEvent): void {
        const key = this.getInputKey(event.key);
        if(key.pressed) {
            key.onKeyReleased?.forEach((listener) => listener());
        }
        key.pressed = false;
    }

}
