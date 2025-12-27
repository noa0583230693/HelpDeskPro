import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useTickets } from "../../context/TicketContext";
import { useNavigate, useParams } from "react-router-dom";
import { serviceAddComment } from "../../services/ticketService";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Avatar
} from "@mui/material";
import {
  Send,
  Comment as CommentIcon,
  ArrowBack
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

interface AddCommentProps {
    content: string;
}

export const AddComment = () => {
    const navigate = useNavigate();
    const ticketId = Number(useParams().id);
    const { register, handleSubmit, formState: { errors } } = useForm<AddCommentProps>();
    const { token, user } = useAuth();
    const { fetchTicketById } = useTickets();
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: AddCommentProps) => {
        if (!token) {
            setSubmitError("אתה חייב להיות מחובר כדי להוסיף תגובה");
            return;
        }

        try {
            setLoading(true);
            setSubmitError(null);
            await serviceAddComment(token, ticketId, data);
            await fetchTicketById(ticketId);
            setSuccess(true);
            setTimeout(() => {
                navigate(`/ticket/${ticketId}`);
            }, 1500);
        } catch (error) {
            setSubmitError("שגיאה בהוספת התגובה. אנא נסה שוב.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                {/* Header */}
                <Box display="flex" alignItems="center" gap={2} mb={4}>
                    <Avatar
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: 'primary.main'
                        }}
                    >
                        <CommentIcon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h4" fontWeight={600} gutterBottom>
                            הוספת תגובה חדשה
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            הוסף תגובה לטיקט #{ticketId}
                        </Typography>
                    </Box>
                </Box>

                {/* Alerts */}
                {submitError && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setSubmitError(null)}>
                        {submitError}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        התגובה נוספה בהצלחה! מעביר חזרה לטיקט...
                    </Alert>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        {/* User Info */}
                        <Box display="flex" alignItems="center" gap={2} p={2} bgcolor="action.hover" borderRadius={2}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                                {user?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    {user?.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    מגיב כ-{user?.role}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Comment Content */}
                        <TextField
                            fullWidth
                            label="תוכן התגובה"
                            multiline
                            rows={6}
                            error={!!errors.content}
                            helperText={errors.content?.message}
                            {...register("content", {
                                required: "שדה זה הוא חובה",
                                minLength: { value: 5, message: "תוכן התגובה חייב להכיל לפחות 5 תווים" },
                                maxLength: { value: 300, message: "תוכן התגובה לא יכול להיות ארוך מ-300 תווים" }
                            })}
                            variant="outlined"
                            placeholder="כתוב את התגובה שלך כאן..."
                        />

                        {/* Buttons */}
                        <Box display="flex" gap={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading || success}
                                startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                            >
                                {loading ? "שולח..." : success ? "נשלח בהצלחה!" : "הוסף תגובה"}
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate(`/ticket/${ticketId}`)}
                                disabled={loading}
                                startIcon={<ArrowBack />}
                            >
                                ביטול
                            </Button>
                        </Box>
                    </Box>
                </form>

                {/* Help Text */}
                <Box mt={3} p={2} bgcolor="info.light" borderRadius={2} sx={{ opacity: 0.7 }}>
                    <Typography variant="caption" color="text.secondary">
                        💡 <strong>טיפ:</strong> כתוב תגובה ברורה ומפורטת כדי לעזור לפתור את הבעיה מהר יותר.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};