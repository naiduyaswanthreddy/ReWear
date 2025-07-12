# ♻️ ReWear - Community Clothing Exchange 👗🌱

**ReWear** is a sustainable, community-driven clothing exchange platform that promotes eco-conscious fashion through direct swaps and a point-based redemption system. Built for impact, ReWear reduces textile waste, gamifies the eco-journey, and brings like-minded fashion recyclers together.

🚀 Built for Hackathons | 💚 Eco-friendly | ⚡ Real-time Swaps | 🧠 AI-Powered

---

## 🌐 Live Demo
> 🔗 [https://rewear-app.vercel.app](https://rewear-app.vercel.app) (Frontend - Vercel)  
> 🔗 [https://rewear-api.onrender.com](https://rewear-api.onrender.com) (Backend - Render)

> 🛠 Admin Credentials:  
> 📧 `admin@rewear.com`  
> 🔐 `SecurePass123!`

---

## 📸 Mockup Inspiration
Design follows this Excalidraw:  
🔗 [ReWear UI Mockup](https://app.excalidraw.com/l/65VNwvy7c4X/zEqG7IJrg0)

---

## 🧰 Tech Stack

| Layer        | Technologies                                                                 |
|--------------|------------------------------------------------------------------------------|
| Frontend     | React (via CDN), JSX, Tailwind CSS (CDN), Babel (if needed), Swiper.js       |
| Backend      | Node.js, Express.js                                                          |
| Database     | MongoDB Atlas                                                                |
| Auth         | JWT (Email & Password), Bcrypt                                               |
| File Upload  | Cloudinary (for item image uploads)                                          |
| Realtime     | Socket.io (for live swap events)                                             |
| PWA          | Workbox, `manifest.json`, service worker                                     |
| Deployment   | Frontend on Vercel, Backend on Render                                        |

---

## 🖥 Features

### 🌍 Landing Page
- Eco-themed hero section with video background
- CTAs: Start Swapping / Browse Items / List Item
- Sustainability Impact Stats
- Featured Items carousel (auto-scroll/manual)

### 👤 User Authentication
- Signup/Login (JWT-based)
- Passwords hashed via bcrypt
- Session stored in localStorage

### 🏠 User Dashboard
- Profile (username, email, edit option)
- Points balance (earn/redeem system)
- Uploaded items (status: available/swapped)
- Swap history (pending/completed)
- Sustainability Impact Tracker
- Earn Badges for achievements

### 🧺 Item Management
- **Browse Items**: Filter by category/size/condition; search by tags
- **Add Item**: Upload up to 5 images, fill description, dropdowns & tags
- **Item Detail Page**: Carousel gallery, uploader info, request swap/redeem via points
- **Virtual Try-On**: Upload selfie or use avatar (2D overlay with Fabric.js)

### 🔄 Swap System
- Propose direct swaps with own items
- Redeem with 50 points
- Accept/Reject swaps from dashboard
- Earn 20 points per successful swap
- Cancel pending requests anytime

### 🛡️ Admin Panel
- Approve/Reject pending items
- View/Delete any item
- Platform-wide announcements
- View dashboard metrics: users, items, swaps
- Seeded admin user (see credentials above)

### 🎉 Community & Events
- Create/Join Swap Circles (e.g., “Vintage Vibes”)
- Group-based private swaps
- Host live swap events with real-time updates & chat

### 🧠 AI-Powered Recommendations
- Suggested items based on tags & swap history

### ❤️ Charity Integration
- Donate items for points
- Display platform donation impact

---

## 🔧 Setup Instructions

### 🔑 Environment Variables

**Frontend (`/client`)**

No special `.env` needed (React via CDN). Just open `index.html` or deploy via Vercel.

**Backend (`/server`)**

Create a `.env` file:
```env
PORT=5000
MONGO_URI=mongodb+srv://<your-cluster>.mongodb.net/rewear
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 🔌 Installation

```bash
# Backend Setup
cd server
npm install
npm start

# Frontend (if using local dev tools)
cd client
npm install
npm run dev
```

---

## 🧪 Testing & Security

- Unit tests included for auth & swap logic (`/tests`)
- API routes protected via JWT
- XSS-safe input validation
- MongoDB indexing on tags, categories for fast filtering

---

## 🧪 Sample Data

Seeded in `/server/seed.js`:
- ✅ 10 Items (varied types: tops, jeans, dresses)
- 👤 5 Users (with points & uploads)
- 🔄 3 Completed swaps
- 🛡 1 Admin

---

## 📲 PWA Features
- Installable with icon on mobile
- Offline caching for Browse & Landing
- Manifest + Service Worker enabled

---

## ♿ Accessibility (WCAG 2.1)

- ARIA labels on all buttons
- Semantic HTML5 structure
- Keyboard navigable components
- Color contrast verified (4.5:1 minimum)

---

## 🌿 Eco Design System

| Element     | Color Code       |
|-------------|------------------|
| Primary     | `#2E7D32` (Forest Green) |
| Background  | `#F5F5F5` (Soft White)   |
| Accent      | `#FFCA28` (Mustard)      |
| Dark Mode   | `#1A3C34` (Dark Green)   |

Typography:  
- **Headings**: `Playfair Display`  
- **Body**: `Inter`  

---

## 🏆 Badges & Gamification

- 🎖 Eco Warrior – 5 Swaps  
- 🌟 Trendsetter – 10 Items Listed  
- 🌱 Green Pioneer – 20 kg CO₂ Saved  

---

## 📊 Sustainability Tracker

> “You’ve saved 13.5 kg CO₂ and 13,500L water by swapping 5 items!”

Based on:
- 1 shirt = ~2.7kg CO₂, 2,700L water
- Backend calculates on every successful swap

---

## 🧠 AI Recommendations

- Items suggested based on tag similarity and user preferences
- Simple rule-based filtering for demo (e.g., "You liked cotton → try this cotton top")

---

## 📡 Real-time Swap Events

- Live events via Socket.io
- Users browse items, chat, and swap in real-time
- Hosted under “Swap Events” tab in Dashboard

---

## ❤️ Contribution

This project was built in 36 hours for a hackathon challenge to promote sustainability, community, and innovation.

> Made with 💚 by Team ReWear

---

## 📄 License

MIT License – Free to use, modify, and contribute.

---

## ✨ Pitch Tips (for Hackathon)

- Emphasize **eco-impact**: “13.5 kg CO2 saved is like skipping a 50km drive!”
- Mention **Odoo integration**: Future plan to plug into inventory/eCommerce.
- Demo Flow: `Signup → List Item → Try-On → Request Swap → Approve via Admin → See CO2 Saved → Earn Badge`
