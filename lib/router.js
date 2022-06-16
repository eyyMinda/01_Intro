import { Page404 } from '../pages/404.js';
import { PageHome } from '../pages/Home.js';
import { PageLogin } from '../pages/login.js';
import { PageLogout } from '../pages/logout.js';
import { PageAccount } from '../pages/account.js';
import { PageRegister } from '../pages/register.js';
import { PageGameSudoku } from '../pages/sudoku.js';
import { PageGameHangMan } from '../pages/hangman.js';
import { PageGameTicTacToe } from '../pages/tictactoe.js';

const router = {};

router.commonRoutes = {
    '': PageHome,
    '404': Page404,
    'games/sudoku': PageGameSudoku,
    'games/tictactoe': PageGameTicTacToe,
    'games/hangman': PageGameHangMan,
};

router.publicRoutes = {
    ...router.commonRoutes,
    'register': PageRegister,
    'login': PageLogin,
};

router.privateRoutes = {
    ...router.commonRoutes,
    'logout': PageLogout,
    'account': PageAccount,
};

router.getRoute = (data) => {
    let pageClass = router.commonRoutes[404];
    const routes = data.user.isLoggedIn ? router.privateRoutes : router.publicRoutes;
    if (data.trimmedPath in routes) {
        pageClass = routes[data.trimmedPath];
    }
    return pageClass;
}

export { router };