# 🎬 QuickShow – Movie Booking App

**QuickShow** is a modern full-stack web application that enables users to browse movies, select showtimes, reserve seats, and securely book movie tickets online. With a responsive interface, real-time seat management, and powerful admin tools, QuickShow aims to deliver a seamless cinema booking experience.

Built using React, Node.js, MongoDB, Clerk for authentication, and Inngest for workflow automation, the app combines user convenience with backend automation and real-time communication via email services like Nodemailer and Brevo.

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
- 🔍 **Browse and search** movies by genre, language, and location
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


