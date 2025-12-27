import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  Button
} from "@mui/material";
import type { Ticket } from "../../interface/interfaces"
import { useNavigate } from "react-router-dom"
import {
  Add,
  Visibility,
  ConfirmationNumber as TicketIcon,
  Flag,
  Circle,
  Schedule,
  Inbox
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";
import "../../styles/tickets.css";
import {  useTicketsList } from "../../context/TicketContext";

//
export const ShowTicketsCMini=()=>
{
  const tickets=useTicketsList().tickets;

    const navigate=useNavigate();
 
const newTicket=()=>
{
    // פונקציית יצירת טיקט חדש
    navigate('/newTicket');
}

const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('פתוח') || statusLower.includes('open')) return 'primary';
    if (statusLower.includes('בטיפול') || statusLower.includes('progress')) return 'warning';
    if (statusLower.includes('סגור') || statusLower.includes('closed')) return 'success';
    return 'default';
};

const getPriorityColor = (priority: string) => {
    const priorityLower = priority?.toLowerCase() || '';
    if (priorityLower.includes('גבוה') || priorityLower.includes('high')) return 'error';
    if (priorityLower.includes('בינוני') || priorityLower.includes('medium')) return 'warning';
    if (priorityLower.includes('נמוך') || priorityLower.includes('low')) return 'success';
    return 'default';
};

const getPriorityClass = (priority: string) => {
    const priorityLower = priority?.toLowerCase() || '';
    if (priorityLower.includes('גבוה') || priorityLower.includes('high')) return 'priority-high';
    if (priorityLower.includes('בינוני') || priorityLower.includes('medium')) return 'priority-medium';
    return 'priority-low';
};

    return (
      <Box>
        <Box className="flex flex-between mb-lg">
          <Typography variant="h5" fontWeight={600} className="tickets-title">
            <TicketIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            הטיקטים שלי ({tickets.length})
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={newTicket}
            className="btn-primary"
          >
            טיקט חדש
          </Button>
        </Box>

        {tickets.length > 0 ? (
          <Box className="tickets-grid">
            {tickets.map((ticket: Ticket) => (
              <Card
                key={ticket.id}
                className={`ticket-card ${getPriorityClass(ticket.priority_name)} fade-in`}
                elevation={3}
              >
                <CardContent>
                  <Box className="ticket-card-header">
                    <Chip
                      icon={<TicketIcon />}
                      label={`#${ticket.id}`}
                      size="small"
                      color="primary"
                      className="ticket-id-badge"
                    />
                    <Chip
                      icon={<Flag />}
                      label={ticket.priority_name || "רגיל"}
                      size="small"
                      color={getPriorityColor(ticket.priority_name) as any}
                    />
                  </Box>

                  <Typography variant="h6" className="ticket-title" gutterBottom>
                    {ticket.subject}
                  </Typography>

                  <Box className="ticket-meta mb-md">
                    <Box className="ticket-meta-item">
                      <Circle sx={{ fontSize: 12 }} />
                      <Chip
                        label={ticket.status_name}
                        size="small"
                        color={getStatusColor(ticket.status_name) as any}
                      />
                    </Box>
                    <Box className="ticket-meta-item">
                      <Schedule sx={{ fontSize: 16 }} />
                      <Typography variant="caption">
                        {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString('he-IL') : 'לא ידוע'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="ticket-footer">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => navigate(`/ticket/${ticket.id}`)}
                      fullWidth
                    >
                      פרטים מלאים
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <Box className="tickets-container">
            <Paper className="empty-tickets" elevation={3}>
              <Inbox className="empty-icon" />
              <Typography variant="h5" className="empty-title">
                אין טיקטים להצגה
              </Typography>
              <Typography variant="body2" className="empty-message">
                כרגע אין טיקטים במערכת. צור טיקט חדש כדי להתחיל!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                onClick={newTicket}
                sx={{ mt: 3 }}
              >
                צור טיקט ראשון
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    );
}