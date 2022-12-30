import create from "zustand";
import { persist } from "zustand/middleware";


const useCartStore = create(persist((set,get) => ({
    cart: {},
    numberInCart: 0,
    addToCart: (obj) => {
        return set((prevState) => ({ cart: {...prevState.cart, [obj._id]: obj}, numberInCart: prevState.numberInCart + 1 }))
    },
    removeFromCart: (id) => {
        let prevCart = get().cart
        delete prevCart[id]
        return set((prevState) => ({ cart: prevCart, numberInCart: prevState.numberInCart - 1 }))
    },
    removeAllFromCart: () => set({ cart: {}, numberInCart: 0 }),
    existsInCart: (id) => get().cart.hasOwnProperty(id)
}),
    {
        name: "cart-storage",
        getStorage: () => sessionStorage,
    }
))

export default useCartStore