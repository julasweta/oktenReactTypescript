import {createBrowserRouter, Navigate} from "react-router-dom";
import { MainLayout } from "../layouts";
import { CarsPage } from "../pages";
import CarDetailPage from "../pages/CarDetailPage";
import LoginPage from "../pages/LoginPage";
import { urls } from "../constants";
import { RegisterForm } from "../components";


const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to={'cars'}/>
            },
            {
                path: 'cars',
                element: <CarsPage/>,
                children: [
                    {
                        path: ':id',
                        element: <CarDetailPage/>
                    }
                ]
            },
            {
                path:urls.auth.login,
                element:<LoginPage/>
            },
            {
                path:urls.auth.register,
                element:<RegisterForm/>
            }
           
        ]
    }
]);

export {
    router
}