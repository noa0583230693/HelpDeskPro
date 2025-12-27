// components/RoleBasedLayout.jsx

import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MainLayout } from "./mainLayOut";
import { adminMenuItems, agentMenuItems, customerMenuItems } from "./menu";

export const RoleBasedLayout = () => {
  const allUser = useAuth(); // שליפת המשתמש מהקונטקסט

  if (!allUser || !allUser.user) return null; // או הפניה ללוגין

  // בדיקת התפקיד והחזרת הלייאאוט המתאים שעוטף את ה-Outlet
  if (allUser.isAdmin) {
    return (
      <MainLayout menuItems={adminMenuItems} roleTitle="Admin Panel" />
    );
  }

  if (allUser.isAgent) {
    return (
      <MainLayout menuItems={agentMenuItems} roleTitle="Agent Panel" />
    );
  }

  if (allUser.isCustomer) {
    return (
      <MainLayout menuItems={customerMenuItems} roleTitle="Customer Panel" />
    );
  }

  return <Outlet />; // ברירת מחדל למקרה קיצון
};
