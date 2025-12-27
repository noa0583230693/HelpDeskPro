import {  type RouteObject } from "react-router-dom";
import { DashboardC } from "../Dashboard/dashboardC";
import { AddTicket } from "../NewTicket/addTicket";
import { MainLayout } from "../layout/mainLayOut";
import { customerMenuItems } from "../layout/menu";
import { AddComment } from "../Comments/addComment";
import { TicketDetails } from "../TicketDetail/ticketDetails";

export const RoutesC:RouteObject[]=

 [
        {
            element: <MainLayout menuItems={customerMenuItems} roleTitle="Customer Panel" />,
            children:[
                { path:"/dashboardC", element:<DashboardC />},
                { path:"/newTicket", element:<AddTicket />},
               
            ]

        }
        
]