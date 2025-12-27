import { useUser } from "../../context/AuthContext";
import { Box, Typography, Container, Chip } from "@mui/material";
import {
  ConfirmationNumber,
  Dashboard as DashboardIcon
} from "@mui/icons-material";
import { NavigationCard } from "./NavigationCard";
import "../../styles/theme.css";

export const DashboardAg: React.FC = () => {
  const { user } = useUser();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={6}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <DashboardIcon sx={{ fontSize: 48, color: "primary.main" }} />
          <Typography variant="h3" fontWeight={700}>
            שלום, {user?.name || "נציג"}! 👋
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Typography variant="h6" color="text.secondary">
            תפקיד:
          </Typography>
          <Chip label="נציג תמיכה" size="medium" color="warning" sx={{ fontWeight: 600 }} />
        </Box>
      </Box>
  
      {/* Navigation Cards */}
      <Box>
        <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
          🧭 מה תרצה לעשות היום?
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
        >
          <Box sx={{ maxWidth: 500, width: "100%" }}>
            <NavigationCard
              title="כל הפניות"
              description="צפה ונהל את כל הפניות במערכת וטפל בלקוחות"
              icon={<ConfirmationNumber />}
              path="/tickets"
              color="#1976d2"
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
