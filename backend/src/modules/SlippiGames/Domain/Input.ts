import { JoystickRegion } from "./JoystickRegion";

export class Input {
    constructor(private joystickPosition: JoystickRegion, private cStickPosition: JoystickRegion, private buttonsPressed: string[]) {
    }

    public getAnalogStickPosition(): JoystickRegion {
        return this.joystickPosition;
    }

    public getCStickPosition(): JoystickRegion {
        return this.cStickPosition;
    }

    public getButtonsPressed(): string[] {
        return this.buttonsPressed;
    }

    public equals(otherInput: Input) {
        if (this.joystickPosition !== otherInput.getAnalogStickPosition()) {
            return false;
        }

        if (this.cStickPosition !== otherInput.getCStickPosition()) {
            return false;
        }

        if (this.buttonsPressed.length !== otherInput.buttonsPressed.length) {
            return false;
        }

        for (let i = 0; i < this.buttonsPressed.length; i++) {
            if (this.buttonsPressed[i] !== otherInput.buttonsPressed[i]) {
                return false;
            }
        }

        return false;
    }
}
