import { isValid } from './isValid.js';

if (import.meta.vitest) {
    const { describe, expect, it } = import.meta.vitest;

    describe('Fullname', () => {
        describe('Checking if correct type', () => {
            it('no params', () => {
                const [err, msg] = isValid.fullname();
                expect(msg).toBe('Fullname cannot be blank');
                expect(err).toBe(true);
            });
            it('empty string', () => {
                const [err, msg] = isValid.fullname('');
                expect(msg).toBe('Fullname cannot be blank');
                expect(err).toBe(true);
            });
            it('number', () => {
                const [err, msg] = isValid.fullname(1);
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('boolean', () => {
                const [err, msg] = isValid.fullname(true);
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('array', () => {
                const [err, msg] = isValid.fullname([]);
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('null', () => {
                const [err, msg] = isValid.fullname(null);
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('object', () => {
                const [err, msg] = isValid.fullname({});
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('function', () => {
                const [err, msg] = isValid.fullname(() => { });
                expect(msg).toBe('Must be a string');
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
            it('Too long name', () => {
                const [err, msg] = IsValid.fullname('Santa Maria' + 'a'.repeat(100));
                expect(err).toBe(true);
                expect(msg).toBe('Fullname is too long, must be less than 100 letters');
            })
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
                expect(msg).toBe('Email cannot be blank');
                expect(err).toBe(true);
            });
            it('number', () => {
                const [err, msg] = isValid.email(1);
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('boolean', () => {
                const [err, msg] = isValid.email(true);
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('array', () => {
                const [err, msg] = isValid.email([]);
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('null', () => {
                const [err, msg] = isValid.email(null);
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('object', () => {
                const [err, msg] = isValid.email({});
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
            it('function', () => {
                const [err, msg] = isValid.email(() => { });
                expect(msg).toBe('Must be a string');
                expect(err).toBe(true);
            });
        });

        describe('Checking if correct email', () => {
            it('empty string', () => {
                const [err, msg] = isValid.email('');
                expect(msg).toBe('Email cannot be blank');
                expect(err).toBe(true);
            });
            it('no @', () => {
                const [err, msg] = isValid.email('absgmail.com');
                expect(msg).toBe('Email must contain one @ symbol');
                expect(err).toBe(true);
            });
            it('multiple @', () => {
                const [err, msg] = isValid.email('abs@gmail.com@');
                expect(msg).toBe('Email must contain one @ symbol');
                expect(err).toBe(true);
            });
            it('no locale', () => {
                const [err, msg] = isValid.email('@gmail.com');
                expect(msg).toBe('Missing email name before @ symbol');
                expect(err).toBe(true);
            });
            it('no first part of domain before dot', () => {
                const [err, msg] = isValid.email('aaa@.com');
                expect(msg).toBe('Domain cannot start with a dot (.)');
                expect(err).toBe(true);
            });
            it('no second part of domain', () => {
                const [err, msg] = isValid.email('fefef@gm');
                expect(msg).toBe('Domain is incorrect. No dot (.) found after @ symbol');
                expect(err).toBe(true);
            });
            it('domains end is too short', () => {
                const [err, msg] = isValid.email('geege@gml.c');
                expect(msg).toBe('Domain has to end with atleast 2 letters');
                expect(err).toBe(true);
            });
            it('Too long email', () => {
                const [error, msg] = IsValid.email('a'.repeat(100) + 'asd.123@mail.com');
                expect(error).toEqual(true);
                expect(msg.length).toBeGreaterThan(0);
            })

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
                const [err, msg] = isValid.email('a@a.lt');
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
            it('correct value (4)', () => {
                const [error, msg] = isValid.email('name.surname123@mail.com');
                expect(error).toEqual(false);
                expect(msg).toBe('OK');
            });
            it('correct value (5)', () => {
                const [error, msg] = isValid.email('name.surname@123mail.com');
                expect(error).toEqual(false);
                expect(msg).toBe('OK');
            });
            it('correct value (6)', () => {
                const [error, msg] = isValid.email('name.surname@sub.mail.com');
                expect(error).toEqual(false);
                expect(msg).toBe('OK');
            });
            it('correct value (7)', () => {
                const [error, msg] = isValid.email('name.surname@y.x.co.uk');
                expect(error).toEqual(false);
                expect(msg).toBe('OK');
            });
        });
    });

}