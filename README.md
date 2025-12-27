# 🎫 מערכת Helpdesk - Ticket Management System

מערכת מקצועית לניהול פניות ותמיכה טכנית, בנויה עם **React**, **TypeScript**, **Material-UI** ו-**Node.js**.

---

## 📋 תיאור הפרויקט

מערכת Helpdesk מלאה המאפשרת ניהול פניות לקוחות, הקצאת משימות לסוכנים, ומעקב אחר סטטוס ועדיפות של כל פנייה. המערכת כוללת ממשק משתמש מודרני ואינטואיטיבי עם ניהול משתמשים מבוסס תפקידים.

### ✨ תכונות עיקריות

- **ניהול פניות (Tickets)**: יצירה, עריכה, מחיקה וצפייה בפניות
- **מערכת תגובות**: הוספת תגובות לפניות עם מידע על המחבר
- **ניהול משתמשים**: שלושה תפקידים - לקוח, סוכן, מנהל
- **אימות והרשאות**: מערכת JWT עם בקרת גישה מבוססת תפקידים
- **ניהול סטטוסים ועדיפויות**: הגדרה דינמית של סטטוסים ועדיפויות
- **ממשק משתמש מודרני**: Material-UI עם עיצוב רספונסיבי
- **טיפול בשגיאות מתקדם**: מערכת התראות Toast והודעות שגיאה ידידותיות
- **Error Boundary**: תפיסת שגיאות React ברמת האפליקציה

---

## 🏗️ ארכיטקטורה

### Frontend Structure
```
src/
├── components/          # קומפוננטות React
│   ├── Auth/           # התחברות והרשמה
│   ├── Dashboard/      # לוח בקרה ראשי
│   ├── TicketDetail/   # פרטי פנייה
│   ├── NewTicket/      # יצירת פנייה חדשה
│   ├── Comments/       # מערכת תגובות
│   ├── Users/          # ניהול משתמשים
│   ├── priorities/     # ניהול עדיפויות
│   ├── status/         # ניהול סטטוסים
│   ├── layout/         # רכיבי פריסה
│   └── ErrorBoundary/  # טיפול בשגיאות
├── context/            # React Context (Auth, Notifications)
├── services/           # קריאות API
├── styles/             # קבצי עיצוב
├── utils/              # פונקציות עזר
└── interface/          # TypeScript interfaces

Api/helpdesk-api/       # Backend Node.js
├── src/
│   ├── controllers/    # HTTP handlers
│   ├── services/       # Business logic
│   ├── repositories/   # Data access layer
│   ├── models/         # TypeScript models
│   ├── routes/         # API routes
│   ├── middleware/     # Auth & validation
│   └── db/            # SQLite database
```

---

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js v16+ 
- npm או yarn

### התקנת Frontend

```bash
# התקנת תלויות
npm install

# הרצת שרת פיתוח
npm run dev

# בניית פרויקט לפרודקשן
npm run build

# הרצת ESLint
npm run lint
```

השרת יעלה על **http://localhost:5173**

### התקנת Backend

```bash
cd Api/helpdesk-api

# התקנת תלויות
npm install

# בניית הפרויקט
npm run build

# הרצת שרת
npm run dev
```

השרת יעלה על **http://localhost:4000**

---

## 🔐 אימות והרשאות

### תפקידי משתמשים

| תפקיד | הרשאות |
|-------|---------|
| **Customer (לקוח)** | יצירת פניות, הוספת תגובות לפניות שלו |
| **Agent (סוכן)** | צפייה והקצאת פניות, ניהול תגובות |
| **Admin (מנהל)** | גישה מלאה, ניהול משתמשים, סטטוסים ועדיפויות |

### משתמשי ברירת מחדל

| אימייל | סיסמה | תפקיד |
|--------|-------|-------|
| admin@example.com | password | admin |
| agent@example.com | password | agent |
| customer@example.com | password | customer |

---

## 📚 טכנולוגיות

### Frontend
- **React 19.2** - ספריית UI
- **TypeScript** - Type safety
- **Material-UI (MUI) 7.3** - קומפוננטות UI
- **React Router 7.11** - ניתוב
- **React Hook Form 7.68** - ניהול טפסים
- **Axios 1.13** - HTTP client
- **Vite 7.2** - Build tool
- **ESLint** - Code quality

### Backend
- **Node.js + Express** - REST API server
- **TypeScript** - Type safety
- **SQLite3** - מסד נתונים
- **JWT** - אימות
- **Swagger UI** - תיעוד API

