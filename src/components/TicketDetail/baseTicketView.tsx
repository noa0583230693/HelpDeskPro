import type { Ticket } from "../../interface/interfaces";
import { ShowComments } from "../Comments/showComments";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Avatar,
  Card,
  CardContent
} from "@mui/material";
import {
  ConfirmationNumber,
  Flag,
  Circle,
  Person,
  Schedule,
  Update,
  Description
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";
import "../../styles/tickets.css";

export const BaseTicketView=({ticket}: {ticket: Ticket})=>
{
    const getStatusColor = (status: string) => {
        const statusLower = status?.toLowerCase() || '';
        if (statusLower.includes('סגור') || statusLower.includes('closed')) return 'success';
        if (statusLower.includes('בטיפול') || statusLower.includes('progress')) return 'warning';
        if (statusLower.includes('פתוח') || statusLower.includes('open')) return 'primary';
        return 'default';
    };

    const getPriorityColor = (priority: string) => {
        const priorityLower = priority?.toLowerCase() || '';
        if (priorityLower.includes('גבוה') || priorityLower.includes('high') || priorityLower.includes('urgent')) return 'error';
        if (priorityLower.includes('בינוני') || priorityLower.includes('medium')) return 'warning';
        if (priorityLower.includes('נמוך') || priorityLower.includes('low')) return 'success';
        return 'default';
    };

    return (
        <Box>
            {/* Header */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1976d2 0%, #115293 100%)',
                    color: 'white',
                    p: 4
                }}
            >
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                        <ConfirmationNumber sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Box flex={1}>
                        <Typography variant="overline" sx={{ opacity: 0.9 }}>
                            טיקט #{ticket.id}
                        </Typography>
                        <Typography variant="h4" fontWeight={600}>
                            {ticket?.subject}
                        </Typography>
                    </Box>
                </Box>
                
                <Box display="flex" gap={1} flexWrap="wrap">
                    <Chip
                        icon={<Circle />}
                        label={ticket?.status_name}
                        color={getStatusColor(ticket?.status_name) as any}
                        sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
                    />
                    <Chip
                        icon={<Flag />}
                        label={ticket?.priority_name}
                        color={getPriorityColor(ticket?.priority_name) as any}
                        sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 600 }}
                    />
                </Box>
            </Box>

            {/* Details */}
            <Box sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Description Card */}
                    <Box>
                        <Card elevation={0} sx={{ bgcolor: 'action.hover' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <Description color="primary" />
                                    <Typography variant="h6" fontWeight={600}>
                                        תיאור הבעיה
                                    </Typography>
                                </Box>
                                <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {ticket?.description || "אין תיאור זמין"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Info Cards */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                        <Card elevation={1}>
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <Schedule color="action" />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        תאריך יצירה
                                    </Typography>
                                </Box>
                                <Typography variant="h6" fontWeight={600}>
                                    {ticket?.created_at ? new Date(ticket.created_at).toLocaleDateString('he-IL', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'לא ידוע'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                        <Card elevation={1}>
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={1} mb={1}>
                                    <Update color="action" />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        עדכון אחרון
                                    </Typography>
                                </Box>
                                <Typography variant="h6" fontWeight={600}>
                                    {ticket?.updated_at ? new Date(ticket.updated_at).toLocaleDateString('he-IL', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'לא ידוע'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {ticket?.assigned_to_name && (
                        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                            <Card elevation={1}>
                                <CardContent>
                                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                                        <Person color="action" />
                                        <Typography variant="subtitle2" color="text.secondary">
                                            משובץ ל
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                                            {ticket.assigned_to_name.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Typography variant="h6" fontWeight={600}>
                                            {ticket.assigned_to_name}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />
                {/* Comments Section */}
                <ShowComments comments={ticket.comments || []} />
            </Box>
        </Box>
    );
}
