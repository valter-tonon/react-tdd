import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "@/presentation/pages/login/login";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
};
