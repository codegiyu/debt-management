import React, { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import Input from "./Input";
import useAlertStore from "../store/alertStore";
import { useNavigate } from "react-router-dom";
import loading from "../assets/img/loading.svg";

const RegisterForm = () => {
    const setNewAlert = useAlertStore(state => state.setNewAlert)
    let navigate = useNavigate()

    let initialValues = {
        firstname: "", lastname: "", email: "", password: "", cpassword: ""
    }
    let initialBooleans = {
        firstname: false, lastname: false, email: false, password: false, cpassword: false
    }
    let [values, setValues] = useState(initialValues)
    let [errorValues, setErrorValues] = useState(initialValues)
    let [hasError, setHasError] = useState(initialBooleans)
    let [isChecked, setIsChecked] = useState(false)
    let [disabled, setDisabled] = useState(true)
    let [isLoading, setIsLoading] = useState(false)

    const handleCheck = () => {
        setIsChecked((prevState) => !prevState)
    }

    const handleChange = (e) => {
        let type = e.target.type, name = e.target.name, value = e.target.value
        try {
            setValues((prevState) => {
                return { ...prevState, [name]: value }
            })

            if (value) {
                if (name === "password") {
                    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9@$!%*#?&()[\]{}\-_.,:;^=+])[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]{8,}$/.test(value)) {
                        throw new Error("Password issues")
                    }
                } else if (name === "cpassword") {
                    if (value !== values.password) throw new Error("Passwords do not match!")
                } else if (type === "email") {
                    if (!/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+]*/.test(value)) {
                        throw new Error("Email address format is invalid")
                    }
                } else if (name === "firstname") {
                    if (!/^[a-z\-\.]{2,}( [a-z\-\.]{2,})*$/i.test(value.trim())) throw new Error("Invalid First Name")
                } else if (name === "lastname") {
                    if (!/^[a-z\-\.]{2,}$/i.test(value.trim())) throw new Error("Invalid Last Name")
                }

            }
            
            setErrorValues((prevState) => {
                return { ...prevState, [name]: "" }
            })
            setHasError((prevState) => {
                return { ...prevState, [name]: false }
            })
        } catch (err) {
            if (err.message === "Password issues"){
                if (/[^a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]/.test(value)) {
                    setErrorValues((prevState) => {
                        return { ...prevState, password: "Password contains INVALID characters" }
                    })
                    setHasError((prevState) => {
                        return { ...prevState, password: true }
                    })
                } else if (!/^(?=.*[A-Z])[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]*$/.test(value)) {
                    setErrorValues((prevState) => {
                        return { ...prevState, password: "No UPPERCASE characters present" }
                    })
                    setHasError((prevState) => {
                        return { ...prevState, password: true }
                    })
                } else if (!/^(?=.*[0-9@$!%*#?&()[\]{}\-_.,:;^=+])[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]*$/.test(value)) {
                    setErrorValues((prevState) => {
                        return { ...prevState, password: "No NUMERICAL/SPECIAL characters present" }
                    })
                    setHasError((prevState) => {
                        return { ...prevState, password: true }
                    })
                } else if (!/^(?=.*[a-z])[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]*$/.test(value)) {
                    setErrorValues((prevState) => {
                        return { ...prevState, password: "No LOWERCASE characters present" }
                    })
                    setHasError((prevState) => {
                        return { ...prevState, password: true }
                    })
                } else if (!/^[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]{8,}$/.test(value)) {
                    setErrorValues((prevState) => {
                        return { ...prevState, password: "Password should be 8 or more characters" }
                    })
                    setHasError((prevState) => {
                        return { ...prevState, password: true }
                    })
                }
            } else if (err.message === "Invalid Last Name") {
                if (value.includes(" ")) {
                    setErrorValues((prevState) => {
                        return { ...prevState, lastname: "Last Name contains INVALID characters" }
                    })
                    setHasError((prevState) => {
                        return { ...prevState, lastname: true }
                    })
                } else if (value.length < 2) {
                    setErrorValues((prevState) => {
                        return { ...prevState, lastname: "Name cannot contain <2 characters" }
                    })
                    setHasError((prevState) => {
                        return { ...prevState, lastname: true }
                    })
                }
            } else if (err.message === "Invalid First Name") {
                if (value.trim().split(" ").some(item => item.length < 2)) {
                    setErrorValues((prevState) => {
                        return { ...prevState, firstname: "Names cannot contain <2 characters" }
                    })
                    setHasError((prevState) => {
                        return { ...prevState, firstname: true }
                    })
                } else {
                    setErrorValues((prevState) => {
                        return { ...prevState, firstname: "Invalid name format" }
                    })
                    setHasError((prevState) => {
                        return { ...prevState, firstname: true }
                    })
                }
            } else {
                setErrorValues((prevState) => {
                    return { ...prevState, [name]: err.message }
                })
                setHasError((prevState) => {
                    return { ...prevState, [name]: true }
                })
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9@$!%*#?&()[\]{}\-_.,:;^=+])[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]{8,}$/.test(values.password)) {
            setErrorValues((prevState) => {
                return { ...prevState, password: "Invalid Password" }
            })
            setHasError((prevState) => {
                return { ...prevState, password: true }
            })
            setIsLoading(false)
            return
        } else if (values.cpassword !== values.password) {
            setErrorValues((prevState) => {
                return { ...prevState, cpassword: "Invalid Password" }
            })
            setHasError((prevState) => {
                return { ...prevState, cpassword: true }
            })
            setIsLoading(false)
            return
        } else if (!/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+]*/.test(values.email)) {
            setErrorValues((prevState) => {
                return { ...prevState, email: "Invalid Email" }
            })
            setHasError((prevState) => {
                return { ...prevState, email: true }
            })
            setIsLoading(false)
            return
        } else if (!/^[a-z\-\.]{2,}( [a-z\-\.]{2,})*$/i.test(values.firstname.trim())) {
            setErrorValues((prevState) => {
                return { ...prevState, firstname: "Invalid First Name" }
            })
            setHasError((prevState) => {
                return { ...prevState, firstname: true }
            })
            setIsLoading(false)
            return
        } else if (!/^[a-z\-\.]{2,}$/i.test(values.lastname.trim())) {
            setErrorValues((prevState) => {
                return { ...prevState, lastname: "Invalid Last Name" }
            })
            setHasError((prevState) => {
                return { ...prevState, lastname: true }
            })
            setIsLoading(false)
            return
        }

        let registerObj = {
            firstname: values.firstname.trim(),
            lastname: values.lastname.trim(),
            email: values.email.trim(),
            password: values.password.trim(),
            roles: ["user"]
        }

        let response = await fetch(
            "https://dmon-database.onrender.com/api/auth/register",
            {
                method: "POST",
                body: JSON.stringify(registerObj),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        let result = await response.text()
        console.log(result)
        result = JSON.parse(result)
        console.log(result)

        if (result.message) {
            setValues(initialValues)
            setIsLoading(false)
            setNewAlert(result.message)
            navigate("/login", {replace: true})
        } else if (result.error) {
            setValues(initialValues)
            setHasError(initialBooleans)
            setNewAlert(result.error)
            setIsLoading(false)
        } else {
            setValues(initialValues)
            setHasError(initialBooleans)
            setNewAlert(`Some error occured. Please try again`)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isChecked && Object.values(hasError).every(item => item === false) && Object.values(values).every(item => item !== "")) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [isChecked, hasError])

    const fNameProps = {
        label: "First Name", 
        name: "firstname", 
        type: "text", 
        placeholder: "Enter your first name", 
        value: values.firstname, 
        errorVal: errorValues.firstname, 
        hasError: hasError.firstname, 
        handleChange
    }

    const lNameProps = {
        label: "Last Name", 
        name: "lastname", 
        type: "text", 
        placeholder: "Enter your last name", 
        value: values.lastname, 
        errorVal: errorValues.lastname, 
        hasError: hasError.lastname, 
        handleChange
    }

    const emailProps = {
        label: "Email", 
        name: "email", 
        type: "email", 
        placeholder: "Enter your email", 
        value: values.email, 
        errorVal: errorValues.email, 
        hasError: hasError.email, 
        handleChange
    }

    const passwordProps = {
        label: "Password", 
        name: "password", 
        type: "password", 
        placeholder: "Enter your password", 
        passwordVisibilityToggle: true,
        value: values.password, 
        errorVal: errorValues.password, 
        hasError: hasError.password, 
        handleChange
    }

    const cPasswordProps = {
        label: "Confirm Password", 
        name: "cpassword", 
        type: "password", 
        placeholder: "Confirm your password", 
        passwordVisibilityToggle: true,
        value: values.cpassword, 
        errorVal: errorValues.cpassword, 
        hasError: hasError.cpassword, 
        handleChange
    }

    return (
        <div className="w-full font-inter text-darkBlack">
            <h1 className="font-medium text-center text-[40px] mb-3">Signup</h1>
            <p className="text-xl text-center">Stop spending, Start investing</p>
            <form onSubmit={ handleSubmit } method="post" className="mt-3">
                <div className="my-1">
                    <ErrorBoundary>
                        <Input obj= { fNameProps } />
                    </ErrorBoundary>
                </div>
                <div className="my-1">
                    <ErrorBoundary>
                        <Input obj= { lNameProps } />
                    </ErrorBoundary>
                </div>
                <div className="my-1">
                    <ErrorBoundary>
                        <Input obj= { emailProps } />
                    </ErrorBoundary>
                </div>
                <div className="my-1">
                    <ErrorBoundary>
                        <Input obj= { passwordProps } />
                    </ErrorBoundary>
                </div>
                <div className="my-1">
                    <ErrorBoundary>
                        <Input obj= { cPasswordProps } />
                    </ErrorBoundary>
                </div>
                <div className="w-full flex gap-4 items-center my-4">
                    <input type="checkbox" name="agree" value={ isChecked } onChange={ handleCheck } 
                        className="aspect-square w-6 accent-primary" 
                    />
                    <p className="font-mono text-xs">
                        By continuing, you agree to the 
                        <button disabled className="text-primary underline bg-transparent outline-none border-none ml-2">
                            Terms and Conditions
                        </button>
                    </p>
                </div>
                <div className="w-full mt-4">
                    <button type="submit" disabled={ disabled } className={`${disabled ? "opacity-70" : ""} bg-black text-white 
                        w-full flex justify-center rounded active:scale-95 py-4 font-medium text-lg`}
                    >
                        {   isLoading
                        ?   <img src={ loading } alt="loading" className="w-[28px] aspect-square" />
                        :   "Sign Up"
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm