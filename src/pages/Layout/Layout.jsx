import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import ContactUs from "../ContactUs/ContactUs";
import Header from "../../componanat/Header/Header";
import { UserContext } from "../../context/UserContext";
import Footer from "../../componanat/Footer/Footer";


function Layout() {

    let { setUserToken } = useContext(UserContext)

    if (localStorage.getItem("Token")) {
        setUserToken(localStorage.getItem("Token"))
    }

    return (
        <>
            <div className=" d-flex justify-content-between flex-column min-vh-100 ">
                <div>
                    <Header />
                    <div className=" container py-4 ">
                        <div className=" h-100 w-100">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        </>
    )
}

export default Layout
// d-flex flex-column justify-content-between align-content-center