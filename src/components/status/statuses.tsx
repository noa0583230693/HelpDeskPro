import { useNavigate } from "react-router-dom";
import { AllStatuses } from "./allStatuses";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { Add, Circle } from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";

export const Statuses=()=>
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
                  <Circle />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight={600}>
                    ניהול סטטוסים
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    צפה ונהל את הסטטוסים במערכת
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate("/addStatus")}
                className="btn-primary"
              >
                הוסף סטטוס
              </Button>
            </Box>
          </Paper>
          <AllStatuses />
        </Box>
      </Container>
    );
}