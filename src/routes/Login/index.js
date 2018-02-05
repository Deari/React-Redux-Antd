export default (store) => ({
    path: 'login',
    indexRoute: {
        getComponents(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../../pages/login/index').default)
            })
        }
    },
    childRoutes: []
})