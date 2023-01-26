import create from "zustand";
import { persist } from "zustand/middleware";


const useAlertStore = create(persist((set,get) => ({
    alert: "",
    alertType: "",
    setNewAlert: ({message, type}) => set(() => (
        { alert: message, alertType: type }
    )),
    clearAlert: () => set(() => (
        { alert: "", alertType: "" }
    )),
}),
    {
        name: "alert-storage",
        getStorage: () => sessionStorage,
    }
))

export default useAlertStore