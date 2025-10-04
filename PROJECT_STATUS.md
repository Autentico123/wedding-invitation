# Wedding Invitation - Production Setup

## ✅ Project Status: FULLY WORKING

Your wedding invitation website is now fully functional and deployed on Vercel!

**Live URL**: https://wedding-invitation-five-gray.vercel.app

---

## 🎯 Features Working

### Frontend
- ✅ Beautiful animated wedding invitation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Interactive RSVP form with validation
- ✅ Smooth animations with Framer Motion
- ✅ Toast notifications for user feedback

### Backend (API)
- ✅ RSVP submission endpoint (`/api/submit`)
- ✅ Email notifications to couple
- ✅ Confirmation emails to guests
- ✅ Health check endpoint (`/api/health`)
- ✅ Environment check endpoint (`/api/check-env`) - for diagnostics

### Email Integration
- ✅ Gmail SMTP using nodemailer
- ✅ Beautiful HTML email templates
- ✅ Automatic confirmation emails
- ✅ RSVP notifications to couple

---

## 📁 Project Structure

```
wedding-invitation/
├── api/                      # Vercel Serverless Functions
│   ├── submit.js            # ✅ Main RSVP submission endpoint
│   ├── health.js            # ✅ API health check
│   └── check-env.js         # ✅ Environment diagnostics
├── src/                      # React Frontend
│   ├── components/          # React components
│   │   ├── RSVPForm.jsx    # ✅ RSVP form with validation
│   │   ├── WeddingInvitation.jsx
│   │   ├── SaveTheDate.jsx
│   │   ├── FlipCard.jsx
│   │   └── Navigation.jsx
│   ├── services/
│   │   └── api.service.js   # ✅ API client
│   ├── store/
│   │   └── weddingStore.jsx # State management
│   └── utils/
│       └── constants.js
├── public/                   # Static assets
├── vercel.json              # ✅ Vercel configuration
└── package.json             # ✅ Dependencies

```

---

## 🔧 Configuration Files

### vercel.json
```json
{
  "buildCommand": "npx vite build",
  "outputDirectory": "dist",
  "installCommand": "npm install --include=dev --legacy-peer-deps",
  "functions": {
    "api/**/*.js": {
      "maxDuration": 10
    }
  }
}
```

### package.json (Key Settings)
- **Type**: `"module"` - Using ES modules
- **Node Version**: `>=18.0.0`
- **Frontend Framework**: Vite + React
- **Styling**: Tailwind CSS + DaisyUI

---

## 🔐 Environment Variables (Vercel Dashboard)

Make sure these are set in your Vercel Dashboard:

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_USER` | Your Gmail address | `yourname@gmail.com` |
| `EMAIL_PASS` | Gmail App Password | `abcd efgh ijkl mnop` |
| `COUPLE_EMAIL` | Email to receive RSVPs | `couple@example.com` |
| `VITE_API_URL` | API base URL | `/api` |

**Note**: `EMAIL_PASS` must be a [Gmail App Password](https://myaccount.google.com/apppasswords), not your regular Gmail password.

---

## 🚀 Deployment

### Automatic Deployment
Every push to the `main` branch automatically deploys to Vercel.

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will:
1. Install dependencies
2. Build the frontend with Vite
3. Deploy static files to CDN
4. Deploy serverless functions to `/api`

### Manual Deployment
From Vercel Dashboard:
1. Go to Deployments
2. Click "Deploy" or "Redeploy"

---

## 📝 API Endpoints

### POST /api/submit
Submit RSVP form data.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "attending": true,
  "guests": "2",
  "phone": "+1234567890",
  "message": "Looking forward to the wedding!"
}
```

**Response**:
```json
{
  "success": true,
  "message": "RSVP submitted successfully!",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "attendance": true,
    "submittedAt": "2025-10-04T12:00:00Z"
  }
}
```

### GET /api/health
Check if API is running.

**Response**:
```json
{
  "success": true,
  "message": "Wedding RSVP API is running",
  "timestamp": "2025-10-04T12:00:00Z",
  "environment": "production"
}
```

### GET /api/check-env
Check environment variable configuration (for diagnostics).

**Response**:
```json
{
  "success": true,
  "environment": {
    "NODE_ENV": "production",
    "EMAIL_USER": "✓ Set",
    "EMAIL_PASS": "✓ Set",
    "COUPLE_EMAIL": "✓ Set",
    "VITE_API_URL": "✓ Set"
  },
  "canRequireNodemailer": "✓ nodemailer can be loaded"
}
```

---

## 🛠️ Local Development

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup
```bash
# Clone repository
git clone https://github.com/Autentico123/wedding-invitation.git
cd wedding-invitation

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start frontend and backend in development mode
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🎨 Customization

### Update Wedding Details
Edit `src/store/weddingStore.jsx`:
```javascript
weddingData: {
  couple: {
    bride: "Your Bride Name",
    groom: "Your Groom Name"
  },
  date: "YYYY-MM-DD",
  venue: {
    name: "Venue Name",
    address: "Full Address"
  }
}
```

### Update Styling
- **Colors**: `tailwind.config.js`
- **Fonts**: `index.css`
- **Components**: Individual files in `src/components/`

### Update Email Templates
Edit HTML templates in `api/submit.js`:
- `coupleEmailOptions.html` - Email to couple
- `guestEmailOptions.html` - Confirmation to guest

---

## 📊 Monitoring

### Check API Status
Visit: https://wedding-invitation-five-gray.vercel.app/api/health

### Check Environment Variables
Visit: https://wedding-invitation-five-gray.vercel.app/api/check-env

### View Logs
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Deployments** → Latest deployment
4. Click **View Function Logs**

---

## 🐛 Troubleshooting

### RSVP Not Submitting
1. Check browser console for errors (F12)
2. Verify environment variables are set in Vercel
3. Check `/api/check-env` endpoint
4. Review function logs in Vercel Dashboard

### Emails Not Sending
1. Verify `EMAIL_USER` and `EMAIL_PASS` are correct
2. Ensure you're using Gmail App Password (not regular password)
3. Check if Gmail account has 2-Step Verification enabled
4. Review function logs for nodemailer errors

### Build Failing
1. Check Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

---

## 📚 Technology Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS, DaisyUI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Routing**: React Router
- **Notifications**: React Hot Toast
- **Backend**: Vercel Serverless Functions (Node.js)
- **Email**: Nodemailer with Gmail SMTP
- **Deployment**: Vercel
- **Version Control**: Git + GitHub

---

## 🎉 Success!

Your wedding invitation website is fully functional and ready for guests to RSVP!

**What's Working**:
- ✅ Beautiful, responsive design
- ✅ RSVP form submission
- ✅ Email notifications
- ✅ Automatic confirmation emails
- ✅ Clean, production-ready code

**Next Steps**:
1. Share your website URL with guests
2. Monitor RSVPs through email notifications
3. Check Vercel analytics for visitor stats

---

**Deployed**: October 4, 2025
**Status**: 🟢 Production Ready
**Version**: 1.0.0
