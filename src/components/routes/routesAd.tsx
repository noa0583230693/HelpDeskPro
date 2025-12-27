import {  type RouteObject } from "react-router-dom";
import { AddPriority } from "../priorities/addPriority";
import { Priorities } from "../priorities/priorities";
import { DashboardAd } from "../Dashboard/dashboardAd";
import { Users } from "../Users/users";
import { AddUser } from "../Users/addUser";
import { Statuses } from "../status/statuses";
import { AddStatus } from "../status/addStatus";
import { MainLayout } from "../layout/mainLayOut";
import { adminMenuItems } from "../layout/menu";
import { TicketDetails } from "../TicketDetail/ticketDetails";
import { AddComment } from "@mui/icons-material";



export const RoutesAd:RouteObject[]=
[
    {
      element: <MainLayout menuItems={adminMenuItems} roleTitle="Admin Panel" />,
        children: [
            { path: "/dashboardAd", element: <DashboardAd /> },
            { path: "/users", element: <Users /> },
            { path: "/addUser", element: <AddUser /> },
            { path: "/statuses", element: <Statuses /> },
            { path: "/addStatus", element: <AddStatus /> },
            { path: "/priorities", element: <Priorities /> },
            { path: "/addPriority", element: <AddPriority /> },

        ]

        
    }
]
