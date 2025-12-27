import { AllUsers } from "./allUsers";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { Add, Person } from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export const Users = () => {
    const navigate = useNavigate();

    const goToAddUser = () => {
        navigate('/addUser');
    };

    return (
      <Container maxWidth="lg" className="fade-in">
        <Box sx={{ py: 4 }}>
          <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Box className="flex flex-between">
              <Box className="flex gap-md" sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <Person />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    ניהול משתמשים
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    צפה ונהל את כל המשתמשים במערכת
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={goToAddUser}
                className="btn-primary"
              >
                הוסף משתמש
              </Button>
            </Box>
          </Paper>
          <AllUsers />
        </Box>
      </Container>
    );
};