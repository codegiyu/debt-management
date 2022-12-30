import React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import SlideShow from "../components/SlideShow";
import Intro from "../components/Intro";

const Home = () => {
    return (
        <div className="w-full min-h-screen bg-body">
            <header className="w-full px-4 md:px-8 lg:px-10 xl:px-16">
                <ErrorBoundary>
                    <Header info={ {page: "home" }} />
                </ErrorBoundary>
            </header>
            <main className="w-full  h-homeMainMob lg:h-homeMain relative">
                <section className="w-full flex items-center justify-between">
                    <div className="w-[70px] h-7 bg-dark opacity-[70%]"></div>
                    <div className="w-[70px] h-7 bg-primary opacity-[70%]"></div>
                </section>
                <section className="w-full h-[85%] absolute bottom-0 left-0 z-[1]">
                    <ErrorBoundary>
                        <SlideShow />
                    </ErrorBoundary>
                </section>
                <section className="absolute top-16 lg:top-20 left-4 md:left-8 lg:left-10 xl:left-16 w-fullMob md:w-3/5 lg:w-2/5 z-[3]">
                    <ErrorBoundary>
                        <Intro />
                    </ErrorBoundary>
                </section>
            </main>
        </div>
    )
}

export default Home