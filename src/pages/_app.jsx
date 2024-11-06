import '../styles/globals.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, {useState} from "react";
import {AuthProvider, useAuth} from "../context/AuthContext";
import {useEffect} from "react";
import {Route, Routes, BrowserRouter as Router, useLocation, useNavigate} from "react-router-dom";
import Home from "./index";
import PrivateRoute from "../components/PrivateRoute";
import PermissionPrivateRoute from '../components/PermissionPrivateRoute'
import CreateUser from "./user/create";
import CoursePackets from "./coursePack";
import CoursePack from "./coursePack/[id]";
import NotFound from "../components/commons/NotFound";
import LoginPage from "./login";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CreateBand from "./coursePack/create";
import Head from "next/head";
import CreateKick from "./kick/create";
import CreateKibonDonjak from "./kibon_donjak/create";
import CreatePoomsae from "./poomsae/create";
import Kicks from "./kick";
import KibonDonjaks from './kibon_donjak';
import Poomsaes from './poomsae';
import Kick from './kick/[id]';
import KibonDonjak from './kibon_donjak/[id]';
import Poomsae from './poomsae/[id]';
import EditKick from './kick/edit/[id]';
import EditPoomsae from './poomsae/edit/[id]';
import EditKibonDonjak from './kibon_donjak/edit/[id]';
import EditBand from './coursePack/edit/[id]';
import Tests from './tests';
import { LoadingProvider, useLoading } from '../context/LoadingContext';
import { setupAxiosInterceptors } from '../services/base';
import Loading from '../components/commons/Loading';


const App = () => {

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        require("bootstrap/dist/css/bootstrap.min.css");
        setIsClient(true)
    }, []);

    

    if (isClient) {
        return (
            <div className="app">
            <Head>
                <title>Nômades do Vale Histórico</title>
            </Head>
                <LoadingProvider>
                    <Router>
                        <AuthProvider>
                            <AppContent />
                            <ScrollToTopButton />
                        </AuthProvider>
                    </Router>
                </LoadingProvider>
            </div>
        );
    }

}
const AppContent = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const {isAuthenticated} = useAuth();
    const { isLoading, setIsLoading} = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        setupAxiosInterceptors(setIsLoading);
    }, [setIsLoading]);

    if (isLoginPage && isAuthenticated) {
        navigate('/')
    }

    return (
        <>
            {isLoading && <Loading />}
            {/* Renderiza o Header apenas se a página não for a página de login */}
            {!isLoginPage && <Header/>}

            <div className='body-container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage/>}/>

                {/* Somente logados podem acessar */}
                <Route element={<PrivateRoute/>}>
                    <Route path="/apostilas" element={<CoursePackets/>}/>
                    <Route path="/apostila/:id" element={<CoursePack/>}/>

                    <Route path="/chute" element={<Kicks />} />
                    <Route path="/chute/:id" element={<Kick />} />
                    

                    <Route path="/kibon_donjak" element={<KibonDonjaks />} />
                    <Route path="/kibon_donjak/:id" element={<KibonDonjak />} />

                    <Route path="/poomsae" element={<Poomsaes />} />
                    <Route path="/poomsae/:id" element={<Poomsae />} />

                    <Route path='/tests' element={<Tests />} />


                    {/* Somente logados com permissão acima da mesa podem acessar */}
                    <Route element={<PermissionPrivateRoute />} >
                        <Route path="/usuario/criar" element={<CreateUser/>}/>

                        <Route path="/apostila/criar" element={<CreateBand />} />
                        <Route path="/apostila/editar/:id" element={<EditBand />} />

                        <Route path="/kibon_donjak/criar" element={<CreateKibonDonjak />} />
                        <Route path="/kibon_donjak/editar/:id" element={<EditKibonDonjak />} />

                        <Route path="/poomsae/criar" element={<CreatePoomsae />} />
                        <Route path="/poomsae/editar/:id" element={<EditPoomsae />} />

                        <Route path="/chute/criar" element={<CreateKick />} />
                        <Route path="/chute/editar/:id" element={<EditKick />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            </div>
            

            <Footer/>
        </>
    );
};

export default App;
