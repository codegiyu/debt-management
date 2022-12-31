import React from "react";
import logo from "../assets/img/logo.png";


const CartSingle = (props) => {
    let {id, name, price, isChecked, handleChange, handleRemoveFromCart, numberOfItems, handleAddNumberOfItems, 
        handleReduceNumberOfItems, reduceBtnIsDisabled, addBtnIsDisabled} = props.obj

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-center lg:justify-between py-4 px-8 font-inter border border-primary rounded-md">
            <div className="flex gap-6 items-center w-full lg:w-auto justify-between">
                <input type="checkbox" name={ id } id="" onChange={ () => handleChange(id) } checked={ isChecked }
                    className="aspect-square w-6 accent-primary" 
                />
                <img src={ logo } alt="logo" className="w-[50px] md:w-[75px] lg:w-[100px] aspect-square" />
                <p className="font-bold text-[24px] text-dark hidden md:block">{ name }</p>
            </div>
            <p className="font-bold text-[22px] md:text-[24px] text-dark block md:hidden text-center">{ name }</p>
            <div className="flex md:hidden lg:flex gap-6 font-semibold justify-center">
                <button className="text-primary text-sm p-1 border border-darkFaded rounded bg-transparent outline-none">Automatic</button>
                <button onClick={ () => handleRemoveFromCart(id) } className="text-red text-sm p-1 bg-transparent outline-none">Delete</button>
            </div>
            <div className="flex items-end w-full lg:w-auto justify-between">
                <div className="md:flex gap-6 font-semibold hidden lg:hidden">
                    <button className="text-primary text-sm p-1 border border-darkFaded rounded bg-transparent outline-none">Automatic</button>
                    <button onClick={ () => handleRemoveFromCart(id) } className="text-red text-sm p-1 bg-transparent outline-none">Delete</button>
                </div>
                <div className="flex flex-col gap-0">
                    <p className="text-muted text-sm font-medium">Value(₦)</p>
                    <div className="flex items-center gap-6 p-2 text-darkBlack border border-primary rounded">
                        <p className="font-medium">{ Number(price).toLocaleString() + ".00" }</p>
                        <div className="flex gap-3 items-center">
                            <button onClick={ () => handleReduceNumberOfItems(id) } disabled={reduceBtnIsDisabled}
                                className={`${reduceBtnIsDisabled ? "border-darkFaded text-darkFaded" : "border-darkBlack text-darkBlack"}
                                    flex justify-center items-center border-[1.5px] w-4 h-4 rounded-full`}
                            >
                                <span className="text-base pb-[2px] leading-[8px] font-semibold text-center">-</span>
                            </button>
                            <p className="text-muted font-medium">{ String(numberOfItems).padStart(2, 0) }</p>
                            <button onClick={ () => handleAddNumberOfItems(id) } disabled={addBtnIsDisabled}
                                className={`${addBtnIsDisabled ? "border-darkFaded text-darkFaded" : "border-darkBlack text-darkBlack"}
                                    flex justify-center items-center border-[1.5px] w-4 h-4 rounded-full`}
                            >
                                <span className="text-base pb-[2px] leading-[8px] font-semibold text-center">+</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartSingle