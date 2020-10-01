import { LazyComponent } from '../../utils'
import DetailSection from './DetailSection'

const lazyRepo = new LazyComponent(() => import('./Repo'))
const lazyRepoCode = new LazyComponent(() => import('./RepoCode'))
const lazyRepoSubCode = new LazyComponent(() => import('./RepoSubCode'))

export { lazyRepo, lazyRepoCode, lazyRepoSubCode, DetailSection }
