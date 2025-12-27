import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button
} from "@mui/material";
import {
  Comment as CommentIcon,
  Person,
  AccessTime,
  AddComment
} from "@mui/icons-material";
import "../../styles/theme.css";
import "../../styles/components.css";
import type { comment } from "../../interface/interfaces";

export const ShowComments=({comments}: {comments: comment[]})=>
{
  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <CommentIcon color="primary" sx={{ fontSize: 28 }} />
        <Typography variant="h5" fontWeight={600}>
          תגובות
        </Typography>
        <Chip
          label={comments?.length || 0}
          size="small"
          color="primary"
          sx={{ ml: 1 }}
        />
      </Box>

      {comments && comments.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {comments.map((comment, index) => (
            <Card
              key={index}
              elevation={2}
              sx={{
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateX(-4px)'
                }
              }}
            >
              <CardContent>
                <Box display="flex" gap={2} mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: `hsl(${(index * 137) % 360}, 70%, 50%)`,
                      width: 40,
                      height: 40
                    }}
                  >
                    <Person />
                  </Avatar>
                  <Box flex={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        תגובה  {index + 1}  
                         מאת {comment.author_name || "משתמש אנונימי"}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                          {new Date().toLocaleDateString('he-IL')}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
                      {comment.content || "אין תוכן זמין"}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Card elevation={1} sx={{ bgcolor: 'action.hover', textAlign: 'center', py: 4 }}>
          <CommentIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            אין תגובות לטיקט זה
          </Typography>
         
           
        </Card>
      )}
    </Box>
  );
}