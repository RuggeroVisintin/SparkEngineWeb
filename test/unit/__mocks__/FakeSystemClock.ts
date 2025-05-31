class FakeSystemClock {
    private currentTime: number = 0;
    public frameTimes: number[] = [];
    private index: number = 0;

    public now(): number {
        this.tick();
        return this.currentTime;
    }

    public tick(): void {
        this.currentTime += this.frameTimes[this.index];
        this.index = (this.index + 1) % this.frameTimes.length;
    }

    public reset(): void {
        this.currentTime = 0;
        this.index = 0;
        this.frameTimes = [];
    }
}

export const fakeSystemClock = new FakeSystemClock();
performance.now = fakeSystemClock.now.bind(fakeSystemClock);