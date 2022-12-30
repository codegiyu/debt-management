import React from "react";

const CartTotal = (props) => {
    let {totals, selectValue, handleSelectChange} = props.obj

    let incomeType = totals.price 
    ?   "This is a 730 days Savings Bond, you have a fixed income"
    :   "Nothing in cart"


    return (
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-0 items-start justify-between py-4 px-8 font-inter border border-primary rounded-md">
            <div className="flex flex-col gap-10">
                <div className="flex gap-8">
                    <select value={ selectValue } onChange={ handleSelectChange } name="fees" id="" 
                        className="border-none text-sm font-medium bg-transparent text-muted accent-primary w-[120px]"
                    >
                        <option value="Fees + taxes">Fees + Taxes</option>
                        <option value="Fees only">Fees only</option>
                        <option value="Taxes only">Taxes only</option>
                    </select>
                    <p className="text-muted text-sm font-medium">{`₦${(totals.tax || "0.00")}`}</p>
                </div>
                <p className="text-muted text-sm font-medium w-[300px]">{ incomeType }</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-muted text-sm font-medium md:text-end">Total Buy</p>
                <p className="text-darkBlack font-semibold text-xl">{`₦${(totals.price || 0).toLocaleString() + ".00"}`}</p>
            </div>
        </div>
    )
}

export default CartTotal