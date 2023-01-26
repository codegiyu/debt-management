import React from "react";
import { useEffect } from "react";
import useAlertStore from "../store/alertStore";

const Alert = () => {
    const alert = useAlertStore(state => state.alert)
    const alertType = useAlertStore(state => state.alertType)
    const clearAlert = useAlertStore(state => state.clearAlert)

    let background = alertType === "error" ? "bg-red" : "bg-primary"

    const handleCancelAlert = () => {
        clearAlert()
    }

    useEffect(() => {
        setTimeout(() => {
            clearAlert()
        }, 5000)
    })

    return (
        <div className={`w-full md:w-[400px] px-4 py-2 flex gap-6 items-center justify-between ${background} text-white font-inter rounded-md`}>
            <p className="">{ alert }</p>
            <button onClick={ handleCancelAlert } className="font-semibold text-sm bg-transparent outline-none border-none active:scale-95">
                x
            </button>
        </div>
    )
}

export default Alert