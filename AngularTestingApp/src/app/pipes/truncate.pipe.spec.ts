import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
    let pipe: TruncatePipe;

    beforeEach(() => {
        pipe = new TruncatePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should truncate string if longer than limit', () => {
        const result = pipe.transform('Hello World', 5);
        expect(result).toBe('Hello...');
    });

    it('should not truncate if shorter than limit', () => {
        const result = pipe.transform('Hello', 10);
        expect(result).toBe('Hello');
    });

    it('should return empty string if input is null', () => {
        expect(pipe.transform('')).toBe('');
    });
});
