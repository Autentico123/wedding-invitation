# Vercel Deployment Fix for Rollup Error

## Problem
The error `Cannot find module '@rollup/rollup-linux-x64-gnu'` occurs during Vercel deployment because Rollup's native modules aren't being installed correctly.

## Solution Applied

### 1. Updated `.npmrc`
```properties
# Force installation of optional dependencies
optional=true

# Ensure all platforms are supported
node-linker=hoisted

# Shamefully hoist all dependencies
shamefully-hoist=true

# Don't use strict engine checking
engine-strict=false
```

### 2. Updated `vercel.json`
- Added `buildCommand` explicitly
- Updated `installCommand` with `--legacy-peer-deps --include=optional`
- Added `NPM_FLAGS` environment variable
- Set Node version to 18.x

### 3. Updated `package.json`
- Removed custom `vercel-build` script (Vercel will use standard `build` script)
- Kept all other scripts intact

## Deployment Steps

1. **Commit all changes:**
   ```powershell
   git add .
   git commit -m "Fix Vercel deployment Rollup error"
   git push origin main
   ```

2. **Redeploy on Vercel:**
   - Go to your Vercel dashboard
   - Click "Redeploy" on your project
   - Or push to GitHub and let Vercel auto-deploy

## Verification

✅ Build tested locally and works successfully:
```
vite v5.4.20 building for production...
✓ 1695 modules transformed.
✓ built in 18.94s
```

## Additional Notes

- The `--legacy-peer-deps` flag helps resolve dependency conflicts
- The `--include=optional` flag ensures Rollup's platform-specific binaries are installed
- Node.js 18.x is used for maximum compatibility with Vite 5.x

## If Issues Persist

1. Clear Vercel build cache:
   - Go to Project Settings → General → Clear Build Cache

2. Check Vercel logs for specific errors

3. Ensure your Vercel project is using:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install --legacy-peer-deps --include=optional`

## Files Changed
- `.npmrc` - Updated npm configuration
- `vercel.json` - Updated Vercel build settings
- `package.json` - Removed custom vercel-build script
- `VERCEL_DEPLOYMENT_FIX.md` - This documentation (NEW)
