# ✅ Pre-Deployment Checklist for Render.com

Complete this checklist before deploying to ensure a smooth deployment.

---

## 📋 Code Preparation

- [ ] All code is committed to Git

  ```bash
  git status  # Should show "working tree clean"
  ```

- [ ] Code is pushed to GitHub/GitLab

  ```bash
  git push origin main
  ```

- [ ] All Dockerfiles are present

  - [ ] `frontend/Dockerfile`
  - [ ] `backend/services/product-service/Dockerfile`
  - [ ] `backend/services/segment-service/Dockerfile`
  - [ ] `backend/cron-service/Dockerfile`

- [ ] `render.yaml` is in root directory
  ```bash
  ls render.yaml  # Should exist
  ```

---

## 🔐 WooCommerce Credentials Ready

- [ ] WooCommerce store URL (e.g., `https://mystore.com`)
- [ ] WooCommerce Consumer Key (starts with `ck_`)
- [ ] WooCommerce Consumer Secret (starts with `cs_`)

### How to Get WooCommerce Credentials

1. Login to WordPress admin
2. Go to **WooCommerce** → **Settings** → **Advanced** → **REST API**
3. Click **Add Key**
4. Set permissions to **Read/Write**
5. Copy the Consumer Key and Secret immediately

---

## 🧪 Local Testing (Optional but Recommended)

- [ ] Product Service runs locally

  ```bash
  cd backend/services/product-service
  npm install
  npm start
  # Should see: "🚀 Product Service running on port 3001"
  ```

- [ ] Segment Service runs locally

  ```bash
  cd backend/services/segment-service
  npm install
  npm start
  # Should see: "🚀 Segment Service running on port 3002"
  ```

- [ ] Frontend runs locally

  ```bash
  cd frontend
  npm install
  npm run dev
  # Should see: "Local: http://localhost:5173"
  ```

- [ ] Health endpoints work
  ```bash
  curl http://localhost:3001/health
  curl http://localhost:3002/health
  ```

---

## 🌐 Render.com Account Setup

- [ ] Created account at [render.com](https://render.com)
- [ ] GitHub/GitLab connected to Render
- [ ] Repository is accessible by Render

---

## 📦 Dependencies Check

### Product Service

- [ ] `package.json` includes all dependencies:
  - `express`, `sequelize`, `pg`, `axios`, `cors`, `helmet`, `dotenv`

### Segment Service

- [ ] `package.json` includes all dependencies:
  - `express`, `sequelize`, `pg`, `cors`, `helmet`, `dotenv`

### Frontend

- [ ] `package.json` includes all dependencies:
  - `react`, `react-dom`, `axios`, `tailwindcss`, `vite`

---

## 🐳 Docker Validation

### Test Docker Builds Locally (Optional)

- [ ] Product Service Docker build works

  ```bash
  cd backend/services/product-service
  docker build -t test-product-service .
  ```

- [ ] Segment Service Docker build works

  ```bash
  cd backend/services/segment-service
  docker build -t test-segment-service .
  ```

- [ ] Frontend Docker build works
  ```bash
  cd frontend
  docker build -t test-frontend .
  ```

---

## 📝 Configuration Files

- [ ] `render.yaml` is valid
- [ ] Database configuration handles `DATABASE_URL` env var
- [ ] Frontend API service uses `import.meta.env.VITE_*` variables
- [ ] All services have health check endpoints at `/health`

---

## 🚀 Ready to Deploy!

If all items above are checked, you're ready to deploy!

### Deployment Steps

1. **Go to Render Dashboard**

   - Visit: https://dashboard.render.com

2. **Create Blueprint**

   - Click **New** → **Blueprint**
   - Select your repository
   - Render will detect `render.yaml`

3. **Click Apply**

   - All 5 services will be created automatically
   - Wait 5-10 minutes for builds to complete

4. **Set Environment Variables**

   - Click on `product-service`
   - Go to **Environment** tab
   - Add:
     - `WOOCOMMERCE_URL`
     - `WOOCOMMERCE_CONSUMER_KEY`
     - `WOOCOMMERCE_CONSUMER_SECRET`
   - Service will auto-redeploy

5. **Update Frontend**

   - Wait for backend services to finish
   - Copy backend URLs (e.g., `https://product-service.onrender.com`)
   - Click on `product-listing-frontend`
   - Add environment variables:
     - `VITE_PRODUCT_SERVICE_URL`
     - `VITE_SEGMENT_SERVICE_URL`
   - Service will rebuild

6. **Verify Deployment**
   - All services show "Live" status
   - Test health endpoints
   - Open frontend URL

---

## ✅ Post-Deployment Verification

After deployment, verify:

- [ ] All 5 services are "Live" (green dot)
- [ ] Database is "Available"
- [ ] Health checks return 200 OK
  ```bash
  curl https://product-service.onrender.com/health
  curl https://segment-service.onrender.com/health
  ```
- [ ] Frontend loads without errors
- [ ] Product sync works
  ```bash
  curl -X POST https://product-service.onrender.com/api/products/sync
  ```
- [ ] API documentation accessible
  - `https://product-service.onrender.com/api-docs`
  - `https://segment-service.onrender.com/api-docs`

---

## 🐛 Troubleshooting

If something goes wrong:

1. **Check Logs**

   - Dashboard → Service → Logs tab
   - Look for error messages

2. **Verify Environment Variables**

   - Dashboard → Service → Environment tab
   - Ensure all required vars are set

3. **Check Database**

   - Dashboard → Databases
   - Ensure status is "Available"

4. **Review Build Logs**

   - Dashboard → Service → Events tab
   - Check build output for errors

5. **Common Issues**
   - Missing environment variables
   - Database connection timeout (wait a minute)
   - Frontend not rebuilt after setting VITE\_\* vars
   - WooCommerce credentials incorrect

---

## 📚 Quick Reference

- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Quick Start**: [QUICK_START_RENDER.md](./QUICK_START_RENDER.md)
- **Environment Vars**: [ENV_VARIABLES.md](./ENV_VARIABLES.md)
- **Main README**: [README.md](./README.md)

---

## 💡 Pro Tips

- **Free Tier**: Perfect for testing and low-traffic apps
- **Cold Starts**: Services sleep after 15 min inactivity on free tier
- **Upgrade**: $7/mo per service for 24/7 uptime
- **Auto Deploy**: Every git push triggers auto-deployment
- **Monitoring**: Set up alerts in Render dashboard

---

**Ready to deploy?** Let's go! 🚀

1. Make sure all boxes are checked ✅
2. Follow [QUICK_START_RENDER.md](./QUICK_START_RENDER.md)
3. Deploy in 5 minutes!

Good luck! 🎉
