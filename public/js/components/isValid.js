class isValid {
    static fullname(str) {
        if (str === undefined || str === '') return [true, 'Fullname cannot be blank'];
        if (typeof str !== 'string') return [true, 'Wrong type'];

        str = str.trim().replace(/\s+/g, ' ');
        const minWordsCount = 2;
        const minWordLength = 2;
        const minTextLength = minWordsCount * minWordLength + (minWordsCount - 1);
        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const words = str.split(' ');

        if (str.length < minTextLength) return [true, `Too short, has to be atleast ${minTextLength} symbols`];
        if (words.length < minWordsCount) return [true, `Fullname consists of ${minWordsCount} or more words`];

        for (const word of words) {
            const otherLetters = word.slice(1);
            if (word.length < minWordLength) return [true, `All parts of the name must be atleast ${minWordLength} symbols`];
            if (word[0].toUpperCase() !== word[0]) return [true, `First letter of a word must be upper cased`];
            if (otherLetters.toLowerCase() !== otherLetters) return [true, `Other than first letters of a word must be lower cased`];
            for (const s of word) { if (!allowedSymbols.includes(s)) return [true, `Symbol is not allowed "${s}"`]; };
        }
        return [false, 'OK'];
    }

    static email(str) {
        if (str === undefined || str === '') return [true, 'Email cannot be blank'];
        if (typeof str !== 'string') return [true, 'Wrong type'];

        str = str.trim().replace(/\s+/g, ' ');
        const minWordLength = 6;
        const ats = str.split('@').length - 1;
        const regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/  ///Full Regex email validation form

        if (str.length < minWordLength) return [true, `Too short, email must be atleast ${minWordLength} symbols`];
        if (ats < 1) return [true, 'You forgot @'];
        if (ats > 1) return [true, 'Must only be one @ symbol'];


        if (regx.test(str)) return [false, 'OK']
    }

    static password(str) {
        if (str === undefined || str === '') return [true, 'Password cannot be blank'];
        if (typeof str !== 'string') return [true, 'Wrong type'];

        str = str.trim().replace(/\s+/g, ' ');

        return [false, 'OK'];
    }
}

export { isValid };