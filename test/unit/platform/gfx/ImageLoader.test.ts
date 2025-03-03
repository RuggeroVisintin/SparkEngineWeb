import { DOMImageLoader } from "../../../../src";
import '../../__mocks__';

describe('platform/gfx/ImageLoader', () => {
    describe('.load', () => {
        it('Should return a SoundAsset once loaded', async () => {        
            const imageLoader = new DOMImageLoader();
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

            const imageLoader = new DOMImageLoader();
            await expect(async () => {
                await imageLoader.load('test.png');
            }).rejects.toThrow('Error');
        })

        it('Should cache assets that are already loaded', async () => {
            const spy = jest.fn().mockResolvedValueOnce(() => { });
            
            global.Image = jest.fn().mockImplementation(() => ({
                onload: jest.fn(),
                set src(value: string) { 
                    spy();
                    this.onload();
                }
            }))

            const imageLoader = new DOMImageLoader();

            await imageLoader.load('test.png');
            await imageLoader.load('test.png');

            expect(spy).toHaveBeenCalledTimes(1);
        })
    })
})