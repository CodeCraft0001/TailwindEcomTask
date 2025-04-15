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

const initialState: CartState= {
    cartlist: [],
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
        },
        removefromCart : (state: CartState, action: PayloadAction<number>)=> {
            state.cartlist = state.cartlist.filter(item => item.id !== action.payload )
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: number; quantity: number }>
          ) => {
            const product = state.cartlist.find((item) => item.id === action.payload.id);
            if (product) {
              product.quantity = action.payload.quantity;
            }
          },
          increaseQty: (state, action: PayloadAction<number>) => {
            const existingProduct = state.cartlist.find(item => item.id === action.payload);
            if (existingProduct) {
              existingProduct.quantity += 1;
            }
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
          }
          
    },
})


export const {addToCart, removefromCart, updateQuantity, increaseQty, decreaseQty} = cartSlice.actions;
export default cartSlice.reducer;