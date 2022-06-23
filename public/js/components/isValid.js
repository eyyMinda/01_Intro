class isValid {
    static fullname(str) {
        if (str === undefined || str === '') return [true, 'Fullname cannot be blank'];
        if (typeof str !== 'string') return [true, 'Must be a string'];

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
        if (typeof str !== 'string') return [true, 'Must be a string'];
        str = str.trim().replace(/\s+/g, ' ');
        const regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;  ///Full Regex email validation form

        const minWordLength = 6;
        const allowedSymbols = /^([a-zA-Z0-9\.])/;
        const parts = str.split('@');
        const [locale, domain] = parts;
        if (str.length < minWordLength) return [true, `Too short, email must be atleast ${minWordLength} symbols`];
        if (parts.length !== 2) return [true, 'Email must contain one @ symbol'];
        if (locale === '') return [true, 'Missing email name before @ symbol'];
        if (domain === '') return [true, 'Missing email domain after @ symbol'];
        if (str.includes('..')) return [true, 'Email cannot contain 2 dots in a row'];
        if (locale[0] === '.' || !isNaN(+locale[0])) return [true, 'Email must start with a letter'];
        for (const s of locale) {
            if (!allowedSymbols.test(s)) return [true, `Email name includes a restricted symbol - ${s}`];
        };

        const domainParts = domain.split('.');
        if (domainParts.length === 1) return [true, 'Domain is incorrect. No dot (.) found after @ symbol'];
        if (domainParts[0] === '') return [true, 'Domain cannot start with a dot (.)'];
        if (domainParts[domainParts.length - 1].length < 2) return [true, 'Domain has to end with atleast 2 letters'];
        for (const s of domain) {
            if (!allowedSymbols.test(s)) return [true, `Email domain includes a restricted symbol ${s}`];
        };

        return [false, 'OK'];
    }

    static password(str) {
        const minPassLength = 12;
        if (str === undefined || str === '') return [true, 'Password cannot be blank'];
        if (typeof str !== 'string') return [true, 'Must be a string'];
        str = str.trim().replace(/\s+/g, ' ');
        if (str.length < minPassLength) return [true, `Password is too short, must be atleast ${minPassLength} symbols`];

        return [false, 'OK'];
    }
}

export { isValid };