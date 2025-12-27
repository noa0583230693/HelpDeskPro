import { useState } from "react";
import { Button } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useToken } from "../../../context/AuthContext";
import { useTickets } from "../../../context/TicketContext";
import { patchTicketStatus } from "../../../services/ticketService";
import { EditStatus } from "../../status/editStatus";
import type { Ticket } from "../../../interface/interfaces";

export const TicketEditAg=({ticket, onClose }: {ticket: Ticket, onClose?: () => void})=>
{
    const [status,setStatus]=useState<number>(ticket.status_id);

    const token = useToken();
    const { updateTicket, fetchTicketById } = useTickets();
    
      const handleSaveAll = async () => {
        if (!token) return;
        await patchTicketStatus(token, status, ticket.id);
        
        // Fetch the updated ticket from server to get all fields including relations
        await fetchTicketById(ticket.id);
        
        onClose && onClose();
      };

    return<>
    <EditStatus ticket={ticket} value={status} onChange={setStatus} ></EditStatus>
    <Button 
        variant="contained" 
        onClick={handleSaveAll}
        startIcon={<Save />}
        fullWidth
        sx={{ mt: 2 }}
    >
        שמור שינויים
    </Button>
    </>
}