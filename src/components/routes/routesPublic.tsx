import { type RouteObject } from "react-router-dom";
import { AuthPage } from "../Auth/AuthPage";
import { AuthRedirect } from "../protectedRoutes";
import { RegisterPage } from "../Auth/RegisterPage/registerPage";
import { LoginPage } from "../Auth/LoginPage/loginPage";
import { LogOut } from "../Auth/logOut/logOut";

export const RoutesPublic:RouteObject[]=
 [
    {
        children: [
            {  path:"/" ,element:<AuthRedirect /> },
      { path:"/login" ,element:<LoginPage /> },
      { path:"/register" ,element:<RegisterPage /> },
      { path:"/AuthPage" ,element:<AuthPage /> },
       { path:"/unauthorized" ,element:<h1>Unauthorized Access</h1>} ,
       { path:"/logout" ,element:<LogOut />}
        
      
        ]
    }
 ]