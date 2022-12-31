import React, { useState, useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";


const SuspenseBar = () => {
    return (
        <div className="w-full h-full bg-slate-300">

        </div>
    )
}


const BondSuspense = () => {
    
    let [screenWidth, setScreenWidth] = useState(window.innerWidth)
    let [cardWidth, setCardWidth] = useState("w-[330px]")

    const updateScreenWidth = () => setScreenWidth(window.innerWidth)

    useEffect(() => {
        window.addEventListener("resize", updateScreenWidth)
        return () => window.removeEventListener("resize", updateScreenWidth)
    }, [])

    useEffect(() => {
        if (screenWidth < 375) {
            setCardWidth("w-[300px]")
        } else if (screenWidth >= 375 && screenWidth < 400) {
            setCardWidth("w-[330px]")
        } else if (screenWidth >= 400 && screenWidth < 992) {
            setCardWidth("w-[350px]")
        } else if (screenWidth >= 992 && screenWidth < 1150) {
            setCardWidth("w-[300px]")
        } else if (screenWidth >= 1150 && screenWidth < 1350) {
            setCardWidth("w-[330px]")
        } else if (screenWidth >= 1350 && screenWidth < 1480) {
            setCardWidth("w-[300px]")
        } else {
            setCardWidth("w-[330px]")
        }
    }, [screenWidth])

    return (
        <div className={`${ cardWidth } h-auto pt-2 pb-8 px-4 font-inter border border-primary rounded-xl`}>
            <div className="h-14 w-full">
                <ErrorBoundary>
                    <SuspenseBar />
                </ErrorBoundary>
            </div>
            <div className="flex flex-col mt-6">
                <div className="h-[30px] w-full">
                    <ErrorBoundary>
                        <SuspenseBar />
                    </ErrorBoundary>
                </div>
                <div className="w-full flex justify-center">
                    <div className="h-[20px] w-[150px]">
                        <ErrorBoundary>
                            <SuspenseBar />
                        </ErrorBoundary>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 mt-3">
                <div className="h-[20px] w-full">
                    <ErrorBoundary>
                        <SuspenseBar />
                    </ErrorBoundary>
                </div>
                <div className="h-[20px] w-full">
                    <ErrorBoundary>
                        <SuspenseBar />
                    </ErrorBoundary>
                </div>
                <div className="h-[20px] w-full">
                    <ErrorBoundary>
                        <SuspenseBar />
                    </ErrorBoundary>
                </div>
                <div className="h-[20px] w-full">
                    <ErrorBoundary>
                        <SuspenseBar />
                    </ErrorBoundary>
                </div>
                <div className="h-[20px] w-full">
                    <ErrorBoundary>
                        <SuspenseBar />
                    </ErrorBoundary>
                </div>
                <div className="h-[20px] w-full">
                    <ErrorBoundary>
                        <SuspenseBar />
                    </ErrorBoundary>
                </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-8">
                
                <div className="h-[80px] w-[70%]">
                    <ErrorBoundary>
                        <SuspenseBar />
                    </ErrorBoundary>
                </div>
                <div className="h-10 w-10">
                    <ErrorBoundary>
                        <SuspenseBar />
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    )
}

export default BondSuspense