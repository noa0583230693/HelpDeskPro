import { useNavigate } from "react-router-dom";
import { AllPriorities } from "./allPriorities";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { Add, Flag } from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export const Priorities=()=>
{
    const navigate=useNavigate();
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
                  <Flag />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    ניהול עדיפויות
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    צפה ונהל את רמות העדיפות במערכת
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate("/addPriority")}
                className="btn-primary"
              >
                הוסף עדיפות
              </Button>
            </Box>
          </Paper>
          <AllPriorities />
        </Box>
      </Container>
    );
}