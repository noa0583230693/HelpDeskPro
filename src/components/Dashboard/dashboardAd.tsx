import { useUser } from "../../context/AuthContext";
import { Box, Typography, Container, Chip } from "@mui/material";
import {
  ConfirmationNumber,
  People,
  Flag,
  Label,
  Dashboard as DashboardIcon
} from "@mui/icons-material";
import { NavigationCard } from "./NavigationCard";
import "../../styles/theme.css";

export const DashboardAd: React.FC = () => {
  const { user } = useUser();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={6}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <DashboardIcon sx={{ fontSize: 48, color: "primary.main" }} />
          <Typography variant="h3" fontWeight={700}>
            שלום, {user?.name || "מנהל"}! 👋
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <Typography variant="h6" color="text.secondary">
            תפקיד:
          </Typography>
          <Chip label="מנהל מערכת" size="medium" color="error" sx={{ fontWeight: 600 }} />
        </Box>
      </Box>

      {/* Navigation Cards */}
      <Box>
        <Typography variant="h4" fontWeight={700} mb={4} textAlign="center">
          🧭 מה תרצה לנהל היום?
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)"
          }}
          gap={3}
        >
          <NavigationCard
            title="ניהול פניות"
            description="צפה ונהל את כל הפניות במערכת"
            icon={<ConfirmationNumber />}
            path="/tickets"
            color="#1976d2"
          />
          <NavigationCard
            title="ניהול משתמשים"
            description="נהל משתמשים והרשאות"
            icon={<People />}
            path="/users"
            color="#0288d1"
          />
          <NavigationCard
            title="ניהול סטטוסים"
            description="נהל סטטוסים של פניות"
            icon={<Label />}
            path="/statuses"
            color="#ed6c02"
          />
          <NavigationCard
            title="ניהול עדיפויות"
            description="נהל רמות עדיפות של פניות"
            icon={<Flag />}
            path="/priorities"
            color="#d32f2f"
          />
        </Box>
      </Box>
    </Container>
  );
};