# Quick Fix: Vercel API JSON Error

## ⚠️ Problem
"Unexpected token 'T', 'The page c'... is not valid JSON" when clicking submit button

## ✅ Solution Applied

### Files Modified:
1. `vercel.json` - Fixed routing to serverless function
2. `api/index.js` - Removed duplicate `/api` prefix from routes  
3. `src/services/api.service.js` - Added JSON response validation

## 🚀 Deploy Now

### Option 1: Git Push (Recommended)
```powershell
git add .
git commit -m "fix: Vercel API configuration for RSVP"
git push origin main
```
Vercel will auto-deploy in ~2 minutes

### Option 2: Vercel CLI
```powershell
vercel --prod
```

## ✓ Verify After Deployment

Test this URL in browser (replace with your domain):
```
https://your-project.vercel.app/api/health
```

Should see:
```json
{
  "success": true,
  "message": "Wedding RSVP API is running"
}
```

## 🔧 If Still Not Working

1. **Check Environment Variables** in Vercel Dashboard:
   - Go to Settings > Environment Variables
   - Verify `EMAIL_USER`, `EMAIL_PASS`, `COUPLE_EMAIL` are set
   - Redeploy after adding variables

2. **Check Deployment Logs**:
   - Go to Vercel Dashboard > Deployments
   - Click on latest deployment
   - Check for build/runtime errors

3. **Clear Cache**:
   - Vercel Dashboard > Settings > Advanced
   - Clear Build Cache
   - Redeploy

## 📝 What Was Fixed

**Before:** Routes had double `/api` prefix
- Frontend: `/api/rsvp/submit`
- Vercel: Routes to `/server/index.js` → Error
- Express: `/api/rsvp` → Path: `/api/api/rsvp` ❌

**After:** Clean routing
- Frontend: `/api/rsvp/submit`
- Vercel: Rewrites to `/api` serverless function ✓
- Express: `/rsvp` → Path: `/api/rsvp` ✅

## 🎯 Key Changes

### vercel.json
```json
"rewrites": [
  {
    "source": "/api/:path*",
    "destination": "/api"
  }
]
```

### api/index.js
```javascript
// Changed from:
app.use("/api/rsvp", rsvpRoutes);

// Changed to:
app.use("/rsvp", rsvpRoutes);
```

## ⏱️ Expected Timeline
- Git push: ~2 minutes for auto-deployment
- Manual CLI: ~1-2 minutes
- DNS propagation: Instant (same domain)

## 📞 Need Help?
Check `VERCEL_API_FIX.md` for detailed troubleshooting guide.
