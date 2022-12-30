import React, { useEffect, useState } from "react";


const Input = (props) => {
    let {label, name, type, placeholder, value, errorVal, passwordVisibilityToggle = false, hasError, handleChange} = props.obj

    let [isFocused, setIsFocused] = useState(false)
    let [passwordToggleWasClicked, setpasswordToggleWasClicked] = useState(false)
    let [passwordVisibility, setPasswordVisibility] = useState(false);

    let borderColor = hasError ? "border-[#EB1414]" : isFocused ? "border-primary" : "border-darkPrimary"
    let svgColor = isFocused ? "#417B13" : "#A2A7A3";

    const handleInputFocus = () => setIsFocused(true)

    const handleInputBlur = () => {
        if (passwordToggleWasClicked) return;
        setIsFocused(false)
    }

    const handlePasswordVisibility = () => {
        setPasswordVisibility((prevState) => !prevState)
        setIsFocused(true)
        setpasswordToggleWasClicked(true)
    }

    const handlePasswordTogglerBlur = () => {
        setpasswordToggleWasClicked(false)
        setIsFocused(false)
    }

    if (passwordVisibilityToggle) {
        type = passwordVisibility ? "text" : "password"
    }

    return (
        <div className="w-full h-[94px] relative">
            <label htmlFor={ name } className="text-sm">{ label }<span className="text-[#EB1414]">*</span></label>
            <div className={`border hover:border-2 focus:border-2 ${borderColor} relative rounded-sm`}>
                <input type={ type } name={ name } value={ value } onChange={ handleChange } onFocus={ handleInputFocus } onBlur={ handleInputBlur }
                    placeholder={ placeholder } className={`w-full text-base px-5 py-[14px] rounded-sm outline-none border-none
                     bg-transparent`} required
                />
                { passwordVisibilityToggle 
                ?   (<div onClick={ handlePasswordVisibility } onBlur={ handlePasswordTogglerBlur } 
                    className="absolute top-toggler right-4" tabIndex="1">
                        {passwordVisibility 
                            ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.68661 6.31328L6.31328 9.68661C5.87995 9.25328 5.61328 8.65995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C8.65995 5.61328 9.25328 5.87995 9.68661 6.31328Z" stroke={ svgColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M11.88 3.84657C10.7134 2.96657 9.38002 2.48657 8.00002 2.48657C5.64668 2.48657 3.45335 3.87324 1.92668 6.27324C1.32668 7.21324 1.32668 8.79324 1.92668 9.73324C2.45335 10.5599 3.06668 11.2732 3.73335 11.8466" stroke={ svgColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.61328 13.02C6.37328 13.34 7.17995 13.5133 7.99995 13.5133C10.3533 13.5133 12.5466 12.1266 14.0733 9.72662C14.6733 8.78662 14.6733 7.20662 14.0733 6.26662C13.8533 5.91995 13.6133 5.59329 13.3666 5.28662" stroke={ svgColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.3403 8.4668C10.167 9.4068 9.40033 10.1735 8.46033 10.3468" stroke={ svgColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6.31337 9.68677L1.33337 14.6668" stroke={ svgColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14.6669 1.33325L9.68689 6.31325" stroke={ svgColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg> 
                            : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.3866 7.99995C10.3866 9.31995 9.31995 10.3866 7.99995 10.3866C6.67995 10.3866 5.61328 9.31995 5.61328 7.99995C5.61328 6.67995 6.67995 5.61328 7.99995 5.61328C9.31995 5.61328 10.3866 6.67995 10.3866 7.99995Z" stroke={ svgColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7.9999 13.5133C10.3532 13.5133 12.5466 12.1266 14.0732 9.72665C14.6732 8.78665 14.6732 7.20665 14.0732 6.26665C12.5466 3.86665 10.3532 2.47998 7.9999 2.47998C5.64656 2.47998 3.45323 3.86665 1.92656 6.26665C1.32656 7.20665 1.32656 8.78665 1.92656 9.72665C3.45323 12.1266 5.64656 13.5133 7.9999 13.5133Z" stroke={ svgColor } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg> 
                        }
                    </div>)
                :   null        
                }
            </div>
            <p className="text-xs leading-[12px] absolute bottom-0 text-[#EB1414]">{ errorVal }</p>
        </div>
    )
}

export default Input