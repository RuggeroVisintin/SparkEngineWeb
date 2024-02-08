export enum KeyStatus {
    Up,
    Down
};

export interface KeyEvent {
    status: KeyStatus,
    code: string
}

type InputListenerCallback = (event: KeyEvent) => void;

export class KeyboardDevice {
    private _listeners: InputListenerCallback[] = [];
    private _keyStatusMap: Record<string, KeyStatus> = {};
    private _lastKeyStatusMap: Record<string, KeyStatus> = {};

    get listeners(): InputListenerCallback[] {
        // Copy to avoid modifying existing items from getter
        return [
            ...this._listeners
        ];
    }

    public constructor() {
        window.addEventListener("keydown", (e) => this.onKeyDown(e), true);
        window.addEventListener("keyup", (e) => this.onKeyUp(e), true);
    }
    
    public pushInputListener(callback: InputListenerCallback): void {
        this._listeners.push(callback);
    }

    public update(): void {
        Object
            .entries(this._keyStatusMap)
            .forEach(([key, value]) => {
                this._listeners.forEach(listener => listener({
                    code: key,
                    status: value
                }))
        })

        // Empty listeners after every update
        this._listeners = [];

        this._lastKeyStatusMap = { ...this._keyStatusMap };
        
        // Empty status map to avoid triggering the same key status over and over again
        this._keyStatusMap = {};
    }

    private onKeyDown(e: KeyboardEvent): void {
        if (e.repeat && this._lastKeyStatusMap[e.code] === KeyStatus.Down) return;

        this._keyStatusMap[e.code] = KeyStatus.Down;
    }

    private onKeyUp(e: KeyboardEvent): void {
        if (e.repeat && this._lastKeyStatusMap[e.code] === KeyStatus.Up) return;

        this._keyStatusMap[e.code] = KeyStatus.Up;
    }
}