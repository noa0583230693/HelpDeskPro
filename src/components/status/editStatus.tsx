import { useEffect, useState } from "react";
import type { Status, Ticket } from "../../interface/interfaces";
import { useToken } from "../../context/AuthContext";
import { serviceGetStatus } from "../../services/statusService";
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
import { Circle } from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export interface EditComponentProps {
    ticket: Ticket;
    onChange?: (num: number) => void;
    value?: number;
}

export const EditStatus = ({ ticket, onChange, value }: EditComponentProps) => {
    const token = useToken();
    const [allStatus, setAllStatus] = useState<Status[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            if (!token) {
                setError("אתה חייב להיות מחובר");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const statuses = await serviceGetStatus(token);
                setAllStatus(statuses);
            } catch (err) {
                setError("שגיאה בטעינת הסטטוסים");
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [token, ticket]);

    const sortedStatus = allStatus
        ? [
            allStatus.find(s => s.id === ticket.status_id),
            ...allStatus.filter(s => s.id !== ticket.status_id)
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
            <InputLabel>סטטוס</InputLabel>
            <Select
              value={value !== undefined ? value : ticket.status_id || ''}
              onChange={(e) => onChange && onChange(Number(e.target.value))}
              disabled={loading}
              label="סטטוס"
              startAdornment={
                <InputAdornment position="start">
                  {loading ? <CircularProgress size={20} /> : <Circle color="action" />}
                </InputAdornment>
              }
            >
              {sortedStatus?.map(status => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
    );
};


