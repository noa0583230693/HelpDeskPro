import { useEffect, useState } from "react";
import type { Status, Ticket } from "../../interface/interfaces";
import { useToken } from "../../context/AuthContext";
import { serviceGetPriorities } from "../../services/priorityService";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Box,
  InputAdornment
} from "@mui/material";
import { Flag } from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export interface EditComponentProps {
    ticket: Ticket;
    onChange?: (num: number) => void;
    value?: number;
}

export const EditPriority = ({ ticket, onChange, value }: EditComponentProps) => {
    const token = useToken();
    const [allPriorities, setAllPriorities] = useState<Status[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPriorities = async () => {
            if (!token) {
                setError("אתה חייב להיות מחובר");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const priorities = await serviceGetPriorities(token);
                setAllPriorities(priorities);
            } catch (err) {
                setError("שגיאה בטעינת העדיפויות");
            } finally {
                setLoading(false);
            }
        };

        fetchPriorities();
    }, [token, ticket]);

    const sortedPriorities = allPriorities
        ? [
            allPriorities.find(p => p.id === ticket.priority_id),
            ...allPriorities.filter(p => p.id !== ticket.priority_id)
        ].filter(Boolean) as Status[]
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
            <InputLabel>עדיפות</InputLabel>
            <Select
              value={value !== undefined ? value : ticket.priority_id || ''}
              onChange={(e) => onChange && onChange(Number(e.target.value))}
              disabled={loading}
              label="עדיפות"
              startAdornment={
                <InputAdornment position="start">
                  {loading ? <CircularProgress size={20} /> : <Flag color="action" />}
                </InputAdornment>
              }
            >
              {sortedPriorities?.map(priority => (
                <MenuItem key={priority.id} value={priority.id}>
                  {priority.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
    );
};
