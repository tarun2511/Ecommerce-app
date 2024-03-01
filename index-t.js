import {createStore} from "redux";


const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case "account/deposit":
            return {...state, balance: state.balance
                 + action.payload}
        case "account/withdraw":
            return {...state, balance: state.balance - action.payload}
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {...state, loan: action.payload}
        case 'account/payLoan':
            return {...state, laon: 0, loanPurpose: "",
        blalace: state.balance}

            default: 
            return state
        }
}

const store = createStore(reducer);
 
function payLoan() {
    return {type: "account/payLoan"}
}

function createCustomer(fullName, nationalID){
    return {
        type: "customer/createCustomer",
        payLoad: {fullName, nationalID, createdAt: new Date().toISOString(())}
    }
}

store.dispatch({type: "account/deposit", payload: 500});
store.dispatch({type: "account/withdwraw", payload: 200});

store.dispatch({type: "action/requestLoan", 
    payload: {amount: 1000, purpose: "Buy a car"}})
console.log(store.getState())



store.dipatch({
    type: "account/deposit", payload: {amount: 1000, purpose: "Buy a car"}
})