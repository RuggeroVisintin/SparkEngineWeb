beforeEach(() => {
    global.fetch = jest.fn();
})

export const fetchMockData: Response  = {
    headers: {
        append: jest.fn(),
        delete: jest.fn(),
        get: jest.fn(),
        has: jest.fn(),
        set: jest.fn(),
        getSetCookie: jest.fn(),
        forEach: jest.fn(),
        entries: jest.fn(),
        keys: jest.fn(),
        values: jest.fn(),
        [Symbol.iterator]: jest.fn()
    },
    status: 200,
    statusText: 'OK',
    ok: true,
    redirected: false,
    type: 'basic',
    url: 'https://www.example.com',
    body: null,
    bodyUsed: false,
    clone: jest.fn(),
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    json: jest.fn(),
    text: jest.fn(),
    bytes: jest.fn()
}