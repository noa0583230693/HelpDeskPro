import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Button, Box, CircularProgress, Alert, Container, Paper, Breadcrumbs, Link, Typography } from "@mui/material";
import { Comment, Home, ConfirmationNumber, ArrowBack } from "@mui/icons-material";
import { BaseTicketView } from "../baseTicketView";
import { useTickets } from "../../../context/TicketContext";

export const DetailTicketC = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const { fetchTicketById, currentTicket: ticket, loading, error } = useTickets();

    const AddComment = (ticketId: number) => {
        navigate(`/ticket/${ticketId}/addComment`);
    };

    useEffect(() => {
        if (id) {
            fetchTicketById(Number(id));
        }
    }, [id, fetchTicketById]);

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Breadcrumbs & Action Bar */}
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} mb={3}>
                <Breadcrumbs>
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        color="inherit"
                        onClick={() => navigate('/dashboard')}
                    >
                        <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                        דשבורד
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                        color="inherit"
                        onClick={() => navigate('/tickets')}
                    >
                        <ConfirmationNumber sx={{ mr: 0.5 }} fontSize="inherit" />
                        טיקטים
                    </Link>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        טיקט #{id}
                    </Typography>
                </Breadcrumbs>

                {/* Quick Action Buttons */}
                <Box display="flex" gap={1}>
                    <Button 
                        variant="contained" 
                        size="small"
                        onClick={() => { AddComment(Number(id)); }}
                        startIcon={<Comment />}
                    >
                        הוסף תגובה
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate('/tickets')}
                    >
                        חזור
                    </Button>
                </Box>
            </Box>

            {/* Main Content */}
            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                {ticket && <BaseTicketView ticket={ticket!} />}
            </Paper>
        </Container>
    );
};
