import '../styles/globals.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, {useState} from "react";
import {AuthProvider} from "../context/AuthContext";
import {useEffect} from "react";
import {Route, Routes, BrowserRouter as Router, useLocation} from "react-router-dom";
import Home from "./index";
import PrivateRoute from "../components/PrivateRoute";
import PermissionPrivateRoute from '../components/PermissionPrivateRoute'
import CreateUser from "./user/create";
import CoursePackets from "./coursePackets";
import CoursePack from "./coursePack/[id]";
import NotFound from "../components/commons/NotFound";
import LoginPage from "./login";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CreateBand from "./band/create";
import Head from "next/head";
import CreateKick from "./kick/create";
import CreateKibonDonjak from "./kibon_donjak/create";
import CreatePoomsae from "./poomsae/create";
import Kicks from "./kick";
import KibonDonjaks from './kibon_donjak';
import Poomsaes from './poomsae';


const App = () => {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        require("bootstrap/dist/css/bootstrap.min.css");
        setIsClient(true)
    }, []);

    if (isClient) {
        return (
            <body className="app">
            <Head>
                <title>Nômades do Vale Histórico</title>
            </Head>
                <Router>
                    {/* O componente App está dentro do Router */}
                    <AuthProvider>
                        <AppContent/>
                        <ScrollToTopButton />
                    </AuthProvider>
                </Router>
            </body>
        );
    }

}
const AppContent = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    return (
        <>
            {/* Renderiza o Header apenas se a página não for a página de login */}
            {!isLoginPage && <Header/>}

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginPage/>}/>

                {/* Somente logados podem acessar */}
                <Route element={<PrivateRoute/>}>
                    <Route path="/apostilas" element={<CoursePackets/>}/>
                    <Route path="/apostila/:id" element={<CoursePack/>}/>

                    <Route path="/chute" element={<Kicks />} />
                    <Route path="/kibon_donjak" element={<KibonDonjaks />} />
                    <Route path="/poomsae" element={<Poomsaes />} />

                    {/* Somente logados com permissão acima da mesa podem acessar */}
                    <Route element={<PermissionPrivateRoute />} >
                        <Route path="/chute/criar" element={<CreateKick />} />
                        <Route path="/usuario/criar" element={<CreateUser/>}/>
                        <Route path="/faixa/criar" element={<CreateBand />} />
                        <Route path="/kibon_donjak/criar" element={<CreateKibonDonjak />} />
                        <Route path="/poomsae/criar" element={<CreatePoomsae />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>

            <Footer/>
        </>
    );
};

export default App;
