import { useState } from "react";
import { Button, Alert, CircularProgress } from "@mui/material";
import { Save } from "@mui/icons-material";
import { EditPriority } from "../../priorities/editPriority";
import { EditStatus } from "../../status/editStatus";
import type { Ticket } from "../../../interface/interfaces";
import { ChangeAgent } from "../../Agent (assigned_to)/changeAgent";
import { useToken } from "../../../context/AuthContext";
import { useTickets } from "../../../context/TicketContext";
import { patchTicketPriority, patchTicketStatus, patchTicketAsignTo } from "../../../services/ticketService";

export const TicketEditAd = ({ ticket, onClose }: {ticket: Ticket, onClose?: () => void}) => {
    const token = useToken();
    const { updateTicket, fetchTicketById } = useTickets();

    const [status, setStatus] = useState<number>(ticket.status_id);
    const [priority, setPriority] = useState<number>(ticket.priority_id);
    const [agent, setAgent] = useState<number>(ticket.assigned_to ? ticket.assigned_to : 0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSaveAll = async () => {
        if (!token) {
            setError("אתה חייב להיות מחובר");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            await Promise.all([
                patchTicketPriority(token, priority, ticket.id),
                patchTicketStatus(token, status, ticket.id),
               agent!=0&& patchTicketAsignTo(token, agent, ticket.id)
            ]);

            // Fetch the updated ticket from server to get all fields including relations
            await fetchTicketById(ticket.id);
            
            onClose && onClose();
        } catch (err) {
            setError("שגיאה בשמירת השינויים. אנא נסה שוב.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <EditPriority ticket={ticket} value={priority} onChange={setPriority}></EditPriority>
            <EditStatus ticket={ticket} value={status} onChange={setStatus}></EditStatus>
            <ChangeAgent ticket={ticket} value={agent} onChange={setAgent}></ChangeAgent>
            <Button 
                variant="contained" 
                onClick={handleSaveAll} 
                disabled={loading}
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Save />}
                fullWidth
                sx={{ mt: 2 }}
            >
                {loading ? "שומר..." : "שמור שינויים"}
            </Button>
        </>
    );
};