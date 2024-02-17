/**
 * @category Platform
 */
export enum KeyStatus {
    Up,
    Down
};

/**
 * @category Platform
 */
export interface KeyEvent {
    status: KeyStatus,
    code: string
}

/**
 * @category Platform
 */
export type KeyStatusMap = Record<string, KeyStatus>;
/**
 * @category Platform
 */
export type InputListenerCallback = (statusMap: KeyStatusMap) => void;

/**
 * @category Platform
 */
export class KeyboardDevice {
    private _listeners: InputListenerCallback[] = [];
    private _keyStatusMap: KeyStatusMap = {};

    get listeners(): InputListenerCallback[] {
        // Copy to avoid modifying existing items from getter
        return [
            ...this._listeners
        ];
    }

    get keyStatusMap(): KeyStatusMap {
        return this._keyStatusMap;
    }

    public constructor() {
        window.addEventListener("keyup", (e) => this.onKeyUp(e), true);
        window.addEventListener("keydown", (e) => this.onKeyDown(e), true);
    }
    
    public pushInputListener(callback: InputListenerCallback): void {
        this._listeners.push(callback);
    }

    public update(): void {       
        this._listeners.forEach(listener => listener(this._keyStatusMap))
        

        // Empty listeners after every update
        this._listeners = [];
    }

    private onKeyDown(e: KeyboardEvent): void {
        this._keyStatusMap[e.code] = KeyStatus.Down;
    }

    private onKeyUp(e: KeyboardEvent): void {
        this._keyStatusMap[e.code] = KeyStatus.Up;
    }
}