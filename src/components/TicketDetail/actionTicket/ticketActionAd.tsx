import { useState } from "react";
import type { TicketActionsProps } from "./ticketActionAg";
import { TicketEditAd } from "../Admin/ticketEditAd";
import { deletTicket } from "../../DeletTicket/deletTicket";
import { useToken } from "../../../context/AuthContext";
import { useTickets } from "../../../context/TicketContext";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@mui/material";
import {
  Edit,
  Delete,
  Close
} from "@mui/icons-material";
import "../../../styles/theme.css";
import "../../../styles/components.css";

export const TicketActionAd = ({ ticket, onClose }: TicketActionsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const token = useToken() || "";
    const { deleteTicket: removeTicket } = useTickets();
    
    const handleDelete = async () => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק את הטיקט?')) {
            await deletTicket(token, ticket.id);
            removeTicket(ticket.id);
            onClose && onClose();
        }
    };
    
    return (
      <Box className="flex gap-md">
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => setIsEditing(true)}
          className="btn-primary"
        >
          ערוך טיקט
        </Button>
        
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={handleDelete}
        >
          מחק
        </Button>

        <Dialog
          open={isEditing}
          onClose={() => setIsEditing(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle className="flex flex-between">
            <Box>עריכת טיקט</Box>
            <IconButton onClick={() => setIsEditing(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TicketEditAd
              ticket={ticket}
              onClose={() => setIsEditing(false)}
            />
          </DialogContent>
        </Dialog>
      </Box>
    );
}