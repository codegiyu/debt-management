import create from "zustand";
import { persist } from "zustand/middleware";


const useUserStore = create(persist((set,get) => ({
    user: {},
    isLoggedIn: false,
    setIsLoggedIn: (boolean) => set(() => (
        { isLoggedIn: boolean }
    )),
    setUser: (obj) => set(() => (
        { user: obj }
    )),
    logout: () => set(() => (
        { isLoggedIn: false, user: {} }
    ))
}),
    {
        name: "user-storage",
        getStorage: () => sessionStorage,
    }
))

export default useUserStore