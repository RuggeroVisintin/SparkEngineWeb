import { ImageLoader } from "../../../../src";
import '../../__mocks__';

describe('platform/gfx/ImageLoader', () => {
    describe('.load', () => {
        it('Should return a SoundAsset once loaded', async () => {        
            const imageLoader = new ImageLoader();
            const imageAsset = await imageLoader.load('test.png');
            expect(imageAsset).toBeDefined();
        })

        it('Should throw an Error if the SoundAsset is not found', async () => {
            global.Image = jest.fn().mockImplementation(() => ({
                onerror: jest.fn(),
                set src(value: string) { 
                    this.onerror(new Error('Error'))
                }
            }))

            const imageLoader = new ImageLoader();
            await expect(async () => {
                await imageLoader.load('test.png');
            }).rejects.toThrow('Error');
        })
    })
})