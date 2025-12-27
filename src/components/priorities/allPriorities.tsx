import { useEffect, useState } from "react";
import { useToken } from "../../context/AuthContext";
import { serviceGetPriorities } from "../../services/priorityService";
import type { Priority } from "../../interface/interfaces";
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  Flag,
  Edit,
  Delete
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export const AllPriorities = () => {
    const token = useToken();
    const [priorities, setPriorities] = useState<Priority[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPriorities = async () => {
            if (!token) {
                setError("אתה חייב להיות מחובר");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const res = await serviceGetPriorities(token);
                setPriorities(res);
            } catch (err) {
                setError("שגיאה בטעינת העדיפויות");
            } finally {
                setLoading(false);
            }
        };

        fetchPriorities();
    }, [token]);

    const getPriorityColor = (name: string) => {
        const nameLower = name?.toLowerCase() || '';
        if (nameLower.includes('גבוה') || nameLower.includes('high') || nameLower.includes('urgent')) return 'error';
        if (nameLower.includes('בינוני') || nameLower.includes('medium') || nameLower.includes('normal')) return 'warning';
        if (nameLower.includes('נמוך') || nameLower.includes('low')) return 'success';
        return 'default';
    };

    if (loading) {
        return (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <CircularProgress size={60} />
              <Typography variant="h6" color="text.secondary">
                טוען עדיפויות...
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
                  <Flag sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    ניהול עדיפויות
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    סה״כ {priorities.length} רמות עדיפות
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={3}>
              {priorities.map((priority) => (
                  <Card
                    key={priority.id}
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
                          icon={<Flag />}
                          label={priority.name}
                          color={getPriorityColor(priority.name) as any}
                          size="medium"
                        />
                      
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        רמת עדיפות: {priority.name}
                      </Typography>

                    
                    </CardContent>
                  </Card>
              ))}
            </Box>
          </Paper>
        </Container>
    );
};