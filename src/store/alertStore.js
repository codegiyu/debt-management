import create from "zustand";
import { persist } from "zustand/middleware";


const useAlertStore = create(persist((set,get) => ({
    alert: "",
    setNewAlert: (string) => set(() => (
        { alert: string }
    )),
}),
    {
        name: "alert-storage",
        getStorage: () => sessionStorage,
    }
))

export default useAlertStore