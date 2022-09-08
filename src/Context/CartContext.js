import { createContext, useContext, useReducer } from "react";

const CartState = createContext();
const CartDispatch = createContext();
export const initialState = null; 

export const reducer = (state, action) =>{
    switch(action.type){
        case 'ADD_ITEM' :
            const cartData = [...state, action.item]
            localStorage.setItem('cartItems', JSON.stringify(cartData))
            return [...state, action.item]
            
         case 'REMOVE_ITEM':
            const newArr = [...state];
            const mynewARR = newArr.splice(action.index, 1);
            localStorage.setItem('cartItems', JSON.stringify(mynewARR))
            return mynewARR;

        case 'USER':
            return action.payload;

        default:
            throw new Error(`Unknown Error ${action.type}`);
    }

}


export const CartProvider = ({children}) =>{

    const [state,dispatch] = useReducer(reducer, []);

    return (
        <CartDispatch.Provider value={dispatch}>
            <CartState.Provider value={state}>
                {children}
            </CartState.Provider>
        </CartDispatch.Provider>
    )

}


export const useCart = () => useContext(CartState);
export const useDipatchCart = () => useContext(CartDispatch);