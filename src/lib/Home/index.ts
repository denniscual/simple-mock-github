import { LazyComponent } from '../../utils'

export default new LazyComponent(() => import('./Home'))
