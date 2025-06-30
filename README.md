# 🎬 QuickShow – Movie Booking App

**QuickShow** is a modern full-stack web application that enables users to browse movies, select showtimes, reserve seats, and securely book movie tickets online. With a responsive interface, real-time seat management, and powerful admin tools, QuickShow aims to deliver a seamless cinema booking experience.

Built using React, Node.js, MongoDB, Clerk for authentication, and Inngest for workflow automation, the app combines user convenience with backend automation and real-time communication via email services like Nodemailer and Brevo.

---
## 🌍 Live Deployment

| Layer     | URL                                                                 |
|-----------|----------------------------------------------------------------------|
| 🎥 Frontend | [QuickShow Frontend (Vercel)](https://movie-booking-app-frontend-xi.vercel.app) |
| 🔧 Backend  | [QuickShow Backend (Vercel)](https://movie-booking-app-ochre.vercel.app)        |

---

## 📖 Description

QuickShow simplifies the movie booking process by allowing users to explore available movies, choose showtimes, and book seats through a highly interactive and intuitive interface. Administrators can manage movies, schedules, and users via a dedicated dashboard.

The platform includes intelligent features such as:
- Real-time seat selection
- Email-based booking confirmation
- Show notifications
- Temporary seat reservation for failed payments
- Personalized experience through the ability to favorite movies

QuickShow simulates a real-world online cinema ticketing system with production-ready tools and architecture, making it a great portfolio piece and base for future expansion.

---

## 🚀 Features

### 👤 User Features
- 📅 **View showtimes** with live availability
- 🪑 **Interactive seat selection** with real-time updates
- 💳 **Secure booking and payment** flow
- 📧 **Receive email confirmations** after successful bookings
- 📩 **Get notified via email** when new shows are added
- ⏳ **Auto-reserve seat for 10 minutes** after failed payments (auto-cancellation after timeout)
- ❤️ **Mark movies as favorites** for quick access and booking later
- 📄 **View and manage bookings** and favorite movies

### 🛠️ Admin Features
- 🎞 **Add, update, or remove movies** and showtimes
- 📊 **View bookings and user analytics**
- 📬 **Trigger email notifications** for newly added shows
- ⏱ **Automated cleanup** of unpaid bookings using Inngest workflows
- 🔐 **Access control** via Clerk-based authentication (admin vs user)

---
## 🧰 Tech Stack (Detailed)

| Layer            | Technology            | Purpose                                                                 |
|------------------|------------------------|-------------------------------------------------------------------------|
| **Frontend**     | React.js               | Building interactive UI components                                      |
|                  | Tailwind CSS           | Utility-first CSS framework for styling                                |
|                  | Shadcn/UI              | UI components built on Tailwind and Radix                              |
|                  | React Icons            | Icon support for UI                                                     |
|                  | Axios                  | API requests to backend                                                 |
| **Backend**      | Node.js + Express.js   | Server and API handling                                                 |
| **Database**     | MongoDB                | Storing users, movies, bookings, and schedules                         |
| **Authentication** | Clerk.dev           | User sign-up, login, session handling, and access control              |
| **Workflow Automation** | Inngest        | Background jobs and event-based workflows (e.g., cancel unpaid bookings after 10 mins) |
| **Email Notifications** | Nodemailer + Brevo (Sendinblue SMTP) | Send confirmation emails, new show alerts, and automated booking updates |
| **Email Provider** | [Brevo (Sendinblue)](https://www.brevo.com) | SMTP-based email delivery with free tier and dashboard support         |
| **Environment Variables** | dotenv       | Managing secrets like Mongo URI, SMTP keys, Clerk keys, etc.           |
| **Deployment**   | Vercel                 | Hosting backend API (Node.js + Express)                                |
|                  | Netlify / Vercel       | Hosting frontend (React)                                               |

---
## 🔄 Application Workflow (Summary)

### 🎟️ Movie Booking
- User logs in, selects movie, showtime, and seats.
- Booking is created with `pending` status; seats held for 10 minutes.
- If payment succeeds → booking confirmed + email sent.
- If payment fails → Inngest auto-deletes booking after 10 minutes.

### ✉️ Email Notifications
- Confirmation email sent after successful booking.
- Users get notified via email when new shows are added by admin.

### 🛠️ Admin Actions
- Admin adds/updates/deletes movies and shows.
- Admin dashboard shows booking stats and triggers user notifications.

### ❤️ Favorites
- Users can mark movies as favorites.
- Favorite list shown on dashboard for easy access and alerts.

### ⏱ Auto Cleanup (Inngest)
- Unpaid bookings auto-deleted after 10 minutes using Inngest workflows.


