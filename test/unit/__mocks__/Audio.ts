beforeEach(() => {
    global.Audio = jest.fn().mockImplementation(() => ({
            oncanplay: jest.fn(),
            onerror: jest.fn().mockRejectedValue(new Error('Error')),
            pause: jest.fn(),
            play: jest.fn(),
            load: jest.fn(function () {
                this.oncanplay();
        })
    }))
})
