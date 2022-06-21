import { isValid } from './isValid.js';

if (import.meta.vitest) {

    const { describe, expect, it } = import.meta.vitest;
    describe('Checking if correct type', () => {
        it('isfullnameValid?', () => {
            const [err, msg] = isValid.fullname('John Doe');
            expect(err).toBe(false);
            expect(msg).toBe('OK');
        });
    });

}