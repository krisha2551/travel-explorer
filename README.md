# 🌍 Travel Explorer

A modern and responsive travel booking web application built with React, Vite, Firebase Authentication, and React Router. Travel Explorer allows users to discover destinations, view trip details, securely authenticate, book trips, and manage their bookings through an intuitive user interface.

![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Live Demo

🔗 travel-explorer-nine-opal.vercel.app

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- Firebase Authentication
- Secure User Sessions
- Protected Routes
- Logout Functionality

### 🌎 Travel Exploration
- Browse Available Travel Packages
- View Detailed Trip Information
- Responsive Destination Cards
- Dynamic Route Navigation

### 📅 Booking System
- Book Travel Packages
- User-Friendly Booking Form
- Form Validation
- Manage Personal Bookings

### 👤 User Dashboard
- View User Profile
- Access Booking History
- Personalized Experience

### 🎨 Responsive Design
- Mobile Friendly Interface
- CSS Modules Styling
- Modern Navigation Bar
- Reusable UI Components

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- CSS Modules

### Authentication
- Firebase Authentication

### State Management
- React Context API

### Deployment
- Firebase Hosting / Vercel / Netlify

---

## 📂 Project Structure

```bash
Travel-Explorer/
│
├── public/
│   ├── images/
│   └── travel-logo.png
│
├── src/
│   │
│   ├── components/
│   │   │
│   │   ├── auth/
│   │   │   ├── Auth.jsx
│   │   │   └── Auth.module.css
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Trips.jsx
│   │   │   ├── TripDetail.jsx
│   │   │   ├── BookingsForm.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Error.jsx
│   │   │
│   │   └── ui/
│   │       ├── Navbar.jsx
│   │       ├── Footer.jsx
│   │       └── About.jsx
│   │
│   ├── data/
│   │   └── tripsData.js
│   │
│   ├── firebase/
│   │   └── config.js
│   │
│   ├── routes/
│   │   ├── MainLayout.jsx
│   │   └── ProtectedRoutes.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── firebase.json
├── package.json
├── vite.config.js
└── README.md
```

---

## 📸 Screenshots

### Home Page

![Home](./public/screenshots/home.png)

### Trips Page

![Trips](./public/screenshots/trips.png)

### Trip Details Page

![Trip Details](./public/screenshots/trip-details.png)

### Booking Form

![Booking Form](./public/screenshots/booking-form.png)

### User Profile

![Profile](./public/screenshots/profile.png)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/krisha2551/travel-explorer.git
```

### 2. Navigate to the Project Folder

```bash
cd travel-explorer
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Application will run at:

```bash
http://localhost:5173
```

---

## 🔥 Firebase Setup

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📌 Key Learning Outcomes

- React Component Architecture
- React Router Navigation
- Firebase Authentication
- Protected Routes
- Context API State Management
- Modular CSS Styling
- Responsive Web Design
- Project Structure Organization

---

## 🚀 Future Enhancements

- Search & Filter Trips
- Payment Gateway Integration
- Wishlist Feature
- User Reviews & Ratings
- Admin Dashboard
- Booking Cancellation System
- Backend API Integration
- Dark Mode Support

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to the branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

