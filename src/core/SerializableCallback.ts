export class SerializableCallback<T extends Function> {

    private constructor(
        private func: T,
        private readonly source: string
    ) {
    }

    static fromString<T extends Function>(source: string): SerializableCallback<T> {
        const func = new Function(`return (${source})`)();

        return new SerializableCallback(func, source);
    }

    static fromFunction<T extends Function>(func: T): SerializableCallback<T> {
        return new SerializableCallback(func, func.toString());
    }

    toString(): string {
        return this.source
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