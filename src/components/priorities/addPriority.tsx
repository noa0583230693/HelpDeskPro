import { useForm } from "react-hook-form";
import type { Priority } from "../../interface/interfaces";
import { useState } from "react";
import { useToken } from "../../context/AuthContext";
import { serviceCreatePriority } from "../../services/priorityService";
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
  Flag,
  ArrowBack
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export const AddPriority = () => {
    const token = useToken();
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<Priority>();

    const onSubmit = async (data: Priority) => {
        if (!token) {
            setSubmitError("אתה חייב להיות מחובר כדי להוסיף עדיפות");
            return;
        }

        try {
            setLoading(true);
            setSubmitError(null);
            await serviceCreatePriority(token, data.name);
            setSuccess(true);
            setTimeout(() => {
                navigate('/priorities');
            }, 1500);
        } catch (error) {
            setSubmitError("שגיאה בהוספת העדיפות. אנא נסה שוב.");
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
                                    הוספת עדיפות חדשה
                                </Typography>
                                <Typography variant="body2" className="custom-card-subtitle">
                                    צור עדיפות חדשה למערכת הטיקטים
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
                        ! מעביר לדף העדיפויות...
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box className="flex flex-column gap-lg">
                            <TextField
                                fullWidth
                                label="שם העדיפות"
                                error={!!errors.name}
                                helperText={errors.name ? "שדה זה הוא חובה" : ""}
                                {...register("name", { required: true })}
                                variant="outlined"
                                placeholder="לדוגמה: גבוהה, בינונית, נמוכה"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Flag color="action" />
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
                                    {loading ? "מוסיף..." : success ? "נוסף בהצלחה!" : "הוסף עדיפות"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate("/priorities")}
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
