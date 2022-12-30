import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import shieldRight from "../assets/img/shield-right.png";
import shieldLeft from "../assets/img/shield-left.png";
import RegisterForm from "../components/RegisterForm";


const Register = () => {
    return (
        <div className="w-full min-h-screen bg-body">
            <header className="w-full px-4 md:px-8 lg:px-10 xl:px-16">
                <ErrorBoundary>
                    <Header info={ {page: "register" }} />
                </ErrorBoundary>
            </header>
            <main className="w-full min-h-homeMain flex justify-center relative px-4 md:px-8 lg:px-10 xl:px-16">
                <section className="pb-10 pt-5 w-full md:w-[450px] z-[1]">
                    <ErrorBoundary>
                        <RegisterForm />
                    </ErrorBoundary>
                </section>
                <img src={ shieldRight } alt="right shield" className="absolute right-0 top-[75px] z-[0]" />
                <img src={ shieldLeft } alt="left shield" className="absolute left-0 top-[150px] z-[0]" />
            </main>
        </div>
    )
}

export default Register