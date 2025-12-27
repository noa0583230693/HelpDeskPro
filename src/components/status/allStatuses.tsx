import { useEffect, useState } from "react";
import { useToken } from "../../context/AuthContext";
import type { Status } from "../../interface/interfaces";
import { serviceGetStatus } from "../../services/statusService";
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert
} from "@mui/material";
import {
  Circle,
  CheckCircle,
  HourglassEmpty,
  Cancel
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export const AllStatuses = () => {
    const token = useToken();
    const [statuses, setStatuses] = useState<Status[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatuses = async () => {
            if (!token) {
                setError("אתה חייב להיות מחובר");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const res = await serviceGetStatus(token);
                setStatuses(res);
            } catch (err) {
                setError("שגיאה בטעינת הסטטוסים");
            } finally {
                setLoading(false);
            }
        };

        fetchStatuses();
    }, [token]);

    const getStatusColor = (name: string) => {
        const nameLower = name?.toLowerCase() || '';
        if (nameLower.includes('סגור') || nameLower.includes('closed') || nameLower.includes('סיים')) return 'success';
        if (nameLower.includes('בטיפול') || nameLower.includes('progress')) return 'warning';
        if (nameLower.includes('פתוח') || nameLower.includes('open')) return 'primary';
        if (nameLower.includes('מבוטל') || nameLower.includes('cancel')) return 'error';
        return 'default';
    };

    const getStatusIcon = (name: string) => {
        const nameLower = name?.toLowerCase() || '';
        if (nameLower.includes('סגור') || nameLower.includes('closed')) return <CheckCircle />;
        if (nameLower.includes('בטיפול') || nameLower.includes('progress')) return <HourglassEmpty />;
        if (nameLower.includes('מבוטל') || nameLower.includes('cancel')) return <Cancel />;
        return <Circle />;
    };

    if (loading) {
        return (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <CircularProgress size={60} />
              <Typography variant="h6" color="text.secondary">
                טוען סטטוסים...
              </Typography>
            </Box>
          </Container>
        );
    }

    if (error) {
        return (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Alert severity="error">{error}</Alert>
          </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Box display="flex" alignItems="center" gap={2}>
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
                  <Circle sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    ניהול סטטוסים
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    סה״כ {statuses?.length || 0} סטטוסים במערכת
                  </Typography>
                </Box>
              </Box>
            </Box>

            {statuses && statuses.length > 0 ? (
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={3}>
                {statuses.map((status) => (
                    <Card
                      key={status.id}
                      elevation={2}
                      sx={{
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 6
                        }
                      }}
                    >
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                          <Chip
                            icon={getStatusIcon(status.name)}
                            label={status.name}
                            color={getStatusColor(status.name) as any}
                            size="medium"
                          />
                       
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" mb={2}>
                          סטטוס: {status.name}
                        </Typography>

                       
                      </CardContent>
                    </Card>
                ))}
              </Box>
            ) : (
              <Box textAlign="center" py={8}>
                <Circle sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  לא נמצאו סטטוסים במערכת
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
    );
};