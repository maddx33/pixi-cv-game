export class InputKey {
    pressed: boolean = false;
    onKeyPress: Array<() => void> = [];
    onKeyReleased: Array<() => void> = [];
}
