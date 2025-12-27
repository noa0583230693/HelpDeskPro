import { useNavigate } from "react-router-dom";
import type { TicketActionsProps } from "./ticketActionAg";
import { Box, Button } from "@mui/material";
import { Comment } from "@mui/icons-material";
import "../../../styles/theme.css";
import "../../../styles/components.css";

export const TicketActionC = ({ ticket }: TicketActionsProps) => {
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
          fullWidth
          className="btn-primary"
        >
          הוסף תגובה
        </Button>
      </Box>
    );
}