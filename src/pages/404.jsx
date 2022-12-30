import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const NoPage = () => {
    return (
        <div className="w-full h-screen bg-body">
            <header className="w-full px-4 md:px-8 lg:px-10 xl:px-16">
                <ErrorBoundary>
                    <Header info={ {page: "404" }} />
                </ErrorBoundary>
            </header>
            <main className="w-full h-homeMain relative font-inter flex justify-center items-center">
                <div className="text-center">
                    <h1 className="font-bold font-mono text-primary2 text-[120px]">404</h1>
                    <p className="text-lg mt-10 mb-4">The page you are looking for does not exist!</p>
                    <Link to={"/"}><p className="text-primary1 underline font-medium text-base">Back to Home</p></Link>
                </div>
            </main>
        </div>
    )
}

export default NoPage