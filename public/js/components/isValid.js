class isValid {
    static fullname(str) {
        if (str.length < 7) {
            return [true, 'Fullname Too Short...'];
        }
        const parts = str.split(' ');
        if (parts.length < 2) {
            return [true, 'Fullname consists of First and Last name...'];
        }
        return [false, 'All Set!'];
    }
    static email(str) {
        if (str.length < 2) {
            return [true, 'Email Too Short...'];
        }
        return [false, 'All Set!'];
    }
    static password(str) {
        if (str.length < 2) {
            return [true, 'Password Too Short...'];
        }
        return [false, 'All Set!'];
    }
}
export { isValid };