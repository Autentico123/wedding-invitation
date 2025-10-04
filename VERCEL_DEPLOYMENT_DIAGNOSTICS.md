# Vercel API Deployment Diagnostics

## Issue
Cannot access `/api/health` endpoint on deployed Vercel site.

## Updated Configuration

### ✅ Fixed `vercel.json`
Changed routing to properly handle API requests:

```json
"routes": [
  {
    "src": "/api/(.*)",
    "dest": "/api/index.js"
  },
  {
    "src": "/(.*)",
    "dest": "/dist/$1"
  }
]
```

## Step-by-Step Deployment

### 1. Commit and Push Changes
```powershell
git add .
git commit -m "fix: Update Vercel API routing configuration"
git push origin main
```

### 2. Wait for Vercel Auto-Deployment
- Go to your Vercel Dashboard
- Wait for the build to complete (~2-3 minutes)
- Check for any build errors

### 3. Test API Endpoints

After deployment, test these URLs (replace `your-domain` with your actual Vercel URL):

#### Test 1: Health Check
```
https://your-domain.vercel.app/api/health
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Wedding RSVP API is running",
  "timestamp": "2025-10-04T...",
  "environment": "production"
}
```

#### Test 2: API Root
```
https://your-domain.vercel.app/api
```
**Expected Response:**
```json
{
  "success": true,
  "message": "Wedding Invitation API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "rsvp": "/api/rsvp/submit",
    "statistics": "/api/rsvp/statistics"
  }
}
```

## Troubleshooting Steps

### If you get 404 or "Page not found"

1. **Check Vercel Build Logs:**
   - Go to Vercel Dashboard
   - Click on your project
   - Click on "Deployments"
   - Click on the latest deployment
   - Check the "Build Logs" tab

2. **Look for these errors:**
   - `Module not found` - Missing dependencies
   - `Build failed` - Syntax or configuration errors
   - `Cannot find module` - Import path issues

3. **Common Issues:**
   - API folder not deployed
   - Missing dependencies in package.json
   - Import path errors with ES modules

### If you get HTML instead of JSON

This means the API route isn't working and Vercel is serving the static site instead.

**Solutions:**
1. Verify `api/index.js` exists in your repository
2. Check Vercel build includes the API in "builds" section
3. Ensure routes prioritize `/api/*` before static files

### If you get "Internal Server Error"

1. **Check Runtime Logs:**
   - Vercel Dashboard > Project > Logs
   - Look for runtime errors
   - Check for missing environment variables

2. **Common causes:**
   - Missing environment variables
   - Database connection errors
   - Import/require syntax errors

## Environment Variables Checklist

Go to Vercel Dashboard > Settings > Environment Variables and ensure these are set:

- [ ] `EMAIL_USER` - Your Gmail address
- [ ] `EMAIL_PASS` - Gmail app password (not regular password!)
- [ ] `COUPLE_EMAIL` - Email to receive RSVPs
- [ ] `NODE_ENV` - Set to "production"

**Important:** After adding environment variables, you MUST redeploy!

## Manual Testing with Vercel CLI

If auto-deployment isn't working, try manual deployment:

```powershell
# Install Vercel CLI globally (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Follow the prompts
```

## Check Deployment Status

### Via Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Click on your project
3. Check "Deployments" tab
4. Latest deployment should show "Ready" status
5. Click on the deployment URL to test

### Via Vercel CLI:
```powershell
# Check deployment status
vercel ls

# View logs
vercel logs [deployment-url]
```

## Verify API Structure

Make sure your project has this structure:
```
wedding-invitation/
├── api/
│   └── index.js          ← Serverless function
├── server/
│   ├── routes/
│   │   └── rsvp.routes.js
│   ├── controllers/
│   │   └── rsvp.controller.js
│   └── services/
│       └── email.service.js
├── dist/                 ← Built static files
├── vercel.json          ← Vercel configuration
└── package.json
```

## Test Locally with Vercel Dev

Before deploying, test locally:

```powershell
# Install Vercel CLI if needed
npm i -g vercel

# Run Vercel dev server
vercel dev
```

Then test:
- Frontend: http://localhost:3000
- API Health: http://localhost:3000/api/health
- API Root: http://localhost:3000/api

## Common Deployment Issues

### Issue 1: API routes return 404
**Cause:** Routes configuration doesn't prioritize API paths  
**Fix:** Ensure `/api/*` route comes BEFORE catch-all route in vercel.json

### Issue 2: Getting HTML instead of JSON
**Cause:** Static files are served instead of API  
**Fix:** Check builds configuration includes `@vercel/node` for API

### Issue 3: Module import errors
**Cause:** ES module syntax issues  
**Fix:** Ensure `"type": "module"` is in package.json

### Issue 4: Environment variables not working
**Cause:** Variables not set or deployment not updated  
**Fix:** Set variables in dashboard, then redeploy

## Quick Diagnostic Commands

Run these in PowerShell to check your setup:

```powershell
# Check if API file exists
Test-Path api/index.js

# Check if vercel.json exists
Test-Path vercel.json

# View current git status
git status

# Check for uncommitted changes
git diff

# View recent commits
git log --oneline -5
```

## What to Share if Still Not Working

If you're still having issues, share:

1. **Your Vercel deployment URL**
   - Format: `https://your-project-name.vercel.app`

2. **Screenshot of Vercel build logs**
   - Shows any build errors

3. **Screenshot of trying to access `/api/health`**
   - Shows the actual error

4. **Output of this command:**
   ```powershell
   Get-Content vercel.json
   ```

5. **Deployment status:**
   - Go to Vercel dashboard and share deployment status

## Expected Working URLs

Once deployed correctly, these should all work:

- ✅ `https://your-domain.vercel.app/` - Wedding invitation homepage
- ✅ `https://your-domain.vercel.app/api` - API info
- ✅ `https://your-domain.vercel.app/api/health` - Health check
- ✅ `https://your-domain.vercel.app/api/rsvp/submit` - RSVP submission (POST)

## Next Steps

1. ✅ Commit and push the updated `vercel.json`
2. ⏳ Wait for Vercel auto-deployment
3. 🧪 Test `/api/health` endpoint
4. ✉️ Test RSVP form submission
5. 🎉 Verify email notifications work

---

**Note:** The vercel.json has been updated. You need to:
1. Commit and push changes
2. Wait for deployment
3. Then test the API endpoints
