import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

import Home from '../pages/Home';
import Teams from '../pages/Teams';
import Register from '../pages/Register';
import About from '../pages/About';
import BasicLayout from "../layouts./BasicLayout";
import PdfOfRegistrations from "../pages/PdfOfRegistrations";
import Moderator from "../pages/Moderator";
import PageNotFound from "../pages/PageNotFound";
import RegistrationComplete from "../pages/RegistrationComplete";

export default function BasicRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <BasicLayout/> } >
                    <Route index element={ <Home/> } />
                    <Route path='/register/:id' element={<Register />} />
                    <Route path='/registration-complete' element={<RegistrationComplete />} />
                    <Route path='/teams' element={<Teams />} />
                    <Route path='/moderator' element={<Moderator />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/pdf' element={<PdfOfRegistrations />} />
                    <Route path="*" element={ <PageNotFound /> } />
                    <Route path="404" element={ <PageNotFound /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}