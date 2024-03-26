beforeEach(() => {
    global.Image = jest.fn().mockImplementation(() => ({
            oncanplay: jest.fn(),
            onerror: jest.fn().mockRejectedValue(new Error('Error')),
            onload: jest.fn(),
            pause: jest.fn(),
            set src(value: string) { 
                this.onload();
            }
    }))

    global.createImageBitmap = jest.fn((image: any) => Promise.resolve(image)) 
})
