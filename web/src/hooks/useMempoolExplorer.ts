import { useContext } from 'react'

import ExplorerContext, { StateContext } from 'contexts/ExplorerContext'

const useMempoolExplorer = (): StateContext => useContext(ExplorerContext)

export default useMempoolExplorer
