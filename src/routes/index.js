import Login from './Login'

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
        Login(store)
    ]
});

export default createRoutes