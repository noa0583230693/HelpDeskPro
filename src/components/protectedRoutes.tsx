import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useParams } from "react-router-dom";

interface ProtectedRoutesProps {
  allowedRoles: string[]; // מערך של מחרוזות
}
export const  ProtectedRoutes=(p: ProtectedRoutesProps)=>
{
const { user, loading } = useAuth();

    if (loading) return <div>טוען...</div>; // מונע ניווט לפני שהטוקן נטען

    if(!user||localStorage.getItem("currentUser")===null||localStorage.getItem("token")===null)
    {
        return <Navigate to="/AuthPage" replace />;
    }
    
    if (!user.role) {
        console.error("User role is not defined");
        return <Navigate to="/unauthorized" replace />;
    }
    
    if (!p.allowedRoles.includes(user.role)) {
        console.warn(`Access denied: user role '${user.role}' not in allowed roles [${p.allowedRoles.join(', ')}]`);
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />;
}


export const AuthRedirect=()=>
{
const { user, loading } = useAuth();

    if (loading) return <div>טוען...</div>; // מונע ניווט לפני שהטוקן נטען
    if(!user)
    {
        return <Navigate to="/AuthPage" replace />;
    }
    return <Navigate to="/dashboard" replace />;
}

type GlobalRouteToRoleProps = {
  defaultRoute?: string;
  adminRoute?: string;
  agentRoute?: string;
  castumerRoute?: string;
};
export const GlobalRouteToRole=(props: GlobalRouteToRoleProps)=>
{
  const context = useAuth();
    const params = useParams(); // כאן לוקחים את כל הפרמטרים מה-URL
     if (!context) {
    return <Navigate to={`/${props.defaultRoute}`} replace />;
  }

  // פונקציה שמחליפה פרמטרים דינמיים בנתיב
  const replaceParams = (path: string) => {
    let newPath = path;
    Object.entries(params).forEach(([key, value]) => {
      newPath = newPath.replace(`:${key}`, value || "");
    });
    return newPath;
  };

    if (context?.loading) return <div>טוען...</div>; // מונע ניווט לפני שהטוקן נטען
        if(!context)
        {
            return <Navigate to={`/${props.defaultRoute}`} replace />;
        }
        if(context.isAdmin&& props.adminRoute)
            return <Navigate to={`/${replaceParams(props.adminRoute)}`} replace />;
        if(context.isAgent && props.agentRoute)
            return <Navigate to={`/${replaceParams(props.agentRoute)}`} replace />;
          if(context.isCustomer && props.castumerRoute)
            return <Navigate to={`/${replaceParams(props.castumerRoute)}`} replace />;
}

