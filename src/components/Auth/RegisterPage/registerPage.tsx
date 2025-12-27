import React from "react";
import { useForm } from "react-hook-form";
import { serviceLogin, serviceRegister } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
  LinearProgress,
  Chip
} from "@mui/material";
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  PersonAdd as RegisterIcon,
  Person,
  CheckCircle
} from "@mui/icons-material";
import "../../../styles/theme.css";
import "../../../styles/components.css";
import "../../../styles/auth.css";


export interface RegisterPageProps
{
    name:string;
    email:string;
    password:string;
}
export const RegisterPage:React.FC = () =>
{
    const {register,handleSubmit,formState:{errors},watch} = useForm<RegisterPageProps>();
   const { login } = useAuth();
   const navigate=useNavigate();
   const [showPassword, setShowPassword] = React.useState(false);
   const [registerError, setRegisterError] = React.useState<string>("");
   const [registerSuccess, setRegisterSuccess] = React.useState(false);
   const [isLoading, setIsLoading] = React.useState(false);
   const { showSuccess, showError } = useNotification();
   
   // Watch password for strength indicator
   const password = watch("password");
   
   const getPasswordStrength = (pwd: string) => {
     if (!pwd) return { strength: 0, text: "" };
     if (pwd.length < 6) return { strength: 33, text: "חלשה", color: "error" };
     if (pwd.length < 10) return { strength: 66, text: "בינונית", color: "warning" };
     return { strength: 100, text: "חזקה", color: "success" };
   };
   
   const passwordStrength = getPasswordStrength(password);
   
    const onSubmit = async (data:RegisterPageProps) => {
      try {
        setRegisterError("");
        setIsLoading(true);
        await serviceRegister(data);
        
        setRegisterSuccess(true);
        showSuccess("הרשמה הושלמה בהצלחה! מתחבר...");
        
        setTimeout(async () => {
          try {
            const [userData, token] = await serviceLogin({email: data.email, password: data.password});
            login(userData, token);
            navigate("/dashboard");
          } catch (loginError) {
            showError("הרשמה הצליחה, אך היתה בעיה בהתחברות. אנא התחבר ידנית.");
            navigate("/login");
          }
        }, 1500);
      } catch (error) {
        const errorMessage = getUserFriendlyErrorMessage(error);
        setRegisterError(errorMessage);
        showError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }

    // טופס הרשמה שכולל שדות שם סיסמא ומייל ושולח לשרת ל register
    
    return (
      <Box className="auth-container">
        <Container maxWidth="sm">
          <Paper className="auth-card" elevation={24}>
            {/* Header */}
            <Box className="auth-header">
              <Box className="auth-logo">
                <RegisterIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h4" className="auth-title">
                הצטרף אלינו! 🚀
              </Typography>
              <Typography variant="body1" className="auth-subtitle">
                צור חשבון חדש והתחל לנהל את הפניות שלך
              </Typography>
            </Box>

            {/* Success Alert */}
            {registerSuccess && (
              <Alert severity="success" sx={{ mb: 3 }} icon={<CheckCircle />}>
                ההרשמה הושלמה בהצלחה! מעביר אותך לדשבורד...
              </Alert>
            )}

            {/* Error Alert */}
            {registerError && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setRegisterError("")}>
                {registerError}
              </Alert>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              {/* Name Field */}
              <Box>
                <TextField
                  fullWidth
                  label="שם מלא"
                  type="text"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...register("name", { 
                    required: "שדה זה הוא חובה", 
                    minLength: { value: 3, message: "שם חייב להכיל לפחות 3 תווים" },
                    maxLength: { value: 20, message: "שם לא יכול להיות ארוך מ-20 תווים" }
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="הזן את שמך המלא"
                />
              </Box>

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
                    // { value:  /^[a-zA-Z0-9._%+-]/, message: "פורמט אימייל לא תקין" }
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
                  placeholder="בחר סיסמה חזקה"
                />
                
                {/* Password Strength Indicator */}
                {password && (
                  <Box sx={{ mt: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        חוזק הסיסמה:
                      </Typography>
                      <Chip 
                        label={passwordStrength.text} 
                        size="small" 
                        color={passwordStrength.color as any}
                      />
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={passwordStrength.strength}
                      color={passwordStrength.color as any}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                )}
              </Box>

              {/* Terms */}
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                בהרשמה, אתה מסכים ל
                <Link href="#" sx={{ mx: 0.5 }}>תנאי השימוש</Link>
                ול
                <Link href="#" sx={{ mx: 0.5 }}>מדיניות הפרטיות</Link>
              </Typography>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className="auth-submit"
                startIcon={<RegisterIcon />}
                disabled={registerSuccess || isLoading}
              >
                {isLoading ? "מרשם..." : registerSuccess ? "מעביר..." : "הירשם עכשיו"}
              </Button>
            </form>

            {/* Divider */}
            <Box className="auth-divider">
              <Typography className="auth-divider-text">
                כבר רשום?
              </Typography>
            </Box>

            {/* Login Link */}
            <Box className="auth-footer">
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/login')}
              >
                התחבר לחשבון קיים
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
}