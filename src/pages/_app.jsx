import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from "../components/Footer";
import React, {useState} from "react";
import {AuthProvider} from "../context/AuthContext";
import {useEffect} from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Home from "./index";
import PrivateRoute from "../components/PrivateRoute";
import PermissionPrivateRoute from '../components/PermissionPrivateRoute'
import CreateUser from "./user/create";
import CoursePackets from "./coursePack";
import CoursePack from "./coursePack/[id]";
import NotFound from "../components/commons/NotFound";
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
import ApproveUsers from './user/approve';
import { Toaster, toast } from 'sonner'
import Header from "../components/Header";


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
    const { isLoading, setIsLoading} = useLoading();

    useEffect(() => {
        setupAxiosInterceptors(setIsLoading);
    }, [setIsLoading]);

    return (
        <>
            <Header />

            {isLoading && <Loading />}

            <div className='body-container'>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/usuario/criar" element={<CreateUser/>}/>

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
                        <Route path="/apostila/criar" element={<CreateBand />} />
                        <Route path="/apostila/editar/:id" element={<EditBand />} />

                        <Route path="/kibon_donjak/criar" element={<CreateKibonDonjak />} />
                        <Route path="/kibon_donjak/editar/:id" element={<EditKibonDonjak />} />

                        <Route path="/poomsae/criar" element={<CreatePoomsae />} />
                        <Route path="/poomsae/editar/:id" element={<EditPoomsae />} />

                        <Route path="/chute/criar" element={<CreateKick />} />
                        <Route path="/chute/editar/:id" element={<EditKick />} />

                        <Route path="/usuarios/aprovar" element={<ApproveUsers toast={toast} />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            </div>
            
            <Toaster 
                duration={2000} 
                richColors 
                position="bottom-left" 
                expand={false} 
            />

            <Footer/>
        </>
    );
};

export default App;
