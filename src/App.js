import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BondOffer from "./pages/BondOffer";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/404";
import useAlertStore from "./store/alertStore";
import ErrorBoundary from "./components/ErrorBoundary";
import Alert from "./components/Alert";


export default function App() {
  const alert = useAlertStore(state => state.alert)

  let [alertActive, setAlertActive] = useState(false)

  useEffect(() => {
    if (alert) setAlertActive(true)
    else setAlertActive(false)
  }, [alert])

  return (
    <div className="relative">
      {
          alertActive
        ? (<div className="absolute top-[90px] md:top-[139px] lg:top-[166px] left-0 md:left-alert z-[900]">
            <ErrorBoundary>
              <Alert />
            </ErrorBoundary>
          </div>)
        : null
      }
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/bond-offer" element={<BondOffer />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
