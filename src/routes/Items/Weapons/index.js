import { injectReducer } from '../../../store/reducers'
import {fetchWeapons} from "./modules/weapons";

export default (store) => ({
  path : 'weapons',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Weapons = require('./containers/WeaponsContainer').default
      const reducer = require('./modules/weapons').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'itemsWeapons', reducer })

      /*  Return getComponent   */
      cb(null, Weapons)

      /* Dispatch fetch weapons */
      store.dispatch(fetchWeapons())

      /* Webpack named bundle   */
    }, 'weapons')
  }
})
