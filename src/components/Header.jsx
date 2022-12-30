import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import useCartStore from "../store/cartStore";
import logo from "../assets/img/logo.png";
import cartIcon from "../assets/img/cart.svg";
import userIcon from "../assets/img/user.svg";
import cartIconWhite from "../assets/img/cart-white.svg";
import userIconWhite from "../assets/img/user-white.svg";


const Header = (props) => {
    let {page} = props.info
    let navigate = useNavigate()

    let isLoggedIn = useUserStore(state => state.isLoggedIn)
    let logout = useUserStore(state => state.logout)
    let numberInCart = useCartStore(state => state.numberInCart)

    let [menuIsOpen, setMenuIsOpen] = useState(false)

    const handleMenuClick = () => {
        console.log(menuIsOpen, isLoggedIn)
        setMenuIsOpen((prevState) => !prevState)
    }

    const handleLogout = () => {
        logout()
        setMenuIsOpen(false)
        navigate("/")
    }

    return (
        <div className="header-wrap bg-body w-full pt-4 md:pt-10 pb-6 flex items-center justify-between font-inter relative overflow-hidden">
            <Link to={"/"}>
                <div className="logo-wrap flex gap-3 items-center justify-between">
                    <img src={ logo } alt="logo" className="w-[50px] md:w-[75px] lg:w-[100px] aspect-square" />
                    <p className="uppercase font-bold text-primary hidden md:block">Debt Management Office Nigeria</p>
                </div>
            </Link>
            
            { isLoggedIn 
            ?   (
                    <div className="flex items-center gap-12">
                        <nav className=" hidden lg:flex">
                            <ul className="flex gap-10 text-xl font-medium">
                                <li>
                                    <Link to="/bond-offer">
                                        <p className={`${ page === "bond-offer" ? "text-dark" : "text-darkFaded" }`}>Bond Offer</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <p className="text-darkFaded">Portfolio</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <p className="text-darkFaded">Notification</p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="items-center gap-24 hidden lg:flex">
                            <button onClick={ handleLogout } className="border-none outline-none bg-transparent">
                                <img src={ userIcon } alt="cart" className="aspect-square w-14" />
                            </button>
                            <div className="relative">
                                <Link to={"/checkout"}>
                                    <img src={ cartIcon } alt="cart" className="aspect-square w-14" />
                                </Link>
                                <div className={`absolute top-[5px] right-[2px] circle w-5 ${numberInCart ? "flex": "hidden"} justify-center 
                                    items-center bg-red`}
                                >
                                    <p className="text-white text-xs">{ numberInCart }</p>
                                </div>
                            </div>
                        </div>
                        <div onClick={ handleMenuClick } className="flex flex-col gap-[5px] w-[45px] p-2 lg:hidden">
                            <span className="w-full bg-darkPrimary h-[3.5px]"></span>
                            <span className="w-full bg-darkPrimary h-[3.5px]"></span>
                            <span className="w-full bg-darkPrimary h-[3.5px]"></span>
                        </div>
                        
                    </div>
                )
            :   (
                    <div className="flex items-center gap-16">
                        <nav className=" hidden lg:flex">
                            <ul className="flex gap-10 text-xl font-medium">
                                <li>
                                    <Link to="/bond-offer">
                                        <p className={`text-dark ${ page === "bond-offer" ? "font-bold" : "" }`}>Bond Offer</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <p className="text-dark">DMO</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        <p className="text-dark">Features</p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className={`items-center gap-16 hidden lg:flex ${ page === "login" || page === "register" ? "pr-[220px]" : "" }`}>
                            {
                                page === "login"
                             ? ""
                             :  (
                                <Link to={"/login"}>
                                    <button className="font-medium text-xl text-primary w-[150px] py-4 border border-primary rounded-[5px]">
                                        Login
                                    </button>
                                </Link>
                                )
                            }
                            {
                                page === "register"
                             ?  ""
                             :  (
                                <Link to={"/register"}>
                                    <button className="font-medium text-xl text-white w-[150px] py-4 bg-black border border-black rounded-[5px]">
                                        Sign Up
                                    </button>
                                </Link>
                                )
                            }
                            <div className="relative">
                                <Link to={"/checkout"}>
                                    <img src={ cartIcon } alt="cart" className="aspect-square w-14" />
                                </Link>
                                <div className={`absolute top-[5px] right-[2px] circle w-5 ${numberInCart ? "flex": "hidden"} justify-center 
                                    items-center bg-red`}
                                >
                                    <p className="text-white text-xs">{ numberInCart }</p>
                                </div>
                            </div>
                        </div>
                        <div onClick={ handleMenuClick }  className="flex flex-col gap-[5px] w-[45px] p-2 lg:hidden">
                            <span className="w-full bg-darkPrimary h-[3.5px]"></span>
                            <span className="w-full bg-darkPrimary h-[3.5px]"></span>
                            <span className="w-full bg-darkPrimary h-[3.5px]"></span>
                        </div>
                        
                    </div>
                )
            }
            { isLoggedIn
            ?   (
                    <div className={`${menuIsOpen ? "translate-x-0" : "translate-x-[100vw]"} h-auto transition-all absolute w-screen 
                        -left-4 md:-left-8 lg:-left-10 xl:-left-16 top-[90px] md:top-[139px] bg-darkPrimary z-[999] px-4 md:px-8 text-white`}
                    >
                        <p className="uppercase font-bold text-sm my-6">Debt Management Office Nigeria</p>
                        <nav className="flex w-full">
                            <ul className="flex flex-col text-base font-medium w-full">
                                <li className="py-2 my-6 border-b border-white w-full">
                                    <Link to="/bond-offer">
                                        <p className={`${ page === "bond-offer" ? "" : "" }`}>Bond Offer</p>
                                    </Link>
                                </li>
                                <li className="py-2 my-6 border-b border-white w-full">
                                    <Link to="#">
                                        <p className="">Portfolio</p>
                                    </Link>
                                </li>
                                <li className="py-2 my-6 border-b border-white w-full">
                                    <Link to="#">
                                        <p className="">Notification</p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="items-center gap-24 flex justify-between w-full my-6">
                            <button onClick={ handleLogout } className="border-none outline-none bg-transparent">
                                <img src={ userIconWhite } alt="cart" className="aspect-square w-14" />
                            </button>
                            <div className="relative">
                                <Link to={"/checkout"}>
                                    <img src={ cartIconWhite } alt="cart" className="aspect-square w-14" />
                                </Link>
                                <div className={`absolute top-[5px] right-[2px] circle w-5 ${numberInCart ? "flex": "hidden"} justify-center 
                                    items-center bg-red`}
                                >
                                    <p className="text-white text-xs">{ numberInCart }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            :   (
                    <div className={`${menuIsOpen ? "translate-x-0" : "translate-x-[100vw]"} h-auto transition-all absolute w-screen 
                        -left-4 md:-left-8 lg:-left-10 xl:-left-16 top-[90px] md:top-[139px] bg-darkPrimary z-[999] px-4 md:px-8 text-white`}
                    >
                        <p className="uppercase font-bold text-sm my-6">Debt Management Office Nigeria</p>
                        <nav className="flex w-full">
                            <ul className="flex flex-col text-base font-medium w-full">
                                <li className="py-2 my-6 border-b border-white w-full">
                                    <Link to="/bond-offer">
                                        <p className={`${ page === "bond-offer" ? "font-bold" : "" }`}>Bond Offer</p>
                                    </Link>
                                </li>
                                <li className="py-2 my-6 border-b border-white w-full">
                                    <Link to="#">
                                        <p className="">DMO</p>
                                    </Link>
                                </li>
                                <li className="py-2 my-6 border-b border-white w-full">
                                    <Link to="#">
                                        <p className="">Features</p>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className={`items-center gap-16 flex justify-between w-full my-6 `}>
                            {
                                page === "login"
                             ? ""
                             :  (
                                <Link to={"/login"}>
                                    <button className="font-medium text-xl text-primary w-[150px] py-4 border border-primary rounded-[5px]">
                                        Login
                                    </button>
                                </Link>
                                )
                            }
                            {
                                page === "register"
                             ?  ""
                             :  (
                                <Link to={"/register"}>
                                    <button className="font-medium text-xl text-white w-[150px] py-4 bg-black border border-black rounded-[5px]">
                                        Sign Up
                                    </button>
                                </Link>
                                )
                            }
                            
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="relative">
                                <Link to={"/checkout"}>
                                    <img src={ cartIconWhite } alt="cart" className="aspect-square w-14" />
                                </Link>
                                <div className={`absolute top-[5px] right-[2px] circle w-5 ${numberInCart ? "flex": "hidden"} justify-center 
                                    items-center bg-red`}
                                >
                                    <p className="text-white text-xs">{ numberInCart }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Header