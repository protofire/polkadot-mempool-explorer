import React, { createContext, useEffect, useReducer } from 'react'

import axios from 'utils/axios'

interface Network {
  id: string
  name: string
  url: string
}

export interface Transaction {
  hash: string
  update_at: string
  create_at: string
  block_number: string
  type: string
  nonce: number
  tip: number
  balance_transfer: string
  isValid: boolean
  isFinalized: boolean
  from: string
  to: string
}

interface State {
  isLoadingNetworks: boolean
  isLoadingTransactions: boolean
  selectedNetwork: Network
  networks: Network[]
  transactions: Transaction[]
  apiError: string | null
}

interface ActionPayload {
  live?: Network[]
  local?: Network[]
  test?: Network[]
  network?: Network
  transactions?: Transaction[]
  networkId?: string
  isLoading?: boolean
  apiError?: string | null
}

interface Action {
  type: string
  payload: ActionPayload
}

export interface StateContext extends State {
  getNetworks: () => void
  deleteNetwork: (networkId: string) => void
  selectNetwork: (network: Network) => void
  getTransactions: (networkId: string) => void
}

const networks: Network[] = [
  {
    id: 'polkadot',
    name: 'Polkadot',
    url: 'wss://cc1-1.polkadot.network',
  },
]
const initialState: State = {
  isLoadingNetworks: true,
  isLoadingTransactions: false,
  selectedNetwork: networks[0],
  networks,
  transactions: [],
  apiError: null,
}

/**
 * Actions
 */
const SET_NETWORKS_ACTION = 'SET_NETWORKS'
const SELECT_NETWORK_ACTION = 'SELECT_NETWORK'
const DELETE_NETWORKS_ACTION = 'DELETE_NETWORKS_ACTION'
const LOADING_NETWORKS_ACTION = 'LOADING_NETWORKS'
const LOADING_TRANSACTIONS_ACTION = 'LOADING_TRANSACTIONS'
const SET_TRANSACTIONS_ACTION = 'SET_TRANSACTIONS'

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_NETWORKS_ACTION: {
      const { isLoading, live, local, test } = action.payload
      const networks: Network[] = [...(live || []), ...(test || []), ...(local || [])]

      return {
        ...state,
        selectedNetwork: networks[0],
        isLoadingNetworks: typeof isLoading === 'boolean' ? isLoading : false,
        networks,
      }
    }
    case DELETE_NETWORKS_ACTION: {
      const { networks, selectedNetwork } = state
      const { networkId } = action.payload
      const filterNetworks = networks.filter((network) => network.id !== networkId)
      let newSelectedNetwork = selectedNetwork

      if (selectedNetwork.id === networkId) {
        newSelectedNetwork = networks[0]
      }

      return {
        ...state,
        selectedNetwork: newSelectedNetwork,
        networks: filterNetworks,
      }
    }
    case SELECT_NETWORK_ACTION: {
      const { network } = action.payload

      return {
        ...state,
        transactions: [],
        selectedNetwork: network || state.networks[0],
      }
    }
    case LOADING_NETWORKS_ACTION: {
      const { isLoading } = action.payload

      return {
        ...state,
        isLoadingNetworks: typeof isLoading === 'boolean' ? isLoading : false,
      }
    }
    case LOADING_TRANSACTIONS_ACTION: {
      const { isLoading } = action.payload

      return {
        ...state,
        isLoadingTransactions: typeof isLoading === 'boolean' ? isLoading : false,
      }
    }
    case SET_TRANSACTIONS_ACTION: {
      const { isLoading, transactions } = action.payload

      return {
        ...state,
        transactions: transactions || state.transactions || [],
        isLoadingTransactions: typeof isLoading === 'boolean' ? isLoading : false,
      }
    }
    default: {
      return { ...state }
    }
  }
}

const ExplorerContext = createContext({
  ...initialState,
  getNetworks: () => Promise.resolve(),
  deleteNetwork: (networkId: string) => Promise.resolve(),
  selectNetwork: (network: Network) => Promise.resolve(),
  getTransactions: (networkId: string) => Promise.resolve(),
})

export const ExplorerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getNetworks = async () => {
    dispatch({
      type: LOADING_NETWORKS_ACTION,
      payload: { isLoading: true },
    })

    try {
      const { data } = await axios.get('/networks')

      dispatch({
        type: SET_NETWORKS_ACTION,
        payload: {
          ...data,
          isLoading: false,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  const deleteNetwork = async (networkId: string) => {
    dispatch({
      type: DELETE_NETWORKS_ACTION,
      payload: { networkId },
    })
  }

  const selectNetwork = async (network: Network) => {
    dispatch({
      type: SELECT_NETWORK_ACTION,
      payload: { network },
    })
  }

  const getTransactions = async (networkId: string) => {
    dispatch({
      type: LOADING_TRANSACTIONS_ACTION,
      payload: { isLoading: true },
    })

    try {
      const { data } = await axios.get(`/transactions/${networkId}`)

      dispatch({
        type: SET_TRANSACTIONS_ACTION,
        payload: {
          transactions: data.items,
          isLoading: false,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getNetworks()
  }, [])

  useEffect(() => {
    getTransactions(state.selectedNetwork.id)

    const interval = setInterval(async () => {
      getTransactions(state.selectedNetwork.id)
    }, 5000)
    return () => clearInterval(interval)
  }, [state.selectedNetwork])

  return (
    <ExplorerContext.Provider
      value={{
        ...state,
        getNetworks,
        deleteNetwork,
        selectNetwork,
        getTransactions,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  )
}

export default ExplorerContext
