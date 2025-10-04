# Vercel API Configuration Fix

## Issue
Getting "Unexpected token 'T', 'The page c'... is not valid JSON" error when submitting RSVP form on Vercel deployment.

## Root Cause
1. The `vercel.json` was routing `/api/*` to `/server/index.js` instead of the serverless function at `/api/index.js`
2. Express routes had `/api` prefix which caused double `/api/api` paths
3. Missing proper CORS configuration for Vercel serverless functions
4. API service wasn't checking for JSON responses before parsing

## Solutions Applied

### 1. Updated `vercel.json`
**Changes:**
- Added `@vercel/node` build for the API serverless function
- Changed from `routes` to `rewrites` for better path handling
- Proper routing of `/api/*` requests to the serverless function

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api"
    }
  ]
}
```

### 2. Updated `api/index.js`
**Changes:**
- Removed `/api` prefix from routes (Vercel handles this)
- Enhanced CORS configuration for production
- Added 404 handler for undefined routes
- Better error responses with endpoint information

**Before:**
```javascript
app.use("/api/rsvp", rsvpRoutes);
app.get("/api/health", ...);
app.get("/api", ...);
```

**After:**
```javascript
app.use("/rsvp", rsvpRoutes);
app.get("/health", ...);
app.get("/", ...);
```

### 3. Updated `src/services/api.service.js`
**Changes:**
- Added content-type checking before JSON parsing
- Better error messages when server returns HTML
- Helpful debugging logs

```javascript
// Check if response is JSON
const contentType = response.headers.get("content-type");
if (!contentType || !contentType.includes("application/json")) {
  const text = await response.text();
  console.error("Expected JSON but got:", text.substring(0, 200));
  throw new Error(
    "Server returned an invalid response. Please check your deployment configuration."
  );
}
```

## Deployment Steps

### 1. Commit and Push Changes
```powershell
git add .
git commit -m "fix: Update Vercel serverless function configuration"
git push origin main
```

### 2. Redeploy on Vercel
The changes will automatically trigger a new deployment on Vercel if you have auto-deploy enabled.

Or manually redeploy:
```powershell
vercel --prod
```

### 3. Verify Environment Variables
Make sure these are set in Vercel Dashboard > Settings > Environment Variables:

**Required:**
- `EMAIL_USER` - Your email address (e.g., jessecavillaruel25@gmail.com)
- `EMAIL_PASS` - Your email app password
- `COUPLE_EMAIL` - Email to receive RSVP notifications
- `NODE_ENV` - Set to "production"

**Optional:**
- `VITE_API_URL` - Leave empty for production (will use relative `/api`)

### 4. Test the API Endpoints

After deployment, test these endpoints:

**Health Check:**
```
https://your-domain.vercel.app/api/health
```
Should return:
```json
{
  "success": true,
  "message": "Wedding RSVP API is running",
  "timestamp": "2025-10-04T...",
  "environment": "production"
}
```

**API Root:**
```
https://your-domain.vercel.app/api
```
Should return:
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

**RSVP Submit (POST):**
```
https://your-domain.vercel.app/api/rsvp/submit
```
Should accept POST requests with JSON body.

## Testing Locally

Before deploying, test locally:

```powershell
# Install dependencies
npm install

# Build the project
npm run build

# Test with Vercel CLI
vercel dev
```

Then visit:
- Frontend: http://localhost:3000
- API Health: http://localhost:3000/api/health
- API Root: http://localhost:3000/api

## Common Issues and Solutions

### Issue: Still getting HTML response
**Solution:** 
- Clear Vercel cache and redeploy
- Check Vercel deployment logs for build errors
- Verify `api/index.js` is being built correctly

### Issue: CORS errors
**Solution:**
- Verify CORS configuration in `api/index.js`
- Check that `Access-Control-Allow-Origin` header is set
- Try using `origin: true` for development testing

### Issue: Environment variables not working
**Solution:**
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)
- Verify variables are set for "Production" environment

### Issue: 404 on API routes
**Solution:**
- Verify `vercel.json` rewrites configuration
- Check API routes don't have `/api` prefix in Express app
- Look at Vercel deployment logs for routing issues

## File Structure

```
wedding-invitation/
├── api/
│   └── index.js          # Vercel serverless function (UPDATED)
├── server/
│   ├── index.js          # Local development server
│   ├── routes/
│   │   └── rsvp.routes.js
│   ├── controllers/
│   │   └── rsvp.controller.js
│   └── services/
│       └── email.service.js
├── src/
│   └── services/
│       └── api.service.js # API client (UPDATED)
├── vercel.json           # Vercel configuration (UPDATED)
└── package.json
```

## How Vercel Routing Works

1. User visits `https://your-domain.vercel.app/`
   - Served from `/dist` (static build)

2. RSVP form submits to `/api/rsvp/submit`
   - Vercel rewrites to `/api` serverless function
   - Express app handles `/rsvp/submit` route
   - Returns JSON response

3. Request flow:
   ```
   Frontend → /api/rsvp/submit
          ↓
   Vercel Rewrite → /api (serverless function)
          ↓
   Express Router → /rsvp/submit
          ↓
   Controller → emailService
          ↓
   JSON Response → Frontend
   ```

## Verification Checklist

After deployment, verify:

- [ ] Can access the website homepage
- [ ] Flip cards load correctly
- [ ] RSVP form displays properly
- [ ] Form validation works
- [ ] Submitting form shows success message (not JSON error)
- [ ] Email notification is received
- [ ] No console errors in browser
- [ ] API health endpoint returns JSON
- [ ] Mobile responsiveness works

## Rollback Plan

If issues persist:

1. Check Vercel deployment logs
2. Review previous successful deployment
3. Rollback to previous deployment in Vercel dashboard
4. Review changes and test locally before redeploying

## Support Resources

- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Express.js with Vercel](https://vercel.com/guides/using-express-with-vercel)
- [Vercel Rewrites](https://vercel.com/docs/projects/project-configuration#rewrites)
- [Troubleshooting API Routes](https://vercel.com/docs/functions/troubleshooting)

## Summary

The fix ensures that:
1. Vercel properly routes API requests to the serverless function
2. Express routes don't conflict with Vercel's path handling
3. Proper JSON responses are returned (not HTML error pages)
4. CORS is configured for production deployment
5. Better error handling and debugging information

All changes maintain backward compatibility with local development using `npm run dev`.
