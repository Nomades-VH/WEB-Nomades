import '../styles/globals.css'
import Header from "../components/Header";
import Footer from "../components/footer";
import LoginPage from "./login";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({Component, pageProps}) {
    if (Component === LoginPage) {
        return (<div>
            <Component {...pageProps}/>
        </div>)
    } else {
        return (<div>
                <Header/>
                <Component {...pageProps} />
                <Footer/>

            <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin='true'></script>

            <script
                src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
                crossOrigin='true'></script>

            <script
                src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
                crossOrigin='true'></script>

            <script>var Alert = ReactBootstrap.Alert;</script>
            </div>)
    }
}
