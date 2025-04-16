import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface CartItem {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
    [key: string]: any;
    description: string;
    stock: number;
    discountPercentage: number;
    returnPolicy: string;
    brand: string;
}

interface CartState {
    cartlist: CartItem[]
}

//(1) Local Storage
const localData = localStorage.getItem('cartItems');
const initialState: CartState= {
    cartlist: localData ? JSON.parse(localData) :[], //(2)
}

const cartSlice = createSlice({
    name : 'cart',
    initialState ,
    reducers : {
        addToCart : (state: CartState, action: PayloadAction<CartItem>)=> {
            const existingProduct = state.cartlist.find(item => item.id === action.payload.id)

            if(existingProduct){
                existingProduct.quantity += action.payload.quantity
            }
            else{
                state.cartlist.push({...action.payload})
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartlist)) // (3) and Change other Reducers like this
        },
        removefromCart : (state: CartState, action: PayloadAction<number>)=> {
            state.cartlist = state.cartlist.filter(item => item.id !== action.payload )

            localStorage.setItem('cartItems', JSON.stringify(state.cartlist))
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
          ) => {
            const product = state.cartlist.find((item) => item.id === action.payload.id);
            if (product) {
              product.quantity = action.payload.quantity;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartlist))
          },
          increaseQty: (state, action: PayloadAction<number>) => {
            const existingProduct = state.cartlist.find(item => item.id === action.payload);
            if (existingProduct) {
              existingProduct.quantity += 1;
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartlist))
          },
          decreaseQty: (state, action: PayloadAction<number>) => {
            const existingProduct = state.cartlist.find(item => item.id === action.payload);
          
            if (existingProduct) {
              if (existingProduct.quantity === 1) {
                state.cartlist = state.cartlist.filter(item => item.id !== action.payload);
              } else {
                existingProduct.quantity -= 1;
              }
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartlist))
          }
          
    },
})


export const {addToCart, removefromCart, updateQuantity, increaseQty, decreaseQty} = cartSlice.actions;
export default cartSlice.reducer;