

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { serviceLogin } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";
import {  useNavigate } from "react-router-dom";
import { useNotification } from "../../../context/NotificationContext";
import { getUserFriendlyErrorMessage } from "../../../utils/errorHandler";
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  Link,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Login as LoginIcon,
  Security,
  Speed,
  Support
} from "@mui/icons-material";
import "../../../styles/theme.css";
import "../../../styles/components.css";
import "../../../styles/auth.css";



export interface LoginPageProps
{
   
    email:string;
    password:string;
}
export  const LoginPage:React.FC = () =>
{
    const {register,handleSubmit,formState:{errors}} = useForm<LoginPageProps>();
    const { login, user } = useAuth();
    const storedUser = localStorage.getItem("currentUser");
    const navigate=useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [loginError, setLoginError] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState(false);
    const { showSuccess, showError } = useNotification();
    
    useEffect(()=>
    {
        if(user||storedUser)
        {
            navigate('/dashboard');
        }
    }, [user, navigate,storedUser]);
    
    const onSubmit = async (data:LoginPageProps) => {
        try {
            setLoginError("");
            setIsLoading(true);
            const [userData, token] = await serviceLogin(data);

            login(userData, token);
            showSuccess(`שלום ${userData.name}! התחברת בהצלחה`);
            navigate('/dashboard');
        } catch (error) {
            const errorMessage = getUserFriendlyErrorMessage(error);
            setLoginError(errorMessage);
            showError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    
    return (
      <Box className="auth-container">
        <Container maxWidth="sm">
          <Paper className="auth-card" elevation={24}>
            {/* Header */}
            <Box className="auth-header">
              <Box className="auth-logo">
                <LoginIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h4" className="auth-title">
                ברוכים השבים! 👋
              </Typography>
              <Typography variant="body1" className="auth-subtitle">
                היכנס לחשבון שלך כדי להמשיך
              </Typography>
            </Box>

            {/* Error Alert */}
            {loginError && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setLoginError("")}>
                {loginError}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              {/* Email Field */}
              <Box>
                <TextField
                  fullWidth
                  label="אימייל"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", { 
                    required: "שדה זה הוא חובה"
                    // , pattern: 
                    // { value:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "פורמט אימייל לא תקין" }
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="example@domain.com"
                />
              </Box>

              {/* Password Field */}
              <Box>
                <TextField
                  fullWidth
                  label="סיסמה"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password", { 
                    required: "שדה זה הוא חובה",
                    minLength: { value: 6, message: "סיסמא חייבת להכיל לפחות 6 תווים" }
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="הזן את הסיסמה שלך"
                />
              </Box>

              {/* Remember & Forgot */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="זכור אותי"
                />
                <Link href="#" underline="hover" className="auth-forgot">
                  שכחת סיסמה?
                </Link>
              </Box>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className="auth-submit"
                startIcon={<LoginIcon />}
                disabled={isLoading}
              >
                {isLoading ? "מתחבר..." : "התחבר"}
              </Button>
            </form>

            {/* Divider */}
            <Box className="auth-divider">
              <Typography className="auth-divider-text">
                או
              </Typography>
            </Box>

            {/* Register Link */}
            <Box className="auth-footer">
              <Typography variant="body2" color="text.secondary">
                אין לך חשבון?{" "}
                <Link href="/register" className="auth-link">
                  הירשם עכשיו
                </Link>
              </Typography>
            </Box>

            {/* Features */}
            <Box className="auth-features">
              <Box className="auth-feature">
                <Box className="auth-feature-icon">
                  <Security />
                </Box>
                <Typography className="auth-feature-text">
                  מאובטח לחלוטין
                </Typography>
              </Box>
              <Box className="auth-feature">
                <Box className="auth-feature-icon">
                  <Speed />
                </Box>
                <Typography className="auth-feature-text">
                  מהיר ויעיל
                </Typography>
              </Box>
              <Box className="auth-feature">
                <Box className="auth-feature-icon">
                  <Support />
                </Box>
                <Typography className="auth-feature-text">
                  תמיכה 24/7
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
}
export default LoginPage;
