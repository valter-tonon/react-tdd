import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MakeLogin} from "@/main/factories/pages/login/login-factory";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<MakeLogin/>}/>
            </Routes>
        </BrowserRouter>
    );
};
