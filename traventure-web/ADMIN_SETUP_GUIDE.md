# 🚀 Traventure Admin Features - Setup & Running Guide

## 📋 Admin Credentials

**Email:** `admin@example.com`  
**Password:** Any password (no password validation required)

Once you login with these credentials, you'll be automatically redirected to the admin dashboard.

---

## ✨ Admin Features Overview

### 1. **Admin Dashboard**
- Overview statistics (total users, bookings, revenue, average rating)
- Recent bookings table with status tracking
- Quick access to all management sections

### 2. **Manage Users**
- View all registered users with roles (Admin, Guide, User)
- See user details (email, join date, status)
- Delete users (protected - admin user cannot be deleted)

### 3. **Manage Hotels**
- View all hotels with ratings and availability
- **Add Hotels**: Enter name, city, number of rooms, price per night, and rating
- Delete hotels
- Manage hotel details

### 4. **Manage Rooms**
- View all hotel rooms with details
- **Add Rooms**: Specify room number, hotel, type (Single/Double/Suite/Deluxe), capacity, and price
- Delete rooms
- Track room availability status

### 5. **Manage Flights**
- View all flights with complete details
- **Add Flights**: Enter airline, routes, departure/arrival times, duration, price, and available seats
- Delete flights
- Manage flight availability

### 6. **Manage Guides**
- View all tour guides with ratings and earnings
- **Add Guides**: Enter guide name, city, focus area, and initial rating
- Delete guides
- Track bookings and earnings

### 7. **Manage Bookings**
- View all customer bookings across all services
- **Change Status**: 
  - Mark pending bookings as completed
  - Cancel any booking
- Track booking types (Hotel, Flight, Guide)

### 8. **Manage Payments/Bills**
- View payment history with status
- **Track Revenue**:
  - Total completed payments
  - Pending payments
  - Refunded amounts
- **Process Payments**:
  - Complete pending payments
  - Refund completed payments

### 9. **Manage Reviews**
- View all customer reviews
- **Average Rating** displayed at top
- **Pending Reviews**: Publish or reject new reviews
- **Published Reviews**: Delete reviews
- See review details, ratings, dates, and items reviewed

---

## 🎯 How to Run Manually

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- Git (optional, if cloning)

### **Step 1: Navigate to Project Directory**

```bash
cd d:\Shreya\TRAVENTURE\traventure-web
```

### **Step 2: Install Dependencies**

```bash
npm install
```

(This installs all required packages from package.json)

### **Step 3: Run Development Server**

```bash
npm run dev
```

This will:
- Start the Next.js development server
- Display output like: "Local: http://localhost:3000"
- The app is ready when you see no errors

### **Step 4: Open in Browser**

Navigate to: `http://localhost:3000`

You should see the Traventure homepage with:
- Navigation links (Hotels, Flights, Guides)
- Login/Register buttons

### **Step 5: Login as Admin**

1. Click **"Login"** button
2. Enter Email: `admin@example.com`
3. Enter Password: (any password)
4. Click **"Submit"**

You'll be redirected to `/admin` - the Admin Dashboard!

---

## 📂 Project Structure

```
traventure-web/
├── app/
│   ├── admin/
│   │   ├── layout.js              # Admin layout wrapper
│   │   ├── page.js                # Dashboard
│   │   ├── users/page.js          # User management
│   │   ├── hotels/page.js         # Hotel management
│   │   ├── rooms/page.js          # Room management
│   │   ├── flights/page.js        # Flight management
│   │   ├── guides/page.js         # Guide management
│   │   ├── bookings/page.js       # Booking management
│   │   ├── payments/page.js       # Payment management
│   │   └── reviews/page.js        # Review management
│   ├── components/
│   │   ├── AdminShell.jsx         # Admin UI wrapper (NEW)
│   │   ├── AuthContext.jsx        # Updated with admin role
│   │   ├── AuthGateway.jsx        # Updated with admin routing
│   │   └── ... (other components)
│   └── ... (other pages)
├── package.json
├── next.config.mjs
└── ... (config files)
```

---

## 🔑 Key Features of Admin Dashboard

### **Sidebar Navigation**
- Fixed sidebar on desktop (responsive mobile drawer)
- Quick links to all admin sections
- Active section highlighting
- Sign Out button at bottom

