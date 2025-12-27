import { useNavigate } from "react-router-dom";
import type { Ticket } from "../../../interface/interfaces";
import { useState } from "react";
import { TicketEditAg } from "../Agent/ticketEditAg";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@mui/material";
import {
  Comment,
  Edit,
  Close
} from "@mui/icons-material";
import "../../../styles/theme.css";
import "../../../styles/components.css";

export interface TicketActionsProps {
    ticket: Ticket;
    onClose?: () => void;
}

export const TicketActionAg = ({ ticket, onClose }: TicketActionsProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    
    const AddComment = (ticketId: number) => {
        navigate(`/ticket/${ticketId}/addComment`);
    }
    
    return (
      <Box className="flex gap-md">
        <Button
          variant="contained"
          startIcon={<Comment />}
          onClick={() => AddComment(Number(ticket.id))}
          className="btn-primary"
        >
          הוסף תגובה
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={() => setIsEditing(true)}
        >
          עדכן סטטוס
        </Button>

        <Dialog
          open={isEditing}
          onClose={() => setIsEditing(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle className="flex flex-between">
            <Box>עדכון סטטוס</Box>
            <IconButton onClick={() => setIsEditing(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TicketEditAg
              ticket={ticket}
              onClose={() => setIsEditing(false)}
            />
          </DialogContent>
        </Dialog>
      </Box>
    );
}