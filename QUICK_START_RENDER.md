# 🚀 Quick Start - Deploy to Render.com in 5 Minutes

The fastest way to deploy your Product Listing app to Render.com.

---

## ⚡ 5-Minute Deployment

### Step 1: Push to GitHub (1 min)

```bash
cd /Users/rohit/Desktop/ProductListing
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Deploy via Blueprint (2 min)

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select your `ProductListing` repo
5. Click **"Apply"**
6. Wait for all services to build (~5-10 minutes)

### Step 3: Set WooCommerce Credentials (1 min)

After services start building:

1. Click on **"product-service"**
2. Go to **Environment** tab
3. Add these variables:
   ```
   WOOCOMMERCE_URL = https://your-store.com
   WOOCOMMERCE_CONSUMER_KEY = ck_your_key_here
   WOOCOMMERCE_CONSUMER_SECRET = cs_your_secret_here
   ```
4. Click **Save Changes** (service will redeploy)

### Step 4: Update Frontend URLs (1 min)

1. Copy your backend URLs from Render dashboard:
   - `https://product-service.onrender.com`
   - `https://segment-service.onrender.com`

2. Click on **"product-listing-frontend"**
3. Go to **Environment** tab
4. Add these variables:
   ```
   VITE_PRODUCT_SERVICE_URL = https://product-service.onrender.com
   VITE_SEGMENT_SERVICE_URL = https://segment-service.onrender.com
   ```
5. Click **Save Changes** (will trigger rebuild)

### Step 5: Test Your App! ✅

Wait for all services to show **"Live"** status (green dot), then:

1. **Open your frontend**: `https://product-listing-frontend.onrender.com`
2. **Test API docs**: `https://product-service.onrender.com/api-docs`
3. **Test health**: `https://product-service.onrender.com/health`

**That's it!** 🎉 Your app is live!

---

## 🔍 Verify Everything Works

### Check All Services are Running

In Render Dashboard, you should see:

- ✅ `product-listing-frontend` - Live
- ✅ `product-service` - Live  
- ✅ `segment-service` - Live
- ✅ `cron-service` - Live
- ✅ `product-listing-db` - Available

### Test Health Endpoints

```bash
curl https://product-service.onrender.com/health
curl https://segment-service.onrender.com/health
```

Expected: `{"status":"ok","service":"..."}`

### Test Product Sync

```bash
curl -X POST https://product-service.onrender.com/api/products/sync
```

### Open Frontend

Navigate to: `https://product-listing-frontend.onrender.com`

---

## ⚠️ Common Issues

### Services show "Build Failed"
**Fix**: Check logs → Look for missing dependencies or env vars

### Frontend shows blank page
**Fix**: Verify `VITE_*` variables are set and frontend was rebuilt

### Database connection error
**Fix**: Wait 1-2 minutes for database to be fully available

### Products not syncing
**Fix**: Verify WooCommerce credentials are correct

---

## 💰 Cost

✅ **$0/month** on free tier!

**Limitations:**
- Services sleep after 15 min of inactivity
- Cold start: ~30 seconds on first request

**Upgrade:** $7/mo per service for 24/7 uptime

---

## 📚 More Documentation

- **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Complete overview
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed guide with troubleshooting
- **[ENV_VARIABLES.md](./ENV_VARIABLES.md)** - All environment variables
- **[PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)** - Pre-flight checklist

---

## 🎯 Your URLs (After Deployment)

- **Frontend**: `https://product-listing-frontend.onrender.com`
- **Product API**: `https://product-service.onrender.com/api-docs`
- **Segment API**: `https://segment-service.onrender.com/api-docs`

---

**Happy Deploying!** 🚀✨
