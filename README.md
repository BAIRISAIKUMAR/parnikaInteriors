# 🏠 Parnika Interiors – MERN Stack Web Application

**Interior Design Business Website**
📍 Borabanda, Hyderabad | 📞 9959534928 | ✉️ mohanrao6172@gmail.com
Serving: Andhra Pradesh & Telangana

---

## 📁 Folder Structure

```
parnika-interiors/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB Atlas connection
│   ├── controllers/
│   │   ├── authController.js      # Register, Login, GetMe
│   │   ├── designController.js    # CRUD for designs
│   │   └── enquiryController.js   # CRUD for enquiries
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT protect + adminOnly
│   ├── models/
│   │   ├── User.js                # name, email, password, role
│   │   ├── Design.js              # title, category, price, images, description
│   │   └── Enquiry.js             # name, phone, message, designId, status
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── designRoutes.js
│   │   └── enquiryRoutes.js
│   ├── utils/
│   │   └── seedAdmin.js           # Auto-create admin from .env on startup
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # Express entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── api/
    │   │   └── index.js           # Axios instance + all API functions
    │   ├── components/
    │   │   ├── Navbar.js / .css
    │   │   ├── Footer.js / .css
    │   │   └── WhatsAppButton.js / .css
    │   ├── context/
    │   │   └── AuthContext.js     # Global auth state (React Context)
    │   ├── pages/
    │   │   ├── Home.js / .css
    │   │   ├── About.js / .css
    │   │   ├── Services.js / .css
    │   │   ├── Designs.js / .css  # Gallery + category filter + enquiry modal
    │   │   ├── Contact.js / .css
    │   │   ├── Login.js / .css    # Login + Register tabs
    │   │   └── Admin.js / .css    # Admin dashboard (designs + enquiries)
    │   ├── App.js                 # React Router setup
    │   ├── index.js
    │   └── index.css              # Global styles + CSS variables
    ├── .env.example
    └── package.json
```

---

## ⚙️ Setup Instructions

### Step 1 – MongoDB Atlas
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new cluster (free tier is fine)
3. Create a database user with username & password
4. Click **Connect → Connect your application** and copy the connection string
5. Replace `<password>` in the URI with your actual password

### Step 2 – Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your actual values:

```env
PORT=5000
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/parnika_interiors?retryWrites=true&w=majority
JWT_SECRET=choose_a_long_random_secret_key
ADMIN_EMAIL=bairisaikumar143@gmail.com
ADMIN_PASSWORD=Saikumar@8978
```

Start the backend:
```bash
npm run dev       # development (nodemon)
npm start         # production
```

✅ On first startup, the admin user is automatically created from your `.env` values.

### Step 3 – Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register user |
| POST | `/api/auth/login` | Public | Login |
| GET | `/api/auth/me` | Private | Get logged-in user |

### Designs
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/designs` | Public | Get all designs (filter: ?category=Bedroom) |
| GET | `/api/designs/:id` | Public | Get single design |
| POST | `/api/designs` | Admin | Create design |
| PUT | `/api/designs/:id` | Admin | Update design |
| DELETE | `/api/designs/:id` | Admin | Delete design |

### Enquiries
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/enquiries` | Public | Submit enquiry |
| GET | `/api/enquiries` | Admin | View all enquiries |
| PUT | `/api/enquiries/:id` | Admin | Update status |
| DELETE | `/api/enquiries/:id` | Admin | Delete enquiry |

---

## 🗄️ Database Collections

### Users
```json
{ "name": "string", "email": "string", "password": "hashed", "role": "admin|user" }
```

### Designs
```json
{
  "title": "string",
  "category": "Living Room | Bedroom | Kitchen | Bathroom | Office | Exterior | Other",
  "price": "number",
  "images": ["url1", "url2"],
  "description": "string",
  "featured": "boolean"
}
```

### Enquiries
```json
{ "name": "string", "email": "string", "phone": "string", "message": "string", "designId": "ObjectId|null", "status": "new|read|replied" }
```

---

## 🚀 Production Deployment

### Backend – Render / Railway
1. Push `backend/` to a GitHub repo
2. Create a Web Service on [render.com](https://render.com)
3. Set environment variables in the dashboard
4. Build command: `npm install` | Start command: `node server.js`

### Frontend – Vercel / Netlify
1. Push `frontend/` to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set `REACT_APP_API_URL` to your deployed backend URL
4. Build command: `npm run build` | Output: `build`

---

## 💡 Features Summary

- ✅ JWT Authentication (Login / Register)
- ✅ Role-based access (Admin / User)
- ✅ Admin auto-seeded from environment variables
- ✅ bcrypt password hashing
- ✅ Design gallery with category filter
- ✅ Enquiry modal on design cards
- ✅ Contact form → saves to DB
- ✅ Admin panel: Add/Edit/Delete designs
- ✅ Admin panel: View/Update/Delete enquiries
- ✅ WhatsApp floating button
- ✅ Mobile responsive
- ✅ MVC architecture
- ✅ Dotenv configuration

---

## 📞 Business Contact

- **WhatsApp**: [Click to Chat](https://wa.me/919959534928?text=Hello%20I%20am%20interested%20in%20your%20interior%20services)
- **Phone**: 9959534928
- **Email**: mohanrao6172@gmail.com
- **Location**: Borabanda, Hyderabad
