import Login from './Login'
import EffectiveManagement from './EffectiveManagement'

const createRoutes = (store) => ({
    path: '/',
    onEnter: () => {
    },
    indexRoute: {
        getComponents(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../pages/home').default)
            })
        }
    },
    childRoutes: [
        Login(store),
        EffectiveManagement(store)

    ]
});

export default createRoutes