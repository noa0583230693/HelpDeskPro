import { useEffect, useState } from "react";
import type { User, Ticket } from "../../interface/interfaces";
import { useToken } from "../../context/AuthContext";
import { serviceGetUsers } from "../../services/userService";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Box,
  InputAdornment,
  Avatar,
  Typography
} from "@mui/material";
import { SupportAgent } from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export interface ChangeAgentProps {
    ticket: Ticket;
    onChange?: (num: number) => void;
    value?: number;
}

export const ChangeAgent = ({ ticket, onChange, value }: ChangeAgentProps) => {
    const token = useToken();
    const [allAgents, setAllAgents] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgents = async () => {
            if (!token) {
                setError("אתה חייב להיות מחובר");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const res = await serviceGetUsers(token);
                setAllAgents(res.filter((user: User) => user.role === "agent"));
            } catch (err) {
                setError("שגיאה בטעינת הסוכנים");
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, [token, ticket]);

    const sortedAgents = allAgents
        ? [
            allAgents.find(p => p.id === ticket.assigned_to),
            ...allAgents.filter(p => p.id !== ticket.assigned_to)
        ].filter(Boolean) as User[]
        : [];

    if (error) {
        return (
          <Alert severity="error" className="mb-md">
            {error}
          </Alert>
        );
    }

    return (
        <Box>
          <FormControl fullWidth>
            <InputLabel>שיבוץ לנציג</InputLabel>
            <Select
              value={value !== undefined ? value : ticket.assigned_to || ''}
              onChange={(e) => onChange && onChange(Number(e.target.value))}
              disabled={loading}
              label="שיבוץ לנציג"
              startAdornment={
                <InputAdornment position="start">
                  {loading ? <CircularProgress size={20} /> : <SupportAgent color="action" />}
                </InputAdornment>
              }
            >
              {sortedAgents?.map(agent => (
                <MenuItem key={agent.id} value={agent.id}>
                  <Box className="flex gap-sm" sx={{ alignItems: 'center' }}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
                      {agent.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2">{agent.name}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
    );
};

