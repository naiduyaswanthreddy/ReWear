# 👗♻️ ReWear - Community Clothing Exchange

**ReWear** is a sustainable fashion platform enabling users to swap or redeem clothing using a point-based system. Built for eco-conscious communities, ReWear promotes the reuse of fashion through direct swaps, points, and donations — reducing textile waste and creating a circular wardrobe economy.

🌱 _Swap clothes. Earn points. Save the planet._

---

## 🌐 Live Demo

🚀 [ReWear Live Site](https://rewear-demo.vercel.app)  
🔐 Demo Admin Login:  
Email: admin@rewear.com  
Password: SecurePass123!

---

## 🛠️ Tech Stack

### Frontend
- React (via CDN)
- Tailwind CSS (via CDN)
- JSX with Babel (via CDN)
- Swiper.js (carousel), FontAwesome, Framer Motion
- PWA-enabled, responsive, and WCAG 2.1 accessible

### Backend
- Node.js + Express.js
- MongoDB Atlas (Mongoose ODM)
- Cloudinary (Image Uploads)
- JWT Auth (stored in localStorage)
- bcrypt for password hashing
- Socket.io (for real-time swap events)

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- File Storage: Cloudinary

---

## 📦 Folder Structure

ReWear/
├── client/ # Frontend (React via CDN, Tailwind CSS)
│ ├── index.html
│ ├── app.js
│ └── components/
├── server/ # Backend (Node.js, Express, MongoDB)
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── controllers/
│ └── server.js
├── README.md
└── .env # Environment variables (not committed)

yaml
Copy
Edit

---

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rewear.git
cd rewear
2. Install Backend Dependencies
bash
Copy
Edit
cd server
npm install
3. Create .env File
Inside server/, create a .env with the following:

ini
Copy
Edit
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
4. Run Backend Server
bash
Copy
Edit
npm start
Server runs on http://localhost:5000

5. Launch Frontend
Open client/index.html in your browser (served as a static CDN-based React SPA).

🧪 Seed Sample Data
Run the following to insert demo users, items, and swaps:

bash
Copy
Edit
node seed.js
This creates:

👤 5 demo users

👕 10 sample clothing items

🔁 3 completed swaps

👑 1 admin (admin@rewear.com / SecurePass123!)

✨ Features
👚 Landing Page
Mission-focused intro

Hero with video background

Featured items carousel

CTAs: Swap, Browse, List

🔐 User Authentication
JWT email/password signup/login

Secure password hashing via bcrypt

🧑‍💼 User Dashboard
View profile, points, badges

Track swaps, redeem history

Edit account settings

Sustainability impact tracker

📦 Item Listing & Detail View
Upload items (5 image max via Cloudinary)

Rich description, category, size, condition

Swap or Redeem with points

Image gallery w/ zoom & carousel

🔄 Swap System
Propose/accept/cancel swaps

Earn 20 points per completed swap

Redeem items for 50 points

Notifications & alerts

🧮 Points & Badges
100 points on signup

Badges for achievements (Eco Warrior, Trendsetter)

Visual reward system

🎉 Bonus Features
🧠 AI-powered recommendations

🌿 Sustainability tracker (CO2 & water saved)

🧥 Virtual try-on (AR-lite using Fabric.js)

🔁 Live swap events with chat (Socket.io)

🤝 Community Swap Circles

🎁 Donate items to charity for bonus points

⚙️ Admin Panel
Moderate item submissions

Manage users & listings

Approve/reject swaps

Send platform-wide announcements

Dashboard with site stats

📱 Mobile Optimized & Accessible
Fully responsive layout (Tailwind CSS)

WCAG 2.1 AA compliant

Dark mode toggle

Keyboard navigation & screen reader support

🔒 Security
JWT auth & route protection

bcrypt-hashed passwords

Input sanitization & validation

Secure image uploads (Cloudinary whitelisting)

⚡ Performance & Optimization
Lazy loading images

CDN-hosted static assets

Cloudinary compression

Optimized Lighthouse score

PWA installable on mobile

🧪 Tests
bash
Copy
Edit
npm test
Includes:

Auth logic unit tests

Swap system validation

API route testing (Jest + Supertest)

📈 Sustainability Formula (used in Dashboard)
js
Copy
Edit
CO2 Saved = 2.7kg * swapsCompleted
Water Saved = 2700L * swapsCompleted
Badge examples:

Eco Warrior: 5 swaps

Green Pioneer: 20kg CO2 saved

Trendsetter: 10 items listed

💡 Future Improvements
Stripe donations for sustainability orgs

Odoo CRM & Inventory integration

AI outfit matching

In-app messaging system

Geo-based swaps

📸 Screenshots
(Include screenshots of landing page, dashboard, item detail, admin panel, swap modal, sustainability tracker, etc.)

🙌 Contributing
PRs welcome! Fork the repo, make your changes, and submit a pull request. See CONTRIBUTING.md for guidelines.

📝 License
MIT © 2025 ReWear Team

🏁 Credits
Built with 💚 by the ReWear Hackathon Team

Fonts: Inter, Playfair Display

Icons: FontAwesome

Images: Unsplash

Cloud Services: MongoDB Atlas, Cloudinary, Render, Vercel
