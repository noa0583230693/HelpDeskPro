import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Ticket } from "../../interface/interfaces";
import { useAuth } from "../../context/AuthContext";
import { useTickets } from "../../context/TicketContext";
import { BaseTicketView } from "./baseTicketView";
import { TicketAction } from "./actionTicket/ticketAction";
import {
  Box,
  Container,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Collapse,
  IconButton,
  Breadcrumbs,
  Link,
  Typography
} from "@mui/material";
import {
  ArrowBack,
  Edit,
  Close,
  Home,
  ConfirmationNumber
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";
import "../../styles/tickets.css";

export interface EditComponentProps2
{
    ticket:Ticket;
    onClose?:()=>void;
    onUpdated?:()=>void;
}
export const TicketDetails=()=>
{   
    const id=useParams().id;
    const { user } = useAuth();
    const role = user?.role;
    const { fetchTicketById, currentTicket: ticket, loading, error, updateTicket } = useTickets();
    const [editState, setEditState]=useState<boolean>(false);
    const navigate=useNavigate();

    useEffect(()=>{
        if(id) {
            fetchTicketById(Number(id));
        }
    },[id, fetchTicketById]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <CircularProgress size={60} />
                    <Typography variant="h6" color="text.secondary">
                        טוען פרטי טיקט...
                    </Typography>
                </Box>
            </Container>
        );
    }

    if (error || !ticket) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error || "שגיאה בטעינת הטיקט"}
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/tickets')}
                >
                    חזור לרשימת הטיקטים
                </Button>
            </Container>
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
                        טיקט #{ticket.id}
                    </Typography>
                </Breadcrumbs>

                {/* Quick Action Buttons */}
                <Box display="flex" gap={1}>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => setEditState(!editState)}
                        color={editState ? "secondary" : "primary"}
                    >
                        {editState ? "ביטול" : "ערוך"}
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

            {/* Edit Section - Above the ticket */}
            <Collapse in={editState}>
                <Paper elevation={2} sx={{ p: 3, mb: 3, bgcolor: 'primary.light', borderRadius: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight={600} color="primary.contrastText">
                            ✏️ עריכת טיקט
                        </Typography>
                        <IconButton onClick={() => setEditState(false)} size="small" sx={{ color: 'primary.contrastText' }}>
                            <Close />
                        </IconButton>
                    </Box>
                    <TicketAction
                        role={role || ""}
                        ticket={ticket}
                        onClose={() => setEditState(false)}
                    />
                </Paper>
            </Collapse>

            {/* Main Content */}
            <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                {ticket && <BaseTicketView ticket={ticket} />}
            </Paper>
        </Container>
    );
}