import '../styles/globals.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import {AuthProvider} from "../context/AuthContext";
import LoginPage from "./login";
import { useEffect } from "react";

export default function App({Component, pageProps}) {
    useEffect(() => {
        require("bootstrap/dist/css/bootstrap.min.css");
    }, []);


    if (Component === LoginPage) {
        return (
            <div>
                <AuthProvider>
                    <Component {...pageProps} />
                    <Footer/>
                </AuthProvider>
            </div>
        )
    }

    return (
        <div>
            <AuthProvider>
                <Header/>
                <Component {...pageProps} />
                <Footer/>
            </AuthProvider>

            <script async >

            </script>
        </div>
    )
}
