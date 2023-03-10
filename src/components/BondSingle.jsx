import React, { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
import heartIcon from "../assets/img/heart.svg";
import heartFillIcon from "../assets/img/heart-fill.svg";
import useCartStore from "../store/cartStore";
import useFavouritesStore from "../store/favouritesStore";


const BondSingle = (props) => {
    let {_id, name, type, minimum, perYear, interestPayment, opening, closing, settlement, due} = props.obj

    const existsInCart = useCartStore(state => state.existsInCart)
    const addToCart = useCartStore(state => state.addToCart)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const addToFavourites = useFavouritesStore(state => state.addToFavourites)
    const removeFromFavourites = useFavouritesStore(state => state.removeFromFavourites)
    const existsInFavourites = useFavouritesStore(state => state.existsInFavourites)

    let [currentlyInCart, setCurrentlyInCart] = useState(existsInCart(_id))
    let [currentlyInFavourites, setCurrentlyInFavourites] = useState(existsInFavourites(_id))
    let [screenWidth, setScreenWidth] = useState(window.innerWidth)
    let [cardWidth, setCardWidth] = useState("w-[330px]")

    const updateScreenWidth = () => setScreenWidth(window.innerWidth)

    const handleCartButton = () => {
        setCurrentlyInCart(!currentlyInCart)
        if (existsInCart(_id)) {
            removeFromCart(_id)
        } else {
            addToCart(props.obj)
        }
    }

    const handleFavourite = () => {
        setCurrentlyInFavourites(!currentlyInFavourites)
        if (existsInFavourites(_id)) {
            removeFromFavourites(_id)
        } else {
            addToFavourites(props.obj)
        }
    }

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
            <div className="flex items-center justify-between">
                <img src={ logo } alt="heart" className="aspect-square w-14" />
                <p className="px-3 py-2 rounded-[15px] bg-highlight text-muted text-sm font-medium">{ type }</p>
            </div>
            <div className="flex flex-col mt-6">
                <h2 className="text-center text-darkBlack font-semibold text-[24px]">{ name }</h2>
                <p className="text-center text-muted text-sm font-medium">{`Due ${due}`}</p>
            </div>
            <div className="flex flex-col gap-6 mt-3">
                <div className="flex items-center justify-between">
                    <p className="text-muted text-sm font-medium">Minimum</p>
                    <p className="text-sm font-semibold text-dark">{`???${minimum}`}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-muted text-sm font-medium">% Per Year</p>
                    <p className="text-sm font-semibold text-dark">{`${perYear}%`}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-muted text-sm font-medium">Interest Payment</p>
                    <p className="text-sm font-semibold text-dark">{`${interestPayment}`}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-muted text-sm font-medium">Opening</p>
                    <p className="text-sm font-semibold text-dark">{`${opening}`}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-muted text-sm font-medium">Closing Date</p>
                    <p className="text-sm font-semibold text-dark">{`${closing}`}</p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-muted text-sm font-medium">Settlement</p>
                    <p className="text-sm font-semibold text-dark">{`${settlement}`}</p>
                </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-8">
                <button onClick={ handleCartButton } className={`${currentlyInCart ? "px-6 text-base" : "px-10 text-xl"} py-4 rounded bg-primary text-white 
                    hover:bg-darkPrimary active:scale-95`} 
                >
                    { currentlyInCart
                    ? <p>Remove from cart</p>
                    : <p>Add to cart</p>
                    }
                </button>
                <div className="cursor-pointer" onClick={ handleFavourite }>
                    { currentlyInFavourites
                    ? <img src={ heartFillIcon } alt="heart-red" className="aspect-square w-10" />
                    : <img src={ heartIcon } alt="heart" className="aspect-square w-10" />
                    }
                </div>
            </div>
        </div>
    )
}

export default BondSingle