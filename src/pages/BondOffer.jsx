import React, { useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import BondSingle from "../components/BondSingle";
import angleLeft from "../assets/img/angle-left.svg";
import angleRight from "../assets/img/angle-right.svg";
import uuid from "react-uuid";



const BondOffer = () => {
    let [screenWidth, setScreenWidth] = useState(window.innerWidth)
    let [allBonds, setAllBonds] = useState([])
    let [bondsArray, setBondsArray] = useState([])
    let [arrowIsVisible, setArrowIsVisible] = useState({left: false, right: true})

    const updateScreenWidth = () => setScreenWidth(window.innerWidth)

    const handlePrevItem = () => {
        setBondsArray((prevState) => {
            let arr = [...prevState]
            let firstIndex = arr[0]
            arr.pop()
            arr.unshift(--firstIndex)
            return arr
        })
    }

    const handleNextItem = () => {
        setBondsArray((prevState) => {
            let arr = [...prevState]
            let lastIndex = arr[arr.length - 1]
            arr.shift()
            arr.push(++lastIndex)
            return arr
        })
    }

    useEffect(() => {
        const getBonds = async () => {
            let result = await fetch("https://dmon-database.onrender.com/api/bonds/all-bonds")
            let obj = await result.text()
            obj = JSON.parse(obj)
            console.log(obj)
            let bonds = obj.data
            setAllBonds(bonds)
        }
        getBonds()
    }, [])

    useEffect(() => {
        window.addEventListener("resize", updateScreenWidth)
        return () => window.removeEventListener("resize", updateScreenWidth)
    }, [])

    useEffect(() => {
        if (screenWidth < 768) {
            setBondsArray([0])
        } else if (screenWidth >= 768 && screenWidth < 992) {
            setBondsArray([0, 1])
        } else if (screenWidth >= 992 && screenWidth < 1350) {
            setBondsArray([0, 1, 2])
        } else {
            setBondsArray([0, 1, 2, 3])
        }
    }, [screenWidth])

    useEffect(() => {
        if (bondsArray[bondsArray.length - 1] === allBonds.length - 1) {
            setArrowIsVisible((prevState) => {
                return { ...prevState, right: false}
            })
        } else {
            setArrowIsVisible((prevState) => {
                return { ...prevState, right: true}
            })
        }
        if (bondsArray.includes(0)) {
            setArrowIsVisible((prevState) => {
                return { ...prevState, left: false}
            })
        } else {
            setArrowIsVisible((prevState) => {
                return { ...prevState, left: true}
            })
        }
        console.log(bondsArray)
    }, [bondsArray, allBonds])

    return (
        <div className="w-full min-h-screen bg-body">
            <header className="w-full px-4 md:px-8 lg:px-10 xl:px-16">
                <ErrorBoundary>
                    <Header info={ {page: "bond-offer" } } />
                </ErrorBoundary>
            </header>
            <main className="w-full min-h-homeMain py-10 flex items-center justify-center px-4 md:px-8 lg:px-10 xl:px-16">
                <section className=" w-full">
                    <div className="w-full flex items-center justify-center md:justify-between relative">
                        { 
                            allBonds.length
                            ? bondsArray.map(
                                (item) => <ErrorBoundary key={ uuid() }><BondSingle key={ uuid() } obj={allBonds[item]} /></ErrorBoundary>
                                ) 
                            : ""
                        }
                        <img src={angleLeft} alt="arrow-left" onClick={ handlePrevItem } className={`w-14 lg:w-20 absolute top-arrowMob lg:top-arrow left-[-30px] 
                            ${arrowIsVisible.left ? "block" : "hidden"} cursor-pointer active:scale-95`} 
                        />
                        <img src={angleRight} alt="arrow-right" onClick={ handleNextItem } className={`w-14 lg:w-20 absolute top-arrowMob lg:top-arrow right-[-30px] 
                            ${arrowIsVisible.right ? "block" : "hidden"} cursor-pointer active:scale-95`} 
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default BondOffer