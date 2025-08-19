
/** 
 * @category Core
 * 
 * SerializableCallback represents a serializable function, which can be serialized to a string and later deserialized back to a function.
 * 
 */
export class SerializableCallback<T extends Function = Function> {

    private constructor(
        private func: T,
        private readonly source: string,
        private readonly shouldSerialize: boolean = true
    ) {
    }

    /**
     * Creates a new SerializableCallback instance from a function source code.
     * 
     * @param source - the source code of the function
     * @param shouldSerialize - whether the function should be serialized or not
     * @returns a new SerializableCallback instance
     */
    static fromString<T extends Function = Function>(source: string, shouldSerialize?: boolean): SerializableCallback<T> {
        const func = new Function(`return (${source})`)();

        return new SerializableCallback(func, source, shouldSerialize);
    }

    /**
     * 
     * @param func - the source function to create a SerializableCallback from
     * @param shouldSerialize - whether the function should be serialized or not
     * @returns a new SerializableCallback instance
     */
    static fromFunction<T extends Function = Function>(func: T, shouldSerialize?: boolean): SerializableCallback<T> {
        return new SerializableCallback(func, func.toString(), shouldSerialize);
    }

    /**
     * Converts the SerializableCallback to a string representing its source code.
     * @returns the source code of the function as a string if serializable, otherwise 'function [not serializable]'
     */
    toString(): string {
        if (!this.shouldSerialize) {
            return 'function [not serializable]';
        }

        return this.source
    }

    /**
     * Converts the SerializableCallback to a JSON object.
     * @returns the SerializableCallback as a JSON object if serializable
     */
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