# URL Shortener

A full-stack web application that allows users to shorten URLs, manage their links, and view analytics. Built with a modern tech stack featuring Node.js/Express backend and React/Vite frontend.

## 🚀 Features

### Core Functionality
- **URL Shortening**: Convert long URLs into short, shareable links
- **Link Management**: Full CRUD operations for managing your shortened URLs
- **User Authentication**: Secure registration and login system
- **Analytics Dashboard**: View click statistics and link performance
- **Link Redirection**: Fast and reliable URL redirection service

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Dashboard**: Manage all your links from a centralized interface
- **Multiple View Options**: View links in both card and table formats
- **Real-time Updates**: Instant feedback on link operations

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database (SQL)

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **React Context** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 📁 Project Structure

```
url-shortener/
├── backend/
│   ├── index.js                 # Express server entry point
│   ├── package.json             # Backend dependencies
│   ├── config/
│   │   └── db.js               # Database connection
│   ├── controller/
│   │   └── user_controller.js  # User logic handlers
│   ├── routes/
│   │   └── routes.js           # API endpoints
│   └── services/
│       └── user.js             # Business logic
├── frontend/
│   ├── index.html              # Main HTML file
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   └── src/
│       ├── App.jsx             # Main App component
│       ├── App.css             # App styles
│       ├── index.css           # Global styles
│       ├── main.jsx            # React entry point
│       ├── globalVar.js        # Global constants
│       ├── assets/             # Static assets
│       ├── components/         # React components
│       │   ├── Dashboard/      # User dashboard
│       │   ├── HomePage/       # Landing page
│       │   ├── LinksCard/      # Link card display
│       │   ├── LinksTable/     # Link table display
│       │   ├── LinksPage/      # Links management
│       │   ├── Login/          # Authentication
│       │   └── Navbar/         # Navigation
│       ├── contexts/
│       │   └── AuthContext.jsx # Authentication context
│       └── services/
│           └── UrlServices.js  # API service calls
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/urlshortener
JWT_SECRET=your_jwt_secret_here
BASE_URL=http://localhost:5000
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 🏃 Running the Application

#### Development Mode

1. **Start the backend server:**
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

2. **Start the frontend development server:**
```bash
cd frontend
npm run dev
```

3. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`

#### Production Mode

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **Start the production server:**
```bash
cd backend
npm run start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### URL Operations
- `POST /api/urls` - Create shortened URL
- `GET /api/urls` - Get user's URLs
- `GET /api/urls/:id` - Get specific URL details
- `PUT /api/urls/:id` - Update URL
- `DELETE /api/urls/:id` - Delete URL
- `GET /:shortCode` - Redirect to original URL

### Analytics
- `GET /api/urls/:id/analytics` - Get URL analytics
- `GET /api/dashboard/stats` - Get dashboard statistics

## 🎨 Components Overview

### Frontend Components

- **HomePage**: Landing page with URL shortening interface
- **Dashboard**: User dashboard showing link statistics and management
- **LinksPage**: Comprehensive link management interface
- **LinksTable**: Tabular view of user's shortened links
- **LinksCard**: Card-based view of links
- **Login**: Authentication interface
- **Navbar**: Navigation component with user menu

### Backend Architecture

- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic and data processing
- **Routes**: API endpoint definitions
- **Config**: Database and application configuration

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage on the client side
- Protected routes require valid JWT tokens
- Automatic token refresh on API calls
- Secure password hashing with bcrypt

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### URL Model
```javascript
{
  _id: ObjectId,
  originalUrl: String,
  shortCode: String,
  userId: ObjectId,
  clicks: Number,
  createdAt: Date,
  updatedAt: Date,
  expiresAt: Date (optional)
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Known Issues

- Rate limiting not implemented
- Custom short codes not supported yet
- Bulk operations not available

## 🚀 Future Enhancements

- [ ] QR code generation for shortened URLs
- [ ] Custom short code creation
- [ ] Bulk URL operations
- [ ] Advanced analytics with charts
- [ ] Rate limiting and abuse prevention
- [ ] URL expiration settings
- [ ] Social media integration

## 🙏 Acknowledgments

- Thanks to all contributors who have helped improve this project
- Built with love using open-source technologies

---

**Happy URL Shortening! 🔗**