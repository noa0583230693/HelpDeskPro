import { useNavigate } from 'react-router-dom';
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { Login as LoginIcon, PersonAdd as RegisterIcon, Support } from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";
import "../../styles/auth.css";

export const AuthPage=()=>
{
    const navigate=useNavigate();
    const Login=()=>
    {
        navigate("/login");
    }
    const Register=()=>
    {
        navigate("/register");
    }
    return (
        <Box className="auth-container">
            <Container maxWidth="md">
                <Box className="auth-page-wrapper">
                    <Paper className="auth-page-card" elevation={24}>
                        <Box className="auth-header">
                            <Box className="auth-logo">
                                <Support />
                            </Box>
                            <Typography variant="h3" className="auth-title">
                                מערכת ניהול פניות
                            </Typography>
                            <Typography variant="h6" className="auth-subtitle">
                                פתרון מקצועי לניהול תמיכה ושירות לקוחות
                            </Typography>
                        </Box>

                        <Box className="auth-page-actions">
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                startIcon={<LoginIcon />}
                                onClick={Login}
                                className="auth-page-btn auth-page-btn-primary"
                            >
                                התחבר למערכת
                            </Button>
                            
                            <Button
                                variant="outlined"
                                size="large"
                                fullWidth
                                startIcon={<RegisterIcon />}
                                onClick={Register}
                                className="auth-page-btn auth-page-btn-secondary"
                            >
                                הרשמה חדשה
                            </Button>
                        </Box>

                        <Box className="auth-page-features">
                            <Box className="auth-page-feature-item">
                                <Box className="auth-page-feature-icon">
                                    ⚡
                                </Box>
                                <Typography className="auth-page-feature-title">מהיר ויעיל</Typography>
                                <Typography className="auth-page-feature-desc">
                                    ניהול פניות במהירות וביעילות מקסימלית
                                </Typography>
                            </Box>
                            <Box className="auth-page-feature-item">
                                <Box className="auth-page-feature-icon">
                                    🔒
                                </Box>
                                <Typography className="auth-page-feature-title">מאובטח לחלוטין</Typography>
                                <Typography className="auth-page-feature-desc">
                                    אבטחת מידע ברמה הגבוהה ביותר
                                </Typography>
                            </Box>
                            <Box className="auth-page-feature-item">
                                <Box className="auth-page-feature-icon">
                                    💬
                                </Box>
                                <Typography className="auth-page-feature-title">תמיכה 24/7</Typography>
                                <Typography className="auth-page-feature-desc">
                                    תמיכה מלאה בכל שעות היממה
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}