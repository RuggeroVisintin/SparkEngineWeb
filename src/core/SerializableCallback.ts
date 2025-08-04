export class SerializableCallback<T extends Function = Function> {

    private constructor(
        private func: T,
        private readonly source: string,
        private readonly shouldSerialize: boolean = true
    ) {
    }

    static fromString<T extends Function = Function>(source: string, shouldSerialize?: boolean): SerializableCallback<T> {
        const func = new Function(`return (${source})`)();

        return new SerializableCallback(func, source, shouldSerialize);
    }

    static fromFunction<T extends Function = Function>(func: T, shouldSerialize?: boolean): SerializableCallback<T> {
        return new SerializableCallback(func, func.toString(), shouldSerialize);
    }

    toString(): string {
        if (!this.shouldSerialize) {
            return 'function [not serializable]';
        }

        return this.source
    }

    toJson(): this | undefined {
        if (!this.shouldSerialize) {
            return undefined;
        }

        return this;
    }

    call(thisArg: any, ...args: any[]): any {
        return this.apply(thisArg, args);
    }

    apply(thisArg: any, args?: any[]): any {
        return this.func.apply(thisArg, args);
    }

    bind(thisArg: any, ...args: any[]): SerializableCallback<T> {
        this.func = this.func.bind(thisArg, ...args);

        return this;
    }
}