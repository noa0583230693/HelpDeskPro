import { useEffect } from "react"
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography, CircularProgress } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import "../../../styles/theme.css";
import "../../../styles/components.css";
import "../../../styles/auth.css";

export const LogOut=()=>
{
    const { logout } = useAuth();
    const navigate=useNavigate();
    
    const logOut=()=>
        logout();
    
    useEffect(()=>
    {
        const performLogout = async () => {
            // Small delay for user feedback
            await new Promise(resolve => setTimeout(resolve, 1000));
            logOut();
            navigate("/AuthPage");
        };
        performLogout();
    }, []);
    
    return (
        <Box className="auth-container">
            <Container maxWidth="sm">
                <Paper className="auth-card" elevation={24}>
                    <Box className="logout-content">
                        <Box className="auth-logo">
                            <ExitToApp />
                        </Box>
                        <Typography variant="h4" className="auth-title">
                            מתנתק...
                        </Typography>
                        <Typography variant="body1" className="auth-subtitle">
                            אנא המתן, מנתק אותך מהמערכת
                        </Typography>
                        <Box className="logout-spinner">
                            <CircularProgress size={50} />
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}