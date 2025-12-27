import { type RouteObject } from "react-router-dom";
import { GlobalRouteToRole, ProtectedRoutes } from "../protectedRoutes";
import { TicketDetails } from "../TicketDetail/ticketDetails";
import { RoleBasedLayout } from "../layout/roleBaseLayout";
import { ShowTicketsMiniByRole } from "../TicketShortList/showTicketByRoleMini";
import { AddComment } from "../Comments/addComment";

export const RoutesUtility: RouteObject[] = [
    {
        path: "/dashboard",
        element: <GlobalRouteToRole defaultRoute="AuthPage" adminRoute="dashboardAd" agentRoute="dashboardAg" castumerRoute="dashboardC" />
    },
    {
        element: <ProtectedRoutes allowedRoles={['admin','agent','customer']} />,
        children: [
            {
                path: "/tickets",
                element: <RoleBasedLayout />,
                children: [{ index: true, element: <ShowTicketsMiniByRole /> }]
            },
            
            { path: "/ticket/:id", element: <RoleBasedLayout />,
                children: [{ index: true, element: <TicketDetails /> }]
             },
            
        ]
    },
    {
        element: <ProtectedRoutes allowedRoles={['agent','customer']} />,
        children:[
            {
              path:"/ticket/:id/addComment", element:<AddComment />
            }
        ]
    }

];