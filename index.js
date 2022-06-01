const Redux = require('redux')

const { createStore, combineReducers } = Redux

const CREATE_CONTRACT = 'CREATE_CONTRACT'
const CANCEL_CONTRACT = 'CANCEL_CONTRACT'
const CASHBACK = 'CASHBACK'

const createContract = (name, tax) => {
    return {
        type: 'CREATE_CONTRACT',
        payload: { name, tax }
    }
}

const cancelContract = (name) => {
    return {
        type: 'CANCEL_CONTRACT',
        payload: { name }
    }
}

const requestCashback = (name, amount) => {
    return {
        type: 'CASHBACK',
        payload: { name, amount }
    }
}

const historyOfCashbackRequests = (cashbacks = [], action) => {
    if (action.type === CASHBACK) {
        return [
            ...cashbacks,
            action.payload
        ]
    }

    return cashbacks
}

const companyFunds = (funds = 0, action) => {
    if (action.type === CASHBACK) {
        funds -= action.payload.amount
    }

    if (action.type === CREATE_CONTRACT) {
        funds += action.payload.tax
    }

    return funds
}

const companyContracts = (contracts = [], action) => {
    if (action.type === CREATE_CONTRACT) {
        return [...contracts, action.payload]
    }

    if (action.type === CANCEL_CONTRACT) {
        return contracts.filter(contract => contract.name !== action.payload.name)
    }

    return contracts
}

const reducers = combineReducers({
    historyOfCashbackRequests,
    companyFunds,
    companyContracts
})

const store = createStore(reducers)

const transacao = (store) => {
    const people = ['João', 'Marcos', 'Felipe', 'Vanessa']

    const operations = {
        0: (name) => {
            store.dispatch(createContract(name, 1))
        },
        1: (name) => {
            store.dispatch(cancelContract(name))
        },
        2: (name) => {
            const amount = parseInt(Math.random() * 30 - 10) + 10
            store.dispatch(requestCashback(name, amount))
        }
    }

    const operation = parseInt(Math.random() * 2)
    const personIndex = parseInt(Math.random() * 2)
    operations[operation](people[personIndex])

    console.log(store.getState())
}

setInterval(() => transacao(store), 5000)
