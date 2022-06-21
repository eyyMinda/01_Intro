import { isValid } from './isValid.js';

if (import.meta.vitest) {
    const { describe, expect, it } = import.meta.vitest;

    describe('Fullname', () => {
        describe('Checking if correct type', () => {
            it('no params', () => {
                const [err, msg] = isValid.fullname();
                expect(msg).toBe('Enter fullname...');
                expect(err).toBe(true);
            });
            it('empty string', () => {
                const [err, msg] = isValid.fullname('');
                expect(msg).toBe('Enter fullname...');
                expect(err).toBe(true);
            });
            it('number', () => {
                const [err, msg] = isValid.fullname(1);
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('boolean', () => {
                const [err, msg] = isValid.fullname(true);
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('array', () => {
                const [err, msg] = isValid.fullname([]);
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('null', () => {
                const [err, msg] = isValid.fullname(null);
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('object', () => {
                const [err, msg] = isValid.fullname({});
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('function', () => {
                const [err, msg] = isValid.fullname(() => { });
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
        })

        describe('Checking if correct fullname', () => {
            it('single symbol too short', () => {
                const [err, msg] = isValid.fullname('Petr');
                expect(msg).toBe('Too short, has to be atleast 5 symbols');
                expect(err).toBe(true);
            });
            it('single word', () => {
                const [err, msg] = isValid.fullname('Petra');
                expect(msg).toBe('Fullname consists of 2 or more words');
                expect(err).toBe(true);
            });
            it('long single word', () => {
                const [err, msg] = isValid.fullname('PetrasPetraitis');
                expect(msg).toBe('Fullname consists of 2 or more words');
                expect(err).toBe(true);
            });
            it('one of words is too short', () => {
                const [err, msg] = isValid.fullname('Petras P');
                expect(msg).toBe('All parts of the name must be atleast 2 symbols');
                expect(err).toBe(true);
            });
            it('few words is too short', () => {
                const [err, msg] = isValid.fullname('Petras P A Petraitis');
                expect(msg).toBe('All parts of the name must be atleast 2 symbols');
                expect(err).toBe(true);
            });
            it('not allowed symbol: 🎅', () => {
                const [err, msg] = isValid.fullname('Santa 🎅🎅🎅 Clause');
                expect(msg).toBe('Symbol is not allowed "🎅"');
                expect(err).toBe(true);
            });
            it('not allowed symbol: 5', () => {
                const [err, msg] = isValid.fullname('Santa Area5 Clause');
                expect(msg).toBe('Symbol is not allowed "5"');
                expect(err).toBe(true);
            });
            it('not allowed symbol: .', () => {
                const [err, msg] = isValid.fullname('Santa Area. Clause');
                expect(msg).toBe('Symbol is not allowed "."');
                expect(err).toBe(true);
            });
            it('uppercase letter: end', () => {
                const [err, msg] = isValid.fullname('Santa MariA');
                expect(msg).toBe('Other than first letters of a word must be lower cased');
                expect(err).toBe(true);
            });
            it('uppercase letter: middle', () => {
                const [err, msg] = isValid.fullname('SanTa Maria');
                expect(msg).toBe('Other than first letters of a word must be lower cased');
                expect(err).toBe(true);
            });
            it('uppercase letter: all', () => {
                const [err, msg] = isValid.fullname('SANTA MARIA');
                expect(msg).toBe('Other than first letters of a word must be lower cased');
                expect(err).toBe(true);
            });
            it('lowercase letter: first (1)', () => {
                const [err, msg] = isValid.fullname('santa Maria');
                expect(msg).toBe('First letter of a word must be upper cased');
                expect(err).toBe(true);
            });
            it('lowercase letter: first (2)', () => {
                const [err, msg] = isValid.fullname('Santa maria');
                expect(msg).toBe('First letter of a word must be upper cased');
                expect(err).toBe(true);
            });
            it('mixed upper/lower letters (1)', () => {
                const [err, msg] = isValid.fullname('SanTa marIa');
                expect(msg).toBe('Other than first letters of a word must be lower cased');
                expect(err).toBe(true);
            });
            it('mixed upper/lower letters (2)', () => {
                const [err, msg] = isValid.fullname('sANTA mARIA');
                expect(msg).toBe('First letter of a word must be upper cased');
                expect(err).toBe(true);
            });
        });

        describe('Correct fullname, but with forgiving faults', () => {
            it('many spaces in between', () => {
                const [err, msg] = isValid.fullname('Jonas   Jonaitis');
                expect(err).toBe(false);
                expect(msg).toBe('OK');
            });
            it('many spaces in front', () => {
                const [err, msg] = isValid.fullname('   Jonas Jonaitis');
                expect(err).toBe(false);
                expect(msg).toBe('OK');
            });
            it('many spaces at the end', () => {
                const [err, msg] = isValid.fullname('Jonas Jonaitis   ');
                expect(err).toBe(false);
                expect(msg).toBe('OK');
            });
        });

        describe('Correct fullname', () => {
            it('two words', () => {
                const [err, msg] = isValid.fullname('Petras Petraitis');
                expect(err).toBe(false);
                expect(msg).toBe('OK');
            });
            it('three words', () => {
                const [err, msg] = isValid.fullname('Jon Bon Jovi');
                expect(err).toBe(false);
                expect(msg).toBe('OK');
            });
            it('four words', () => {
                const [err, msg] = isValid.fullname('Jean Clode Van Damme');
                expect(err).toBe(false);
                expect(msg).toBe('OK');
            });
        });
    });

    describe('Email', () => {
        describe('Checking if correct type', () => {
            it('no params', () => {
                const [err, msg] = isValid.email();
                expect(msg).toBe('Enter email...');
                expect(err).toBe(true);
            });
            it('number', () => {
                const [err, msg] = isValid.email(1);
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('boolean', () => {
                const [err, msg] = isValid.email(true);
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('array', () => {
                const [err, msg] = isValid.email([]);
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('null', () => {
                const [err, msg] = isValid.email(null);
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('object', () => {
                const [err, msg] = isValid.email({});
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
            it('function', () => {
                const [err, msg] = isValid.email(() => { });
                expect(msg).toBe('Wrong type...');
                expect(err).toBe(true);
            });
        });

        describe('Checking if email', () => {
            it('empty string', () => {
                const [err, msg] = isValid.email('');
                expect(msg).toBe('Enter email...');
                expect(err).toBe(true);
            });
            it('no @', () => {
                const [err, msg] = isValid.email('absgmail.com');
                expect(msg).toBe('You forgot @');
                expect(err).toBe(true);
            });
        });

        describe('Correct email, but with forgiving faults', () => {
            it('many spaces in front', () => {
                const [err, msg] = isValid.email('  petras@petras.xyz');
                expect(err).toBe(false);
                expect(msg).toBe('OK');
            });
            it('many spaces at the end', () => {
                const [err, msg] = isValid.email('petras@petras.xyz   ');
                expect(err).toBe(false);
                expect(msg).toBe('OK');
            });
        });

        describe('Correct email', () => {
            it('OK-shortest', () => {
                const [err, msg] = isValid.email('a@c.c.co');
                expect(msg).toBe('OK');
                expect(err).toBe(false);
            });
            it('OK-common', () => {
                const [err, msg] = isValid.email('abs@gmail.com');
                expect(msg).toBe('OK');
                expect(err).toBe(false);
            });
            it('OK-tougher', () => {
                const [err, msg] = isValid.email('Jean144.Kent@m.le');
                expect(msg).toBe('OK');
                expect(err).toBe(false);
            });
        });
    });

}