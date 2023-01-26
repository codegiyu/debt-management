import React, { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import Input from "./Input";
import useAlertStore from "../store/alertStore";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import loading from "../assets/img/loading.svg";


const LoginForm = () => {
    const setNewAlert = useAlertStore(state => state.setNewAlert)
    const setUser = useUserStore(state => state.setUser)
    const setIsLoggedIn = useUserStore(state => state.setIsLoggedIn)
    let navigate = useNavigate()

    let initialValues = {
        email: "", password: ""
    }
    let initialBooleans = {
        email: false, password: false
    }
    let [values, setValues] = useState(initialValues)
    let [errorValues, setErrorValues] = useState(initialValues)
    let [hasError, setHasError] = useState(initialBooleans)
    let [disabled, setDisabled] = useState(true)
    let [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        let type = e.target.type, name = e.target.name, value = e.target.value
        try {
            setValues((prevState) => {
                return { ...prevState, [name]: value }
            })

            if (value) {
                if (name === "password") {
                    if (/[^a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]/.test(value)) {
                        throw new Error("Password contains invalid characters")
                    }
                } else if (type === "email") {
                    if (!/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+]*/.test(value)) {
                        throw new Error("Email address format is invalid")
                    }
                }
            }
            
            setErrorValues((prevState) => {
                return { ...prevState, [name]: "" }
            })
            setHasError((prevState) => {
                return { ...prevState, [name]: false }
            })
        } catch (err) {
            setErrorValues((prevState) => {
                return { ...prevState, [name]: err.message }
            })
            setHasError((prevState) => {
                return { ...prevState, [name]: true }
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9@$!%*#?&()[\]{}\-_.,:;^=+])[a-zA-Z0-9@$!%*#?&()[\]{}\-_.,:;^=+]{8,}$/.test(values.password)) {
            setErrorValues((prevState) => {
                return { ...prevState, password: "Invalid Password format" }
            })
            setHasError((prevState) => {
                return { ...prevState, password: true }
            })
            setIsLoading(false)
            return
        } else if (!/(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+]*/.test(values.email)) {
            setErrorValues((prevState) => {
                return { ...prevState, email: "Invalid Email format" }
            })
            setHasError((prevState) => {
                return { ...prevState, email: true }
            })
            setIsLoading(false)
            return
        }

        let registerObj = {
            email: values.email.trim(),
            password: values.password.trim()
        }

        let response = await fetch(
            "https://dmon-database.onrender.com/api/auth/login",
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

        if (result.status) {
            setValues(initialValues)
            setIsLoading(false)
            setUser(result.user)
            setIsLoggedIn(true)
            setNewAlert({ message: "Logged in successfully", alertType: "success" })
            navigate("/", {replace: true})
        } else if (result.error) {
            setValues(initialValues)
            setHasError(initialBooleans)
            setNewAlert({ message: result.error, alertType: "error"})
            setIsLoading(false)
        } else {
            setValues(initialValues)
            setHasError(initialBooleans)
            setNewAlert({ message:`Some error occured. Please try again`, alertType: "error"})
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (Object.values(hasError).every(item => item === false) && Object.values(values).every(item => item !== "")) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [hasError])

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

    return (
        <div className="w-full font-inter text-darkBlack">
            <h1 className="font-medium text-center text-[40px] mb-3">Login</h1>
            <p className="text-xl text-center">Stop spending, Start investing</p>
            <form onSubmit={ handleSubmit } method="post" className="mt-6">
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
                <div className="w-full mt-6">
                    <button type="submit" disabled={ disabled } className={`${disabled ? "opacity-70" : ""} bg-black text-white 
                        w-full flex justify-center rounded active:scale-95 py-4 font-medium text-lg`}
                    >
                        {   isLoading
                        ?   <img src={ loading } alt="loading" className="w-[28px] aspect-square" />
                        :   "Login"
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm