import axios, { AxiosError } from 'axios';

// סוגי שגיאות מותאמים אישית
export class AppError extends Error {
  code?: string;
  statusCode?: number;
  details?: any;

  constructor(
    message: string,
    code?: string,
    statusCode?: number,
    details?: any
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// ממשק לשגיאת שרת
interface ServerErrorResponse {
  message?: string;
  error?: string;
  details?: any;
  statusCode?: number;
}

// פונקציה להמרת שגיאות Axios לשגיאות ידידותיות למשתמש
export const handleApiError = (error: unknown): AppError => {
  // אם זו שגיאת Axios
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ServerErrorResponse>;
    
    // שגיאת רשת (אין חיבור לשרת)
    if (!axiosError.response) {
      return new AppError(
        'אין חיבור לשרת. אנא בדוק את החיבור לאינטרנט ונסה שוב.',
        'NETWORK_ERROR',
        0
      );
    }

    const { status, data } = axiosError.response;
    const serverMessage = data?.message || data?.error;

    // טיפול בשגיאות לפי סטטוס
    switch (status) {
      case 400:
        return new AppError(
          serverMessage || 'הנתונים שהוזנו אינם תקינים. אנא בדוק ונסה שוב.',
          'BAD_REQUEST',
          400,
          data?.details
        );
      
      case 401:
        return new AppError(
          serverMessage || 'פרטי ההתחברות שגויים. אנא נסה שוב.',
          'UNAUTHORIZED',
          401
        );
      
      case 403:
        return new AppError(
          'אין לך הרשאה לבצע פעולה זו.',
          'FORBIDDEN',
          403
        );
      
      case 404:
        return new AppError(
          serverMessage || 'המשאב המבוקש לא נמצא.',
          'NOT_FOUND',
          404
        );
      
      case 409:
        return new AppError(
          serverMessage || 'הנתונים כבר קיימים במערכת.',
          'CONFLICT',
          409
        );
      
      case 422:
        return new AppError(
          serverMessage || 'הנתונים שהוזנו אינם עומדים בדרישות.',
          'VALIDATION_ERROR',
          422,
          data?.details
        );
      
      case 500:
        return new AppError(
          'שגיאת שרת פנימית. אנא נסה שוב מאוחר יותר.',
          'SERVER_ERROR',
          500
        );
      
      case 503:
        return new AppError(
          'השרת אינו זמין כרגע. אנא נסה שוב מאוחר יותר.',
          'SERVICE_UNAVAILABLE',
          503
        );
      
      default:
        return new AppError(
          serverMessage || `שגיאה לא צפויה (${status}). אנא נסה שוב.`,
          'UNKNOWN_ERROR',
          status
        );
    }
  }

  // שגיאה כללית
  if (error instanceof Error) {
    return new AppError(
      error.message || 'אירעה שגיאה לא צפויה. אנא נסה שוב.',
      'GENERAL_ERROR'
    );
  }

  // שגיאה לא ידועה
  return new AppError(
    'אירעה שגיאה לא צפויה. אנא נסה שוב.',
    'UNKNOWN_ERROR'
  );
};

// פונקציה לקבלת הודעת שגיאה ידידותית למשתמש
export const getUserFriendlyErrorMessage = (error: unknown): string => {
  const appError = handleApiError(error);
  return appError.message;
};

// פונקציה לבדיקה אם השגיאה היא שגיאת אימות
export const isAuthError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return error.response?.status === 401;
  }
  return false;
};

// פונקציה לבדיקה אם השגיאה היא שגיאת רשת
export const isNetworkError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    return !error.response;
  }
  return false;
};

// פונקציה ללוג שגיאות (ניתן להרחיב לשליחה לשרת לוגים)
export const logError = (error: unknown, context?: string): void => {
  const appError = handleApiError(error);
  
  console.error('=== Error Log ===');
  if (context) console.error('Context:', context);
  console.error('Message:', appError.message);
  console.error('Code:', appError.code);
  console.error('Status:', appError.statusCode);
  if (appError.details) console.error('Details:', appError.details);
  console.error('Original Error:', error);
  console.error('================');
};
