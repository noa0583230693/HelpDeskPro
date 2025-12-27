import type { Ticket } from "../../interface/interfaces";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTickets } from "../../context/TicketContext";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  Tooltip
} from "@mui/material";
import {
  ConfirmationNumber as TicketIcon,
  Visibility,
  Schedule,
  Person,
  Flag,
  Refresh,
  Delete
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";
import "../../styles/tickets.css";
import { deletTicket } from "../DeletTicket/deletTicket";

export const ShowTicketsMiniAgAd = () => {
  const navigate = useNavigate();
  const { token, isAdmin } = useAuth();
  const tokenStr = token || "";
  const { tickets,refreshTickets, deleteTicket: removeTicket } = useTickets();

  const handleStatusChange = async () => {
    await refreshTickets();
  };

  const handleDelete = async (ticketId: number) => {
    await deletTicket(tokenStr, ticketId);
    removeTicket(ticketId);
  };

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('פתוח') || statusLower.includes('open')) return 'primary';
    if (statusLower.includes('בטיפול') || statusLower.includes('progress')) return 'warning';
    if (statusLower.includes('סגור') || statusLower.includes('closed')) return 'success';
    return 'default';
  };

  const getPriorityColor = (priority: string) => {
    const priorityLower = priority?.toLowerCase() || '';
    if (priorityLower.includes('גבוה') || priorityLower.includes('high') || priorityLower.includes('urgent')) return 'error';
    if (priorityLower.includes('בינוני') || priorityLower.includes('medium') || priorityLower.includes('normal')) return 'warning';
    if (priorityLower.includes('נמוך') || priorityLower.includes('low')) return 'success';
    return 'default';
  };

  const getPriorityClass = (priority: string) => {
    const priorityLower = priority?.toLowerCase() || '';
    if (priorityLower.includes('גבוה') || priorityLower.includes('high') || priorityLower.includes('urgent')) return 'priority-high';
    if (priorityLower.includes('בינוני') || priorityLower.includes('medium') || priorityLower.includes('normal')) return 'priority-medium';
    return 'priority-low';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          רשימת טיקטים ({tickets.length})
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={refreshTickets}
        >
          רענן
        </Button>
      </Box>

      {tickets && tickets.length > 0 ? (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }} className="tickets-grid">
          {tickets.map((ticket: Ticket) => (
            <Box key={ticket.id} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(33.333% - 16px)' } }}>
              <Card 
                className={`ticket-card ${getPriorityClass(ticket.priority_name)}`}
                elevation={3}
              >
                <CardContent>
                  {/* Header */}
                  <Box className="ticket-card-header">
                    <Chip 
                      icon={<TicketIcon />}
                      label={`#${ticket.id}`}
                      size="small"
                      color="primary"
                    />
                    <Chip 
                      icon={<Flag />}
                      label={ticket.priority_name || "רגיל"}
                      size="small"
                      color={getPriorityColor(ticket.priority_name) as any}
                    />
                  </Box>

                  {/* Title */}
                  <Typography 
                    variant="h6" 
                    className="ticket-title"
                    gutterBottom
                  >
                    {ticket.subject || "ללא כותרת"}
                  </Typography>

                  {/* Description */}
                  <Typography 
                    variant="body2" 
                    className="ticket-description"
                    color="text.secondary"
                  >
                    {ticket.description || "אין תיאור זמין"}
                  </Typography>

                  {/* Meta */}
                  <Box className="ticket-meta">
                    <Box className="ticket-meta-item">
                      <Schedule fontSize="small" />
                      <Typography variant="caption">
                        {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString('he-IL') : 'תאריך לא ידוע'}
                      </Typography>
                    </Box>
                    {ticket.assigned_to && (
                      <Box className="ticket-meta-item">
                        <Person fontSize="small" />
                        <Typography variant="caption">
                          משובץ ל: {ticket.assigned_to_name}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Footer */}
                  <Box className="ticket-footer">
                    <Chip 
                      label={ticket.status_name || "לא ידוע"}
                      size="small"
                      color={getStatusColor(ticket.status_name) as any}
                      onClick={handleStatusChange}
                      clickable
                    />
                    
                    <Box className="ticket-actions-btn">
                      <Tooltip title="עוד פרטים">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => navigate(`/ticket/${ticket.id}`)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      {isAdmin && (
                        <Tooltip title="מחק">
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDelete(ticket.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        <Box className="empty-tickets">
          <Typography variant="h6" color="text.secondary">
            אין כרגע טיקטים
          </Typography>
        </Box>
      )}
    </Box>
  );
};