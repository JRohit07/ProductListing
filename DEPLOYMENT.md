# 🚀 Deployment Guide - Render.com

Complete guide to deploy your Product Listing microservices application on Render.com.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Deployment Steps](#deployment-steps)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment Setup](#post-deployment-setup)
6. [Monitoring & Logs](#monitoring--logs)
7. [Troubleshooting](#troubleshooting)
8. [Cost Breakdown](#cost-breakdown)

---

## 🎯 Prerequisites

Before deploying, ensure you have:

- ✅ GitHub/GitLab account with your code pushed
- ✅ [Render.com](https://render.com) account (free tier available)
- ✅ WooCommerce store credentials (if using sync feature)
- ✅ All code committed to your repository

---

## 🏗️ Architecture Overview

Your application will be deployed as:

```
┌─────────────────────────────────────────────────────┐
│                    Render.com                       │
│                                                     │
│  ┌──────────────┐      ┌──────────────┐           │
│  │   Frontend   │◄────►│   Product    │           │
│  │  (React/Vite)│      │   Service    │           │
│  └──────────────┘      └───────┬──────┘           │
│         │                      │                   │
│         │              ┌───────▼──────┐           │
│         └─────────────►│   Segment    │           │
│                        │   Service    │           │
│                        └───────┬──────┘           │
│                                │                   │
│  ┌──────────────┐             │                   │
│  │     Cron     │─────────────┘                   │
│  │   Service    │                                 │
│  │  (Worker)    │                                 │
│  └──────────────┘                                 │
│                                                     │
│         ┌────────────────────────┐                │
│         │  PostgreSQL Database   │                │
│         │    (Shared Storage)    │                │
│         └────────────────────────┘                │
└─────────────────────────────────────────────────────┘
```

**Services:**

- **Frontend** → Static site (React + Vite + Nginx)
- **Product Service** → REST API (Port 3001)
- **Segment Service** → REST API (Port 3002)
- **Cron Service** → Background worker (periodic sync)
- **PostgreSQL** → Managed database

---

## 🚀 Deployment Steps

### Method 1: One-Click Blueprint Deployment (Recommended)

1. **Push your code to GitHub/GitLab**

   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Deploy via Render Blueprint**

   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **"New"** → **"Blueprint"**
   - Connect your repository
   - Render will automatically detect `render.yaml`
   - Click **"Apply"**
   - Wait 5-10 minutes for all services to deploy

3. **That's it!** 🎉 All services will be created automatically.

---

### Method 2: Manual Deployment (Alternative)

If you prefer manual setup or need more control:

#### Step 1: Create PostgreSQL Database

1. Go to Render Dashboard → **New** → **PostgreSQL**
2. Set:
   - **Name**: `product-listing-db`
   - **Database**: `productlisting`
   - **User**: `productlisting`
   - **Plan**: Free
3. Click **Create Database**
4. Copy the **Internal Database URL** (you'll need this)

#### Step 2: Deploy Product Service

1. **New** → **Web Service**
2. Connect your repository
3. Configure:
   - **Name**: `product-service`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./backend/services/product-service/Dockerfile`
   - **Docker Context**: `./backend/services/product-service`
   - **Plan**: Free
4. Add Environment Variables:
   ```
   PORT=3001
   NODE_ENV=production
   DATABASE_URL=[paste your database URL]
   WOOCOMMERCE_URL=https://your-store.com
   WOOCOMMERCE_CONSUMER_KEY=ck_xxx
   WOOCOMMERCE_CONSUMER_SECRET=cs_xxx
   ```
5. **Create Web Service**

#### Step 3: Deploy Segment Service

1. **New** → **Web Service**
2. Configure:
   - **Name**: `segment-service`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./backend/services/segment-service/Dockerfile`
   - **Docker Context**: `./backend/services/segment-service`
3. Environment Variables:
   ```
   PORT=3002
   NODE_ENV=production
   DATABASE_URL=[paste your database URL]
   PRODUCT_SERVICE_URL=https://product-service.onrender.com
   ```

#### Step 4: Deploy Cron Service

1. **New** → **Background Worker**
2. Configure:
   - **Name**: `cron-service`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./backend/cron-service/Dockerfile`
   - **Docker Context**: `./backend/cron-service`
3. Environment Variables:
   ```
   NODE_ENV=production
   PRODUCT_SERVICE_URL=https://product-service.onrender.com
   SYNC_INTERVAL=3600000
   ```

#### Step 5: Deploy Frontend

1. **New** → **Web Service**
2. Configure:
   - **Name**: `product-listing-frontend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `./frontend/Dockerfile`
   - **Docker Context**: `./frontend`
3. Environment Variables:
   ```
   VITE_PRODUCT_SERVICE_URL=https://product-service.onrender.com
   VITE_SEGMENT_SERVICE_URL=https://segment-service.onrender.com
   ```

---

## 🔐 Environment Variables

### Required Variables (Manual Setup)

| Service             | Variable                      | Description                | Example                                |
| ------------------- | ----------------------------- | -------------------------- | -------------------------------------- |
| **Product Service** | `WOOCOMMERCE_URL`             | Your WooCommerce store URL | `https://store.com`                    |
|                     | `WOOCOMMERCE_CONSUMER_KEY`    | WooCommerce API key        | `ck_xxxxx`                             |
|                     | `WOOCOMMERCE_CONSUMER_SECRET` | WooCommerce API secret     | `cs_xxxxx`                             |
| **Frontend**        | `VITE_PRODUCT_SERVICE_URL`    | Product API URL            | `https://product-service.onrender.com` |
|                     | `VITE_SEGMENT_SERVICE_URL`    | Segment API URL            | `https://segment-service.onrender.com` |

### Auto-Configured (via Blueprint)

These are automatically set by `render.yaml`:

- `DATABASE_URL` - PostgreSQL connection string
- `PRODUCT_SERVICE_URL` - Internal service discovery
- `PORT` - Service ports
- `NODE_ENV` - Environment mode

---

## ⚙️ Post-Deployment Setup

### 1. Verify All Services are Running

Check the Render Dashboard - all services should show **"Live"** (green dot).

### 2. Test Health Endpoints

```bash
# Product Service
curl https://product-service.onrender.com/health

# Segment Service
curl https://segment-service.onrender.com/health

# Frontend
curl https://product-listing-frontend.onrender.com
```

Expected response:

```json
{
  "status": "ok",
  "service": "product-service"
}
```

### 3. Initialize Database

The database will auto-initialize on first startup via Sequelize migrations.

### 4. Test Product Sync

Manually trigger a sync to verify WooCommerce integration:

```bash
curl -X POST https://product-service.onrender.com/api/products/sync
```

### 5. Access API Documentation

- Product Service: `https://product-service.onrender.com/api-docs`
- Segment Service: `https://segment-service.onrender.com/api-docs`

---

## 📊 Monitoring & Logs

### View Logs

1. Go to Render Dashboard
2. Click on a service
3. Click **"Logs"** tab
4. View real-time logs

### Monitoring

Render provides:

- ✅ CPU/Memory usage graphs
- ✅ Request metrics
- ✅ Error rates
- ✅ Health check status

### Alerts

Set up email/Slack alerts:

1. Service Settings → **Alerts**
2. Configure failure notifications

---

## 🐛 Troubleshooting

### Service Won't Start

**Problem**: Service stuck in "Building" or crashes immediately

**Solutions**:

1. Check logs for errors:
   - Missing environment variables
   - Database connection issues
   - Port conflicts
2. Verify Dockerfile paths in `render.yaml`
3. Ensure `package.json` has correct start scripts

### Database Connection Errors

**Problem**: `ECONNREFUSED` or `Unable to connect to database`

**Solutions**:

1. Verify `DATABASE_URL` is set correctly
2. Check database is in "Available" state
3. Ensure services are using internal database URL (not external)
4. Update `backend/services/*/src/config/database.js` to handle `DATABASE_URL`

### Frontend API Calls Failing

**Problem**: CORS errors or 404s

**Solutions**:

1. Update frontend environment variables with correct API URLs
2. Rebuild frontend after changing env vars
3. Check CORS settings in backend services
4. Ensure `VITE_*` variables are set before build

### Cron Service Not Syncing

**Problem**: Products not syncing automatically

**Solutions**:

1. Check cron service logs
2. Verify `PRODUCT_SERVICE_URL` is correct
3. Test manual sync endpoint
4. Check WooCommerce credentials

### Free Tier Limitations

**Problem**: Services spinning down after 15 minutes of inactivity

**Solution**:

- Free tier services sleep after inactivity
- Upgrade to paid plan ($7/mo per service) for 24/7 uptime
- Or use external uptime monitoring (e.g., UptimeRobot) to ping services

---

## 💰 Cost Breakdown

### Free Tier (Perfect for MVP/Testing)

| Service         | Plan              | Cost         |
| --------------- | ----------------- | ------------ |
| Frontend        | Static Site       | $0           |
| Product Service | Web Service       | $0           |
| Segment Service | Web Service       | $0           |
| Cron Service    | Background Worker | $0           |
| PostgreSQL      | Database          | $0           |
| **Total**       |                   | **$0/month** |

**Limitations**:

- Services sleep after 15 min inactivity (cold starts)
- 750 hours/month per service
- 1GB RAM per service
- 256MB PostgreSQL storage

### Paid Tier (Production Ready)

| Service         | Plan    | Cost          |
| --------------- | ------- | ------------- |
| Frontend        | Starter | $7/mo         |
| Product Service | Starter | $7/mo         |
| Segment Service | Starter | $7/mo         |
| Cron Service    | Starter | $7/mo         |
| PostgreSQL      | Starter | $7/mo         |
| **Total**       |         | **$35/month** |

**Benefits**:

- 24/7 uptime (no sleeping)
- 512MB RAM per service
- 10GB PostgreSQL storage
- Better performance

---

## 🎯 Next Steps

After successful deployment:

1. ✅ **Custom Domain**: Add your own domain in Render settings
2. ✅ **SSL/HTTPS**: Automatically provisioned by Render
3. ✅ **CI/CD**: Auto-deploy on git push (enabled by default)
4. ✅ **Scaling**: Upgrade plans as traffic grows
5. ✅ **Backups**: Enable database backups (paid plans)
6. ✅ **Monitoring**: Integrate with Datadog/NewRelic

---

## 📚 Useful Links

- [Render Documentation](https://render.com/docs)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Connecting Services](https://render.com/docs/connecting-services)
- [PostgreSQL on Render](https://render.com/docs/databases)

---

## 🆘 Need Help?

- **Render Support**: [support@render.com](mailto:support@render.com)
- **Community**: [Render Community Forum](https://community.render.com)
- **Status**: [status.render.com](https://status.render.com)

---

## 🎉 Congratulations!

Your microservices application is now live on Render.com! 🚀

**Your URLs:**

- Frontend: `https://product-listing-frontend.onrender.com`
- Product API: `https://product-service.onrender.com/api-docs`
- Segment API: `https://segment-service.onrender.com/api-docs`

Happy coding! 💻✨
