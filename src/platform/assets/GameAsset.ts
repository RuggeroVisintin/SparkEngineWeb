import { v4 as uuid } from 'uuid';

/**
 * @category Platform
 * 
 * Abstract representation of a game asset.
 */
export abstract class GameAsset {
    /**
     * The unique identifier of the asset, use this identifier to reference the asset in the game bundle
     */
    public readonly id: string = uuid();
}