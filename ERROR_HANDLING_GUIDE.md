# מדריך טיפול בשגיאות - Error Handling Guide

## 📋 סקירה כללית

המערכת כוללת כעת מערכת טיפול בשגיאות מקצועית ואחידה שמספקת למשתמש חוויה טובה יותר בעת שגיאות.

## 🎯 מה שונה?

### לפני:
- ❌ שגיאות הוחזרו כ-`null` או `undefined`
- ❌ המשתמש לא ראה הודעות ברורות
- ❌ לא היה טיפול אחיד בשגיאות
- ❌ רק `console.error` ללא פרטים למשתמש

### אחרי:
- ✅ כל השגיאות נזרקות (throw) עם הודעות ברורות
- ✅ המשתמש רואה הודעות Toast מעוצבות
- ✅ טיפול אחיד בכל סוגי השגיאות
- ✅ הודעות ספציפיות לפי סוג השגיאה (401, 404, 500, וכו')

---

## 🛠️ רכיבי המערכת

### 1. **Error Handler Utilities** (`utils/errorHandler.ts`)

פונקציות עזר לטיפול בשגיאות:

```typescript
import { handleApiError, getUserFriendlyErrorMessage, logError } from '../utils/errorHandler';

// המרת שגיאה לשגיאה ידידותית
const appError = handleApiError(error);

// קבלת הודעה למשתמש
const message = getUserFriendlyErrorMessage(error);

// לוג שגיאה עם קונטקסט
logError(error, 'functionName');
```

### 2. **Notification Context** (`context/NotificationContext.tsx`)

מערכת התראות Toast:

```typescript
import { useNotification } from '../context/NotificationContext';

const { showSuccess, showError, showWarning, showInfo } = useNotification();

// הצגת הודעות
showSuccess('הפעולה הצליחה!');
showError('אירעה שגיאה');
showWarning('אזהרה');
showInfo('מידע');
```

### 3. **Error Boundary** (`components/ErrorBoundary/ErrorBoundary.tsx`)

תופס שגיאות React שלא נתפסו:

```typescript
// כבר מוטמע ב-App.tsx
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

### 4. **Updated Services** (`services/services.tsx`)

כל הפונקציות מטפלות בשגיאות:

```typescript
// לפני:
catch(error) {
    console.error("Error:", error);
    return null;
}

// אחרי:
catch(error) {
    logError(error, 'serviceName');
    throw handleApiError(error);
}
```

---

## 📝 איך להשתמש בקומפוננטות

### דוגמה מלאה - טופס עם טיפול בשגיאות:

```typescript
import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { getUserFriendlyErrorMessage } from '../utils/errorHandler';
import { serviceCreateTicket } from '../services/services';

export const MyComponent = () => {
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError } = useNotification();
    const authContext = useContext(AuthContext);
    const token = authContext?.token;

    const handleSubmit = async (data) => {
        try {
            setLoading(true);
            
            // קריאה לשרת
            const result = await serviceCreateTicket(token, data);
            
            // הצלחה
            showSuccess('הטיקט נוצר בהצלחה!');
            navigate('/tickets');
            
        } catch (error) {
            // טיפול בשגיאה
            const errorMessage = getUserFriendlyErrorMessage(error);
            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* ... */}
            <Button 
                type="submit" 
                disabled={loading}
            >
                {loading ? 'שולח...' : 'שלח'}
            </Button>
        </form>
    );
};
```

---

## 🎨 סוגי שגיאות והודעות

המערכת מזהה אוטומטית את סוג השגיאה ומציגה הודעה מתאימה:

| קוד שגיאה | הודעה למשתמש |
|-----------|--------------|
| **400** | הנתונים שהוזנו אינם תקינים |
| **401** | פרטי ההתחברות שגויים |
| **403** | אין לך הרשאה לבצע פעולה זו |
| **404** | המשאב המבוקש לא נמצא |
| **409** | הנתונים כבר קיימים במערכת |
| **422** | הנתונים שהוזנו אינם עומדים בדרישות |
| **500** | שגיאת שרת פנימית |
| **503** | השרת אינו זמין כרגע |
| **Network** | אין חיבור לשרת |

---

## 🔄 עדכון קומפוננטות קיימות

### צעדים לעדכון קומפוננטה:

1. **הוסף imports:**
```typescript
import { useNotification } from '../context/NotificationContext';
import { getUserFriendlyErrorMessage } from '../utils/errorHandler';
```

2. **הוסף את ה-hook:**
```typescript
const { showSuccess, showError } = useNotification();
```

3. **עדכן את ה-try-catch:**
```typescript
// לפני:
catch (error) {
    setError("שגיאה כללית");
}

// אחרי:
catch (error) {
    const errorMessage = getUserFriendlyErrorMessage(error);
    showError(errorMessage);
}
```

4. **הוסף הודעת הצלחה:**
```typescript
showSuccess('הפעולה הושלמה בהצלחה!');
```

---

## ✅ Best Practices

### ✔️ כן:
- השתמש ב-`getUserFriendlyErrorMessage` לקבלת הודעות
- הצג הודעות הצלחה למשתמש
- השתמש ב-`loading` state בזמן קריאות לשרת
- השבת כפתורים בזמן טעינה

### ❌ לא:
- לא להחזיר `null` בשגיאות
- לא להשתמש ב-`console.error` בלבד
- לא להציג הודעות טכניות למשתמש
- לא לשכוח את ה-`finally` block

---

## 🎯 דוגמאות נוספות

### קריאה לשרת עם Loading State:

```typescript
const [loading, setLoading] = useState(false);
const { showSuccess, showError } = useNotification();

const fetchData = async () => {
    try {
        setLoading(true);
        const data = await serviceGetTickets(token);
        setTickets(data);
    } catch (error) {
        showError(getUserFriendlyErrorMessage(error));
    } finally {
        setLoading(false);
    }
};
```

### טיפול בשגיאות ספציפיות:

```typescript
import { isAuthError, isNetworkError } from '../utils/errorHandler';

try {
    await serviceLogin(credentials);
} catch (error) {
    if (isAuthError(error)) {
        showError('שם משתמש או סיסמה שגויים');
    } else if (isNetworkError(error)) {
        showError('אין חיבור לאינטרנט');
    } else {
        showError(getUserFriendlyErrorMessage(error));
    }
}
```

---

## 🚀 מה המשתמש רואה עכשיו?

### בעת שגיאה:
1. **Toast Notification** - הודעה צפה בראש המסך עם הסבר ברור
2. **Alert בטופס** - אם יש שגיאה ספציפית בשדה
3. **הודעה ידידותית** - לא הודעות טכניות

### בעת הצלחה:
1. **Toast Success** - הודעת הצלחה ירוקה
2. **ניווט אוטומטי** - לדף הבא
3. **Feedback ויזואלי** - המשתמש יודע שהפעולה הצליחה

---

## 📊 סיכום

המערכת החדשה מספקת:
- ✅ חוויית משתמש משופרת
- ✅ הודעות שגיאה ברורות
- ✅ טיפול אחיד בכל האפליקציה
- ✅ קוד נקי וקריא יותר
- ✅ debugging קל יותר

כל הקומפוננטות החדשות צריכות להשתמש במערכת זו!
