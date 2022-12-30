import create from "zustand";
import { persist } from "zustand/middleware";


const useFavouritesStore = create(persist((set,get) => ({
    favourites: [],
    addToFavourites: (obj) => {
        return set((prevState) => ({ favourites: prevState.favourites.concat([obj])}))
    },
    removeFromFavourites: (id) => {
        return set((prevState) => ({ favourites: prevState.favourites.filter(item => item._id !== id)}))
    },
    existsInFavourites: (id) => get().favourites.some(item => item._id === id)
}),
    {
        name: "favourite-storage",
        getStorage: () => sessionStorage,
    }
))

export default useFavouritesStore