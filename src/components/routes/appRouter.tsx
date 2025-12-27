import { Navigate, useRoutes } from "react-router-dom"
import { RoutesPublic } from "./routesPublic"
import { RoutesUtility } from "./routesUtility"
import {  ProtectedRoutes } from "../protectedRoutes"
import { RoutesAd } from "./routesAd"
import { RoutesC } from "./routesC"
import { RoutesAg } from "./routesAg"

export const AppRouter=()=>
{
    const Element=useRoutes([
                ...RoutesPublic,
                ...RoutesUtility,

    {
      element: <ProtectedRoutes allowedRoles={['admin']} />,
      children: RoutesAd,
    },
    {      
      element: <ProtectedRoutes allowedRoles={['agent']} />,
      children: RoutesAg,
    },
    {      element: <ProtectedRoutes allowedRoles={['customer']} />,
      children: RoutesC,
    },
   { path: '*', element: <Navigate to="/login" replace /> },
    ])
    return <>
    {Element}
    </>
}