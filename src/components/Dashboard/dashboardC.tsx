import { useUser } from "../../context/AuthContext";
import { Box, Typography, Container, Chip } from "@mui/material";
import {
  ConfirmationNumber,
  AddCircle,
  Dashboard as DashboardIcon
} from "@mui/icons-material";
import { NavigationCard } from "./NavigationCard";
import "../../styles/theme.css";

export const DashboardC: React.FC = () => {
  const { user } = useUser();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={6}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <DashboardIcon sx={{ fontSize: 48, color: "primary.main" }} />
          <Typography variant="h3" fontWeight={700}>
            שלום, {user?.name || "לקוח"}! 👋
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Typography variant="h6" color="text.secondary">
            תפקיד:
          </Typography>
          <Chip label="לקוח" size="medium" color="primary" sx={{ fontWeight: 600 }} />
        </Box>
      </Box>

      {/* Navigation Cards */}
      <Box>
        <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
          🧭 מה תרצה לעשות היום?
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            md: "repeat(2, 1fr)"
          }}
          gap={4}
        >
          <NavigationCard
            title="הפניות שלי"
            description="צפה וניהל את כל הפניות שפתחת למערכת התמיכה"
            icon={<ConfirmationNumber />}
            path="/tickets"
            color="#1976d2"
          />
          <NavigationCard
            title="פתח פניה חדשה"
            description="צור פניה חדשה למערכת התמיכה וקבל עזרה מהצוות שלנו"
            icon={<AddCircle />}
            path="/newTicket"
            color="#2e7d32"
          />
        </Box>
      </Box>
    </Container>
  );
};