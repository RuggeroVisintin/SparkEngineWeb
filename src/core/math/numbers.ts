export function toRounded(num: number, precision: number): number {
    const factor = Math.pow(10, precision)
    return Math.round(num * factor) / factor;
}