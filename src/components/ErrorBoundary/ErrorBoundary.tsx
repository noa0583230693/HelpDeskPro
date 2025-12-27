import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Container, Paper, Typography, Button } from '@mui/material';
import { Error as ErrorIcon, Refresh, Home } from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            p: 3,
          }}
        >
          <Container maxWidth="md">
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'error.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <ErrorIcon sx={{ fontSize: 48, color: 'white' }} />
              </Box>

              <Typography variant="h4" gutterBottom fontWeight={600}>
                אופס! משהו השתבש 😔
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                אירעה שגיאה בלתי צפויה באפליקציה. אנחנו מצטערים על אי הנוחות.
              </Typography>

              {import.meta.env.MODE === 'development' && this.state.error && (
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: 'grey.100',
                    borderRadius: 2,
                    textAlign: 'left',
                    direction: 'ltr',
                    maxHeight: '200px',
                    overflow: 'auto',
                  }}
                >
                  <Typography variant="caption" component="pre" sx={{ fontSize: '0.75rem' }}>
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </Typography>
                </Box>
              )}

              <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<Refresh />}
                  onClick={this.handleReset}
                  size="large"
                >
                  נסה שוב
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Home />}
                  onClick={this.handleGoHome}
                  size="large"
                >
                  חזור לדף הבית
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}
