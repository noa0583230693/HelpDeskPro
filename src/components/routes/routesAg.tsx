import {  type RouteObject } from "react-router-dom";
import { DashboardAg } from "../Dashboard/dashboardAg";
import { MainLayout } from "../layout/mainLayOut";
import { agentMenuItems } from "../layout/menu";
import { TicketDetails } from "../TicketDetail/ticketDetails";
import { AddComment } from "../Comments/addComment";

export const RoutesAg:RouteObject[]=
[
    {
        element: <MainLayout menuItems={agentMenuItems} roleTitle="Agent Panel" />,
                    children:[
             {path:"/dashboardAg", element:<DashboardAg />},
           ]
        
    }
]            