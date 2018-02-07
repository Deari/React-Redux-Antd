export default (store) => ({
    path: 'view-effective-input-records',
    indexRoute: {
        getComponents(nextState, cb) {
            require.ensure([], (require) => {
                cb(null, require('../../pages/effectiveManagement').InputWorkRecords)
            })
        }
    },
    childRoutes: []
})