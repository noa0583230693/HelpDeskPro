import { useForm } from "react-hook-form";
import type { Status } from "../../interface/interfaces";
import { useState } from "react";
import { useToken } from "../../context/AuthContext";
import { serviceCreateStatus } from "../../services/statusService";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment
} from "@mui/material";
import {
  Add,
  Circle,
  ArrowBack
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export const AddStatus = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Status>();
    const token = useToken();
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data: Status) => {
        if (!token) {
            setSubmitError("אתה חייב להיות מחובר כדי להוסיף סטטוס");
            return;
        }

        try {
            setLoading(true);
            setSubmitError(null);
            await serviceCreateStatus(token, data.name);
            setSuccess(true);
            setTimeout(() => {
                navigate('/statuses');
            }, 1500);
        } catch (error) {
            setSubmitError("שגיאה בהוספת הסטטוס. אנא נסה שוב.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" className="fade-in">
            <Box className="p-xl">
                <Paper elevation={3} className="custom-card">
                    <Box className="custom-card-header">
                        <Box className="flex gap-md">
                            <Box className="auth-logo" sx={{ width: 60, height: 60 }}>
                                <Add />
                            </Box>
                            <Box>
                                <Typography variant="h4" className="custom-card-title">
                                    הוספת סטטוס חדש
                                </Typography>
                                <Typography variant="body2" className="custom-card-subtitle">
                                    צור סטטוס חדש למערכת הטיקטים
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {submitError && (
                        <Alert severity="error" className="mb-md" onClose={() => setSubmitError(null)}>
                            {submitError}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" className="mb-md">
                            הסטטוס נוסף בהצלחה! מעביר לדף הסטטוסים...
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className="flex flex-column gap-lg">
                            <TextField
                                fullWidth
                                label="שם הסטטוס"
                                error={!!errors.name}
                                helperText={errors.name ? "שדה זה הוא חובה" : ""}
                                {...register("name", { required: true })}
                                variant="outlined"
                                placeholder="לדוגמה: פתוח, בטיפול, סגור"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Circle color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Box className="flex gap-md mt-md">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    disabled={loading || success}
                                    startIcon={loading ? <CircularProgress size={20} /> : <Add />}
                                    className="btn-primary"
                                >
                                    {loading ? "מוסיף..." : success ? "נוסף בהצלחה!" : "הוסף סטטוס"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate("/statuses")}
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