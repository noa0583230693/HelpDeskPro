import { useForm } from "react-hook-form";
import type { Priority } from "../../interface/interfaces";
import { useNavigate } from "react-router-dom";
import { serviceCreateTicket } from "../../services/ticketService";
import { serviceGetPriorities } from "../../services/priorityService";
import { useEffect, useState } from "react";
import { useToken } from "../../context/AuthContext";
import { useTickets } from "../../context/TicketContext";
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
  FormHelperText
} from "@mui/material";
import {
  Add as AddIcon,
  Subject as SubjectIcon,
  Description as DescriptionIcon,
  Flag as FlagIcon,
  Send
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export interface AddTicketProps
{
    subject:string;
    description:string;
    priority_id:number;
    status_id:number;
    assigned_to:number;
}


export const AddTicket = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AddTicketProps>();
    const token = useToken();
    const navigate = useNavigate();
    const { addTicket } = useTickets();
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchPriorities = async () => {
            if (!token) {
                setFetchError("אתה חייב להיות מחובר כדי להוסיף טיקט");
                return;
            }

            try {
                setLoading(true);
                setFetchError(null);
                const res = await serviceGetPriorities(token);
                setPriorities(res);
            } catch (error) {
                setFetchError("שגיאה בטעינת העדיפויות. אנא נסה להרענן את הדף.");
            } finally {
                setLoading(false);
            }
        };

        fetchPriorities();
    }, [token]);

    const onSubmit = async (data: AddTicketProps) => {
        if (!token) {
            setSubmitError("אתה חייב להיות מחובר כדי להוסיף טיקט");
            return;
        }

        try {
            setLoading(true);
            setSubmitError(null);
            const newTicket = await serviceCreateTicket(token, data);
            addTicket(newTicket);
            setSuccess(true);
            setTimeout(() => {
              navigate("/tickets");
            }, 1500);
        } catch (error) {
            setSubmitError("שגיאה בהוספת הטיקט. אנא נסה שוב.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            {/* Header */}
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <AddIcon sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                  יצירת טיקט חדש
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  מלא את הפרטים ליצירת פניה חדשה למערכת
                </Typography>
              </Box>
            </Box>

            {/* Alerts */}
            {fetchError && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setFetchError(null)}>
                {fetchError}
              </Alert>
            )}
            {submitError && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setSubmitError(null)}>
                {submitError}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                הטיקט נוצר בהצלחה! מעביר לדף הטיקטים...
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Subject */}
                <TextField
                  fullWidth
                  label="נושא הפניה"
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                  {...register("subject", {
                    required: "שדה זה הוא חובה",
                    minLength: { value: 3, message: "נושא חייב להכיל לפחות 3 תווים" },
                    maxLength: { value: 50, message: "נושא לא יכול להיות ארוך מ-50 תווים" }
                  })}
                  variant="outlined"
                  placeholder="תאר בקצרה את הבעיה"
                  InputProps={{
                    startAdornment: <SubjectIcon sx={{ mr: 1, color: 'action.active' }} />
                  }}
                />

                {/* Description */}
                <TextField
                  fullWidth
                  label="תיאור מפורט"
                  multiline
                  rows={6}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  {...register("description", {
                    required: "שדה זה הוא חובה",
                    minLength: { value: 10, message: "תיאור חייב להכיל לפחות 10 תווים" },
                    maxLength: { value: 500, message: "תיאור לא יכול להיות ארוך מ-500 תווים" }
                  })}
                  variant="outlined"
                  placeholder="תאר את הבעיה בפירוט, כולל שלבים לשחזור אם רלוונטי"
                  InputProps={{
                    startAdornment: <DescriptionIcon sx={{ mr: 1, mt: 1, color: 'action.active' }} />
                  }}
                />

                {/* Priority */}
                <FormControl fullWidth error={!!errors.priority_id}>
                  <InputLabel>עדיפות</InputLabel>
                  <Select
                    label="עדיפות"
                    defaultValue=""
                    {...register("priority_id", { required: "שדה זה הוא חובה" })}
                    startAdornment={<FlagIcon sx={{ mr: 1, color: 'action.active' }} />}
                  >
                    <MenuItem value="">
                      <em>בחר רמת עדיפות</em>
                    </MenuItem>
                    {priorities.map(priority => (
                      <MenuItem key={priority.id} value={priority.id}>
                        {priority.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.priority_id && (
                    <FormHelperText>{errors.priority_id.message}</FormHelperText>
                  )}
                </FormControl>

                {/* Submit Button */}
                <Box display="flex" gap={2} mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading || success}
                    startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                  >
                    {loading ? "שולח..." : success ? "נשלח בהצלחה!" : "שלח טיקט"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/tickets")}
                    disabled={loading}
                  >
                    ביטול
                  </Button>
                </Box>
              </Box>
            </form>

            {/* Help Text */}
            <Box mt={4} p={2} bgcolor="action.hover" borderRadius={2}>
              <Typography variant="caption" color="text.secondary">
                💡 <strong>טיפ:</strong> ככל שתספק יותר פרטים בתיאור הבעיה, כך נוכל לסייע לך מהר יותר.
                אנא כלול מידע על דפדפן, מערכת הפעלה, ושלבים לשחזור הבעיה.
              </Typography>
            </Box>
          </Paper>
        </Container>
    );
};

