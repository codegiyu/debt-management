import React from "react";
import useAlertStore from "../store/alertStore";

const Alert = () => {
    const alert = useAlertStore(state => state.alert)
    const setNewAlert = useAlertStore(state => state.setNewAlert)

    const handleCancelAlert = () => {
        setNewAlert("")
    }

    return (
        <div className="w-full md:w-[400px] px-4 py-2 flex gap-6 items-center justify-between bg-darkPrimary text-white font-inter rounded-md">
            <p className="">{ alert }</p>
            <button onClick={ handleCancelAlert } className="font-semibold text-sm bg-transparent outline-none border-none active:scale-95">
                x
            </button>
        </div>
    )
}

export default Alert