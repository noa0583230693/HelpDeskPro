import { useEffect, useState } from "react";
import { useToken } from "../../context/AuthContext";
import type { User } from "../../interface/interfaces";
import { serviceGetUsers } from "../../services/userService";
import {
  Box,
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Button
} from "@mui/material";
import {
  Person,
  Edit,
  Delete,
  Refresh,
  AdminPanelSettings,
  SupportAgent,
  PersonOutline
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export const AllUsers = () => {
    const token = useToken();
    const [allUsers, setAllUsers] = useState<Array<User>>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) {
                setError("אתה חייב להיות מחובר");
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const response = await serviceGetUsers(token);
                if (response === null) {
                    setError("שגיאה בטעינת המשתמשים מהשרת");
                } else {
                    setAllUsers(response);
                }
            } catch (err) {
                setError("שגיאה בטעינת המשתמשים");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [token]);

    const getRoleIcon = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return <AdminPanelSettings />;
            case 'agent':
                return <SupportAgent />;
            default:
                return <PersonOutline />;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'error';
            case 'agent':
                return 'warning';
            default:
                return 'info';
        }
    };

    const getRoleLabel = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'מנהל';
            case 'agent':
                return 'נציג';
            case 'customer':
                return 'לקוח';
            default:
                return role;
        }
    };

    if (loading) {
        return (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
              <CircularProgress size={60} />
              <Typography variant="h6" color="text.secondary">
                טוען משתמשים...
              </Typography>
            </Box>
          </Container>
        );
    }

    if (error) {
        return (
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Alert severity="error">{error}</Alert>
          </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <Person sx={{ fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    ניהול משתמשים
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    סה״כ {allUsers.length} משתמשים במערכת
                  </Typography>
                </Box>
              </Box>
            
            </Box>

            {/* Table */}
            {allUsers.length > 0 ? (
              <TableContainer>
                <Table className="custom-table">
                  <TableHead>
                    <TableRow className="custom-table-header">
                      <TableCell align="right" sx={{ fontWeight: 600 }}>משתמש</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>אימייל</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>תפקיד</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allUsers.map((user: User) => (
                      <TableRow key={user.id} className="custom-table-row">
                        <TableCell align="right">
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar
                              sx={{
                                bgcolor: 'primary.main',
                                width: 40,
                                height: 40
                              }}
                            >
                              {user.name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                {user.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ID: {user.id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {user.email}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            icon={getRoleIcon(user.role)}
                            label={getRoleLabel(user.role)}
                            // size={getRoleIcon(user.role)}
                            color={getRoleColor(user.role)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box textAlign="center" py={8}>
                <Person sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  לא נמצאו משתמשים במערכת
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
    );
};