import { useForm } from "react-hook-form";
import { type User } from "../../interface/interfaces";
import { useState } from "react";
import { useToken } from "../../context/AuthContext";
import { serviceCreateUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  InputAdornment
} from "@mui/material";
import {
  PersonAdd,
  Person,
  Email,
  Lock,
  Badge,
  ArrowBack
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export const AddUser = () => {
    const Navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const token = useToken();
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: User) => {
        if (!token) {
            setSubmitError("אתה חייב להיות מחובר כדי להוסיף משתמש");
            return;
        }

        try {
            setLoading(true);
            setSubmitError(null);
            
            await serviceCreateUser(token, data);
            setSuccess(true);
            setTimeout(() => {
                Navigate("/users");
            }, 1500);
        } catch (error) {
            setSubmitError("שגיאה בהוספת המשתמש. אנא נסה שוב.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="md" className="fade-in">
            <Box className="p-xl">
                <Paper elevation={3} className="custom-card">
                    {/* Header */}
                    <Box className="custom-card-header">
                        <Box className="flex gap-md">
                            <Box className="auth-logo" sx={{ width: 60, height: 60 }}>
                                <PersonAdd />
                            </Box>
                            <Box>
                                <Typography variant="h4" className="custom-card-title">
                                    הוספת משתמש חדש
                                </Typography>
                                <Typography variant="body2" className="custom-card-subtitle">
                                    צור משתמש חדש במערכת
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Alerts */}
                    {submitError && (
                        <Alert severity="error" className="mb-md" onClose={() => setSubmitError(null)}>
                            {submitError}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" className="mb-md">
                            המשתמש נוסף בהצלחה! מעביר לדף המשתמשים...
                        </Alert>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className="flex flex-column gap-lg">
                            {/* Name Field */}
                            <TextField
                                fullWidth
                                label="שם מלא"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                {...register("name", { 
                                    required: "שדה זה הוא חובה",
                                    minLength: { value: 3, message: "השם חייב להכיל לפחות 3 תווים" },
                                })}
                                variant="outlined"
                                placeholder="הזן שם מלא"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Email Field */}
                            <TextField
                                fullWidth
                                label="אימייל"
                                type="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register("email", { 
                                    required: "שדה זה הוא חובה", 
                                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "כתובת אימייל לא תקינה" } 
                                })}
                                variant="outlined"
                                placeholder="example@domain.com"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Password Field */}
                            <TextField
                                fullWidth
                                label="סיסמה"
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                {...register("password", { 
                                    required: "שדה זה הוא חובה", 
                                    minLength: { value: 6, message: "הסיסמא חייבת להכיל לפחות 6 תווים" } 
                                })}
                                variant="outlined"
                                placeholder="הזן סיסמה"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Role Field */}
                            <FormControl fullWidth error={!!errors.role}>
                                <InputLabel>תפקיד</InputLabel>
                                <Select
                                    label="תפקיד"
                                    defaultValue=""
                                    {...register("role", { required: "שדה זה הוא חובה" })}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Badge color="action" />
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="">
                                        <em>בחר תפקיד</em>
                                    </MenuItem>
                                    <MenuItem value="admin">מנהל (Admin)</MenuItem>
                                    <MenuItem value="agent">נציג (Agent)</MenuItem>
                                    <MenuItem value="customer">לקוח (Customer)</MenuItem>
                                </Select>
                                {errors.role && (
                                    <FormHelperText>{errors.role.message}</FormHelperText>
                                )}
                            </FormControl>

                            {/* Buttons */}
                            <Box className="flex gap-md mt-md">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={loading || success}
                                    startIcon={loading ? <CircularProgress size={20} /> : <PersonAdd />}
                                    className="btn-primary"
                                >
                                    {loading ? "מוסיף..." : success ? "נוסף בהצלחה!" : "הוסף משתמש"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => Navigate("/users")}
                                    disabled={loading}
                                    startIcon={<ArrowBack />}
                                    className="btn-outlined"
                                >
                                    חזור
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};
