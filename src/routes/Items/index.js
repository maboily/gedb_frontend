import { injectReducer } from '../../store/reducers'
import WeaponsRoute from './Weapons';

export default (store) => ({
  path : 'items',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Items = require('./containers/ItemsContainer').default
      const reducer = require('./modules/items').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'items', reducer })

      /*  Return getComponent   */
      cb(null, Items)

      /* Webpack named bundle   */
    }, 'items')
  },
  childRoutes : [
    WeaponsRoute(store)
  ]
})