### **Add/Delete Functionality**
- **Hotels, Rooms, Flights, Guides**: Full add and delete capability
- Forms validate input before adding
- Immediate table updates
- Success feedback on actions

### **Status Management**
- **Bookings**: Change status (Pending → Completed → Cancelled)
- **Payments**: Process pending and refund completed
- **Reviews**: Publish pending or reject

### **Analytics**
- Dashboard shows key metrics
- Revenue tracking across payments
- Review ratings calculation
- Real-time stats updates

---

## 🔐 Authentication Flow

```
User Login (admin@example.com)
    ↓
AuthContext checks email
    ↓
Detected as Admin (role = 'admin')
    ↓
AuthGateway routes to /admin
    ↓
AdminShell verifies admin role
    ↓
Access to Admin Dashboard granted
```

### User Roles:
- **user** - Regular users (access: dashboard, booking)
- **guide** - Tour guides (access: guide dashboard)
- **admin** - Admins (access: admin dashboard) → Use email: `admin@example.com`

---

## 💾 Data Storage

- **Session Storage**: All data stored in browser's localStorage
- **Local State Management**: Using React hooks (useState)
- **Persistence**: Data persists during session
- **Reset**: Data resets on page refresh (no database backend)

---

## 🚨 Troubleshooting

### **Issue: Can't find npm command**
**Solution**: Install Node.js from https://nodejs.org/

### **Issue: Port 3000 already in use**
**Solution**: Run on different port:
```bash
npm run dev -- -p 3001
```

### **Issue: Admin page shows "Access Denied"**
**Solution**: Ensure you're logged in with `admin@example.com`

### **Issue: Changes not saving**
**Solution**: Data is in-memory only. It resets on refresh. This is expected for a UI demo.

### **Issue: Styling issues**
**Solution**: Clear browser cache (Ctrl+Shift+Delete) or use incognito mode

---

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation visible
- **Tablet**: Collapsible sidebar with menu button
- **Mobile**: Drawer-style navigation

---

## 🎨 UI Features

- **Dark Theme**: Modern dark interface with accent colors
- **Smooth Transitions**: Hover effects and loading states
- **Data Tables**: Scrollable tables with status badges
- **Form Validation**: Input validation before submission
- **Status Indicators**: Color-coded status badges (green/yellow/red)
- **Icons**: SVG icons for better UX

---

## ⚙️ Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run linter with fixes
npm run lint -- --fix
```

---

## 🔗 Quick Links

- **Home**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/admin
- **Admin Users**: http://localhost:3000/admin/users
- **Admin Hotels**: http://localhost:3000/admin/hotels
- **Admin Flights**: http://localhost:3000/admin/flights
- **Admin Guides**: http://localhost:3000/admin/guides
- **Admin Bookings**: http://localhost:3000/admin/bookings
- **Admin Payments**: http://localhost:3000/admin/payments
- **Admin Reviews**: http://localhost:3000/admin/reviews

---

## 📝 Testing the Features

### **Test Hotel Management**
1. Go to Admin → Hotels
2. Click "+ Add Hotel"
3. Fill in details (e.g., "Test Hotel", "NYC", 50 rooms, $200)
4. Click "Add Hotel" 
5. See it appear in the table
6. Click "Delete" to remove it

### **Test Booking Management**
1. Go to Admin → Bookings
2. Click "Complete" on pending bookings
3. Click "Cancel" on active bookings
4. See status change in real-time

### **Test Payment Processing**
1. Go to Admin → Payments
2. See revenue summary at top
3. Click "Complete" on pending payments
4. Click "Refund" on completed payments
5. Watch the summary stats update

---

## 💡 Tips & Tricks

- Use the sidebar navigation to quickly jump between sections
- Try adding multiple items to test table scrolling
- Test the mobile view (F12 → Toggle Device Toolbar)
- Bookmarks the admin URL for quick access
- All changes are real-time in the UI

---

## 🎉 You're All Set!

Your Traventure admin dashboard is ready to use. Start the dev server and begin managing your travel platform!

**Command to start**: 
```bash
npm run dev
```

Then navigate to `http://localhost:3000` and login with `admin@example.com`!
