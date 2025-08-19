
/**
 * @category Core
 * Rounds a number to a specified precision.
 * 
 * @param num - the number to round
 * @param precision = - the number of decimal places to round to
 * @returns - the rounded number
 */
export function toRounded(num: number, precision: number): number {
    const factor = Math.pow(10, precision)
    return Math.round(num * factor) / factor;
}