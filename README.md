# FreelanHub - Micro Tasking & Earning Platform

**Live Site:** [micro-work-marketplase.web.app](https://micro-work-marketplase.web.app/)

 

FreelanHub is a dynamic, full-stack micro-tasking platform built with the MERN stack. Inspired by platforms like Picoworkers and Clickworker, it enables users to earn coins by completing tasks, while buyers can post and manage paid tasks. Admins maintain overall platform functionality and user integrity.

## 🚀 Features

- 🔐 **Multi-Role Authentication**: Role-based login and registration (Worker, Buyer, Admin) with JWT-secured APIs.
- 💼 **Role-Based Dashboards**: Unique dashboards for each role with real-time statistics and task management.
- 💸 **Coin-Based Payment System**: Coin rewards for workers and Stripe-based coin purchase system for buyers.
- 📤 **Task Creation & Submission**: Buyers can create tasks with images, workers can submit tasks with proof.
- 📥 **Submission Review**: Buyers can approve/reject submissions, triggering coin changes and notifications.
- 🔄 **Withdrawal System**: Workers can withdraw coins as real money via bKash, Rocket, Nagad.
- 📬 **Notification System**: Realtime pop-up notifications for submissions, approvals, and withdrawals.
- 📈 **Admin Panel**: Manage users, roles, withdrawals, and platform-wide data with full control.
- 🧾 **My Submission Pagination**: Paginated task submissions for worker dashboard.
- 🖼️ **Image Upload with imgBB**: Upload task images and user profile pictures via imgBB API.
- 🌐 **Join as Developer Button**: Directs users to the client-side GitHub repository.
- 📱 **Fully Responsive Design**: Seamless experience across mobile, tablet, and desktop devices.
- ⚠️ **Secure Routing**: Private routes persist login after page reload using Firebase & JWT.
- 🛡️ **Middleware Authorization**: Role-based access protection for all private routes (401, 403 handling).
- 📊 **Statistics Tracking**: Admins and users see detailed task counts, coin balances, and payment summaries.
- 🧮 **Business Logic for Earnings**: Buyer buys 10 coins for $1; worker withdraws 20 coins for $1 (platform profit).
- 📦 **MongoDB Integration**: All users, tasks, submissions, coins, and withdrawal data stored in MongoDB.
- 🔐 **Environment Secured**: Firebase, MongoDB, and Stripe keys hidden via `.env` variables.
- ❌ **No Lorem Ipsum Used**: All content is meaningful and purpose-driven.
- 🔁 **Persistent Auth**: Auth state is preserved on page reload for all private routes.

## 🔧 Tech Stack

**Frontend:** React.js, Tailwind CSS, Firebase Auth, Framer Motion, HeroIcons  
**Backend:** Node.js, Express.js, MongoDB, JWT  
**Tools/APIs:** Firebase, Stripe, imgBB, Axios, React Hook Form, Swiper, React Responsive Carousel  
**Deployment:** Firebase (Client), Vercel (Server)

---




