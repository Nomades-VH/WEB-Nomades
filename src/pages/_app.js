import '../styles/globals.css'
import Header from "../components/Header";
import Footer from "../components/footer";
import LoginPage from "./login";

export default function App({ Component, pageProps }) {
    if (Component === LoginPage) {
        return (<div>
            <Component {...pageProps}/>
        </div>)
    } else {
        return (
            <div>
                <Header/>
                <Component {...pageProps} />
                <Footer/>
            </div>
        )
    }
}
