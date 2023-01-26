import React, { useCallback, useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import CartSingle from "../components/CartSingle";
import CartTotal from "../components/CartTotal";
import useCartStore from "../store/cartStore";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import loading from "../assets/img/loading.svg";
import useAlertStore from "../store/alertStore";
import useUserStore from "../store/userStore";


const Checkout = () => {
    const cart = useCartStore(state => state.cart)
    const removeFromCart = useCartStore(state => state.removeFromCart)
    const removeAllFromCart = useCartStore(state => state.removeAllFromCart)
    const setNewAlert = useAlertStore(state => state.setNewAlert)
    const isLoggedIn = useUserStore(state => state.isLoggedIn)

    let navigate = useNavigate()

    let [disabled, setDisabled] = useState(true)
    let [cartArr, setCartArr] = useState([])
    let [totals, setTotals] = useState({ tax: 0, price:0 })
    let [selectValue, setSelectValue] = useState("Fees + taxes")
    let [isLoading, setIsLoading] = useState(false)
    let [isChecked, setIsChecked] = useState(() => {
        let obj = {}
        Object.keys(cart).forEach(item => {
            obj[item] = true
        })
        return obj
    })
    let [numberOfItems, setNumberOfItems] = useState(() => {
        let obj = {}
        Object.keys(cart).forEach(item => {
            obj[item] = 1
        })
        return obj
    })
    let [reduceBtnIsDisabled, setReduceBtnIsDisabled] = useState(() => {
        let obj = {}
        Object.keys(cart).forEach(item => {
            obj[item] = true
        })
        return obj
    })
    let [addBtnIsDisabled, setAddBtnIsDisabled] = useState(() => {
        let obj = {}
        Object.keys(cart).forEach(item => {
            obj[item] = false
        })
        return obj
    })

    const calculateTotals = () => {
        let tax = 0, price = 0;
        for (let i = 0; i < cartArr.length; i++) {
            if (cartArr[i].isChecked) {
                tax += Number(cartArr[i].tax)
                price += cartArr[i].price * cartArr[i].numberOfItems
            }
        }
        setTotals({ tax, price })   
    }

    const handleRemoveFromCart = useCallback((id) => {
        removeFromCart(id)
        setCartArr((prevState) => prevState.filter(item => item.id !== id))
    }, [cart])

    const handleChange = useCallback((id) => {
        setIsChecked((prevState) => {
            return { ...prevState, [id]: !prevState[id] }
        })
    }, [])

    const handleReduceBtnDisable = useCallback((id) => {
        if (numberOfItems[id] < 2) {
            setReduceBtnIsDisabled((prevState) => {
                return { ...prevState, [id]: true }
            })
        } else if (numberOfItems[id] >= 2) {
            setReduceBtnIsDisabled((prevState) => {
                return { ...prevState, [id]: false }
            })
        }
    }, [numberOfItems])

    const handleAddBtnDisable = useCallback((id) => {
        if (numberOfItems[id] > 9) {
            setAddBtnIsDisabled((prevState) => {
                return { ...prevState, [id]: true }
            })
        } else if (numberOfItems[id] <= 9) {
            setAddBtnIsDisabled((prevState) => {
                return { ...prevState, [id]: false }
            })
        }
    }, [numberOfItems])

    const handleAddNumberOfItems = useCallback((idkey) => {
        setNumberOfItems((prevState) => {
            return { ...prevState, [idkey]: prevState[idkey] + 1 }
        })
    }, [])

    const handleReduceNumberOfItems = useCallback((id) => {
        setNumberOfItems((prevState) => {
            return { ...prevState, [id]: prevState[id] - 1 }
        })
    }, [])

    const handleSelectChange = useCallback((e) => {
        setSelectValue(e.target.value)
    }, [])

    const handleCheckout = () => {
        if (!isLoggedIn) {
            setNewAlert({ message: "You have to log in to make purchases", alertType: "error"})
            return
        }

        let numberInCart = cartArr.reduce((acc, curr) => acc + curr.numberOfItems ,0)
        let item = numberInCart === 1 ? "item" : "items"

        setIsLoading(true)
        setTimeout(() => {
            removeAllFromCart()
            navigate("/")
            setNewAlert({ message: `Congratulations! You have just purchased ${numberInCart} ${item}.`, alertType: "success"})
        }, 2000)
    }

    useEffect(() => {
        let cartArray = Object.entries(cart).map(item => {
            let singleObj = {
             id: item[0], 
             name: item[1].name, 
             price: item[1].price,
             tax: item[1].tax,
             isChecked: isChecked[item[0]], 
             handleChange,
             handleRemoveFromCart,
             numberOfItems: numberOfItems[item[0]], 
             handleAddNumberOfItems, 
             handleReduceNumberOfItems, 
             reduceBtnIsDisabled: reduceBtnIsDisabled[item[0]], 
             addBtnIsDisabled: addBtnIsDisabled[item[0]]
            }
            return singleObj
        })
        setCartArr(cartArray)
    }, [cart, isChecked, numberOfItems, reduceBtnIsDisabled, addBtnIsDisabled, handleRemoveFromCart])

    useEffect(() => {
        calculateTotals()
        if (cartArr.length) setDisabled(false)
        else setDisabled(true)
    }, [cartArr, cart])

    useEffect(() => {
        for (let i = 0; i < Object.keys(cart).length; i++) {
            handleReduceBtnDisable(Object.keys(cart)[i])
            handleAddBtnDisable(Object.keys(cart)[i])
        }
    }, [handleAddNumberOfItems, handleReduceNumberOfItems, numberOfItems])

    let totalProps = {
        totals,
        selectValue,
        handleSelectChange
    }

    return (
        <div className="w-full min-h-screen bg-body overflow-hidden">
            <header className="w-full px-4 md:px-8 lg:px-10 xl:px-16">
                <ErrorBoundary>
                    <Header info={ {page: "checkout" } } />
                </ErrorBoundary>
            </header>
            <main className="w-full min-h-homeMain py-16 relative">
                <div className="w-full px-4 md:px-8 lg:px-10 xl:px-16 flex flex-col gap-3">
                    {   cartArr.map(item => {
                            return (
                                <ErrorBoundary key={ uuid() }>
                                    <CartSingle key={ uuid() } obj={ item } />
                                </ErrorBoundary>
                            )
                        })
                    }
                    {   
                        (
                            <ErrorBoundary>
                                <CartTotal obj={ totalProps } />
                            </ErrorBoundary>
                        )
                    }
                </div>
                <div className="flex justify-end px-4 md:px-8 lg:px-10 xl:px-16 mt-8">
                    <button onClick={ handleCheckout } disabled={ disabled } className={`text-sm text-white py-[12px] bg-primary 
                        rounded-sm hover:bg-darkPrimary active:scale-95 font-inter w-[150px] flex justify-center ${disabled ? "opacity-60" : ""}`}
                    >
                        {   isLoading
                        ?   <img src={ loading } alt="loading" className="w-[20px] aspect-square" />
                        :   "Check Out"
                        }
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Checkout