import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // cartItems: [],
    cartItems: sessionStorage.getItem("cartItems")
      ? JSON.parse(sessionStorage.getItem("cartItems"))
      : [],
    qty: 1,
  },
  reducers: {
    addItem: (state, action) => {
      if (state.cartItems.length === 0) {
        let pItem = {
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        };
        state.cartItems.push(pItem);
      } else {
        let isAdded = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (isAdded > -1) {
          let cItems = state.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              let quantity = item.quantity + 1;
              let totalPrice = quantity * item.price;
              return {
                ...item,
                quantity,
                totalPrice,
              };
            } else {
              return item;
            }
          });
          state.cartItems = cItems;
        } else {
          let pItem = {
            ...action.payload,
            quantity: 1,
            totalPrice: action.payload.price,
          };
          console.log(pItem);
          state.cartItems.push(pItem);
        }
      }
      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem: (state, action) => {
      let isAdded = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (isAdded > -1) {
        if (action.payload.quantity <= 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          let cItems = state.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              let quantity = item.quantity - 1;
              let totalPrice = quantity * item.price;
              return {
                ...item,
                quantity,
                totalPrice,
              };
            } else {
              return item;
            }
          });
          state.cartItems = cItems;
        }
      }
      sessionStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    addXItems: (state, action) => {
      state.qty = action.payload;
    },
    removeAllItems: (state, action) => {
      state.cartItems = [];
      sessionStorage.setItem("cartItems", []);
    },
  },
});

export const { addItem, removeItem, removeAllItems } = cartSlice.actions;
export default cartSlice.reducer;

// export const addX = (n) =>  (dispatch) => {
//     if (state.cartItems.length === 0) {
//         let pItem = {
//             ...action.payload,
//             quantity: 1,
//             totalPrice: action.payload.price,
//         };
//         state.cartItems.push(pItem);
//     } else {
//         let isAdded = state.cartItems.findIndex(
//             (item) => item.id === action.payload.id
//         );
//         if (isAdded > -1) {
//             let cItems = state.cartItems.map((item) => {
//                 if (item.id === action.payload.id) {
//                     let quantity = item.quantity + n;
//                     let totalPrice = quantity * item.price;
//                     return {
//                         ...item,
//                         quantity,
//                         totalPrice,
//                     };
//                 } else {
//                     return item;
//                 }
//             });
//             state.cartItems = cItems;
//         } else {
//             let pItem = {
//                 ...action.payload,
//                 quantity: 1,
//                 totalPrice: action.payload.price,
//             };
//             console.log(pItem);
//             state.cartItems.push(pItem);
//         }
//     }
// };
