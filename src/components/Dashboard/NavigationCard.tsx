import { Card, CardContent, Typography, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface NavigationCardProps {
  title: string;
  description?: string;
  icon: ReactNode;
  path: string;
  color?: string;
}

export const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  icon,
  path,
  color = "#1976d2"
}) => {
  const navigate = useNavigate();

  return (
    <Card
      elevation={3}
      onClick={() => navigate(path)}
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: `2px solid ${color}22`,
        height: "100%",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: 8,
          borderColor: color,
          bgcolor: `${color}08`
        }
      }}
    >
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          py={4}
        >
          <Box
            sx={{
              fontSize: 80,
              color: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1) rotate(5deg)"
              }
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            color="text.primary"
            sx={{ mt: 1 }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ px: 2 }}
            >
              {description}
            </Typography>
          )}
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ color: color, mt: 2 }}
          >
            <Typography variant="body1" fontWeight={600}>
              לחץ כאן
            </Typography>
            <ArrowBack sx={{ fontSize: 24 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
