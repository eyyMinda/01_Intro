class isValid {
    static fullname(str) {
        if (str === undefined || str === '') return [true, 'Enter fullname...'];
        if (typeof str !== 'string') return [true, 'Wrong type...'];

        str = str.trim().replace(/\s+/g, ' ');
        const minWordsCount = 2;
        const minWordLength = 2;
        const minTextLength = minWordsCount * minWordLength + (minWordsCount - 1);
        const allowedSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const words = str.split(' ');

        if (str.length < minTextLength) return [true, `Too short, has to be atleast ${minTextLength} symbols`];
        if (words.length < minWordsCount) return [true, `Fullname consists of ${minWordsCount} or more words`];

        for (const word of words) {
            if (word.length < minWordLength) return [true, `All parts of the name must be atleast ${minWordLength} symbols`];
            if (word[0].toUpperCase() !== word[0]) return [true, `First letter of a word must be upper cased`];

            const otherLetters = word.slice(1);
            if (otherLetters.toLowerCase() !== otherLetters) return [true, `Other than first letters of a word must be lower cased`];
            for (const s of word) { if (!allowedSymbols.includes(s)) return [true, `Symbol is not allowed "${s}"`]; }
        }
        return [false, 'OK'];
    }

    static email(str) {
        if (str === undefined || str === '') return [true, 'Enter email...'];
        if (typeof str !== 'string') return [true, 'Wrong type...'];
        if (!str.includes('@')) return [true, 'You forgot @']
        return [false, 'OK'];
    }

    static password(str) {
        if (str === undefined) return [true, 'Enter password...'];
        if (typeof str !== 'string') return [true, 'Wrong type...'];

        return [false, 'OK'];
    }
}

export { isValid };