---

## 🎨 מערכת טיפול בשגיאות

המערכת כוללת מערכת טיפול בשגיאות מתקדמת:

### תכונות
- ✅ הודעות Toast מעוצבות (הצלחה, שגיאה, אזהרה, מידע)
- ✅ Error Boundary לתפיסת שגיאות React
- ✅ הודעות שגיאה ידידותיות למשתמש
- ✅ טיפול אחיד בכל סוגי השגיאות (400, 401, 403, 404, 500)
- ✅ לוגים מפורטים למפתחים

### שימוש

```typescript
import { useNotification } from './context/NotificationContext';
import { getUserFriendlyErrorMessage } from './utils/errorHandler';

const { showSuccess, showError } = useNotification();

try {
  await serviceCreateTicket(token, data);
  showSuccess('הפנייה נוצרה בהצלחה!');
} catch (error) {
  showError(getUserFriendlyErrorMessage(error));
}
```

לפרטים נוספים ראה: [ERROR_HANDLING_GUIDE.md](./ERROR_HANDLING_GUIDE.md)

---

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - הרשמת לקוח חדש
- `POST /auth/login` - התחברות (מחזיר JWT token)
- `GET /auth/me` - פרטי משתמש מחובר

### Tickets
- `GET /tickets` - רשימת פניות
- `POST /tickets` - יצירת פנייה חדשה
- `GET /tickets/:id` - פרטי פנייה
- `PATCH /tickets/:id` - עדכון פנייה
- `DELETE /tickets/:id` - מחיקת פנייה

### Comments
- `POST /tickets/:ticketId/comments` - הוספת תגובה
- `GET /tickets/:ticketId/comments` - רשימת תגובות

### Users (Admin only)
- `GET /users` - רשימת משתמשים
- `POST /users` - יצירת משתמש
- `GET /users/:id` - פרטי משתמש

### Statuses & Priorities (Admin only)
- `GET /statuses`, `POST /statuses`
- `GET /priorities`, `POST /priorities`

תיעוד מלא: **http://localhost:4000/docs** (Swagger UI)

---

## 🗄️ מסד נתונים

### טבלאות עיקריות

**users** - משתמשים
- id, name, email, password, role, is_active, created_at

**tickets** - פניות
- id, subject, description, status_id, priority_id, created_by, assigned_to, created_at, updated_at

**comments** - תגובות
- id, ticket_id, author_id, content, created_at

**statuses** - סטטוסים
- id, name

**priorities** - עדיפויות
- id, name

מסד הנתונים נוצר אוטומטית ב-`Api/helpdesk-api/data/app.db`

---

## 🧪 בדיקות

### Postman Collection
1. ייבא את `Api/helpdesk-api/helpdesk.postman_collection.json`
2. הגדר משתנים: baseHost, basePort, token
3. הרץ בדיקות: Health Check → Register → Login → Create Ticket

### Swagger UI
גש ל-**http://localhost:4000/docs** לתיעוד אינטראקטיבי

---

## 📝 קבצי תצורה

- `vite.config.ts` - הגדרות Vite
- `tsconfig.json` - הגדרות TypeScript
- `eslint.config.js` - כללי ESLint
- `package.json` - תלויות ו-scripts

---

## 🎓 למידה והתפתחות

הפרויקט מדגים:
- ✅ ארכיטקטורה מודולרית (Frontend + Backend)
- ✅ TypeScript מתקדם עם type safety מלא
- ✅ React Hooks (useState, useEffect, useContext, Custom Hooks)
- ✅ Context API לניהול state גלובלי
- ✅ Protected Routes ובקרת גישה
- ✅ Form validation עם React Hook Form
- ✅ REST API עם Express
- ✅ JWT Authentication
- ✅ Database design (SQLite)
- ✅ Error handling מקצועי

---

## ⚠️ הערות חשובות

1. **סיסמאות**: המערכת משתמשת בסיסמאות פשוטות ללמידה. בפרודקשן השתמש ב-bcrypt!
2. **JWT Secret**: שנה את ה-secret בפרודקשן דרך משתנה סביבה
3. **CORS**: הוסף הגדרות CORS אם הפרונטאנד והבקאנד על שרתים שונים

---

## 📄 רישיון

פרויקט לימודי - ללא רישיון ספציפי

---

**בהצלחה! 🚀**
