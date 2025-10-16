# 🔐 Environment Variables Reference

This document lists all environment variables needed for Render.com deployment.

---

## 📋 Quick Reference

### Variables You MUST Set Manually

After deploying via Blueprint, you only need to set these in Render Dashboard:

| Service             | Variable                      | Value                                  | Required? |
| ------------------- | ----------------------------- | -------------------------------------- | --------- |
| **product-service** | `WOOCOMMERCE_URL`             | `https://your-store.com`               | ✅ Yes    |
| **product-service** | `WOOCOMMERCE_CONSUMER_KEY`    | `ck_your_key_here`                     | ✅ Yes    |
| **product-service** | `WOOCOMMERCE_CONSUMER_SECRET` | `cs_your_secret_here`                  | ✅ Yes    |
| **frontend**        | `VITE_PRODUCT_SERVICE_URL`    | `https://product-service.onrender.com` | ✅ Yes    |
| **frontend**        | `VITE_SEGMENT_SERVICE_URL`    | `https://segment-service.onrender.com` | ✅ Yes    |

---

## 🤖 Auto-Configured Variables

These are automatically set by `render.yaml` - **no action needed**:

### Product Service

```env
PORT=3001
NODE_ENV=production
DATABASE_URL=<auto-injected-by-render>
```

### Segment Service

```env
PORT=3002
NODE_ENV=production
DATABASE_URL=<auto-injected-by-render>
PRODUCT_SERVICE_URL=<auto-linked-to-product-service>
```

### Cron Service

```env
NODE_ENV=production
PRODUCT_SERVICE_URL=<auto-linked-to-product-service>
SYNC_INTERVAL=3600000
```

---

## 📝 How to Get WooCommerce Credentials

1. Log in to your WordPress admin panel
2. Go to **WooCommerce** → **Settings** → **Advanced** → **REST API**
3. Click **Add Key**
4. Set:
   - **Description**: "Render.com Product Sync"
   - **User**: Select an admin user
   - **Permissions**: Read/Write
5. Click **Generate API Key**
6. Copy the **Consumer Key** and **Consumer Secret** immediately
7. Add them to Render environment variables

---

## 🔄 How to Update Environment Variables on Render

### During Deployment

1. After clicking "Apply" on Blueprint
2. Before services finish building, click on each service
3. Go to **Environment** tab
4. Click **Add Environment Variable**
5. Enter key and value
6. Services will auto-redeploy

### After Deployment

1. Go to Render Dashboard
2. Click on the service (e.g., `product-service`)
3. Go to **Environment** tab
4. Click **Add Environment Variable** or edit existing ones
5. Save changes
6. Service will automatically redeploy

---

## ⚠️ Important Notes

### Frontend Variables (VITE\_\*)

- Must start with `VITE_` prefix
- Are embedded at **build time** (not runtime)
- Changing them requires a **rebuild**, not just restart
- Don't put secrets here (visible in browser)

### Backend Variables

- Loaded at runtime
- Can include secrets safely
- Changes require service restart

### Database URL Format

```
postgresql://username:password@hostname:5432/database
```

Render automatically provides this via the Blueprint configuration.

---

## 🧪 Testing Environment Variables

### Check if Variables are Set

**Product Service:**

```bash
curl https://product-service.onrender.com/health
```

**Check Logs:**

1. Go to service in Render Dashboard
2. Click **Logs**
3. Look for startup messages showing configuration

### Test WooCommerce Connection

```bash
curl -X POST https://product-service.onrender.com/api/products/sync
```

Should return:

```json
{
  "message": "Product sync completed",
  "count": 10
}
```

---

## 🔍 Common Issues

### "WooCommerce credentials not configured"

**Problem**: API calls to WooCommerce fail

**Solution**:

1. Verify `WOOCOMMERCE_URL`, `WOOCOMMERCE_CONSUMER_KEY`, and `WOOCOMMERCE_CONSUMER_SECRET` are set
2. Check there are no extra spaces
3. Ensure URL includes `https://`
4. Test credentials directly with Postman first

### Frontend shows "Network Error"

**Problem**: Frontend can't reach backend APIs

**Solution**:

1. Verify `VITE_PRODUCT_SERVICE_URL` and `VITE_SEGMENT_SERVICE_URL` are set
2. **Rebuild** frontend (not just restart)
3. Check URLs are correct (copy from service dashboard)
4. Ensure no trailing slashes

### Database Connection Failed

**Problem**: Services can't connect to PostgreSQL

**Solution**:

1. Check database is in "Available" state
2. Verify `DATABASE_URL` is set (should be auto-configured)
3. Check database config files handle `DATABASE_URL` env var
4. Review logs for specific connection errors

---

## 📦 Example Configuration

### Complete Product Service Environment

```env
# Server
PORT=3001
NODE_ENV=production

# Database (auto-configured)
DATABASE_URL=postgresql://user:pass@host.render.com:5432/productlisting

# WooCommerce (you set these)
WOOCOMMERCE_URL=https://mystore.com
WOOCOMMERCE_CONSUMER_KEY=ck_1234567890abcdef
WOOCOMMERCE_CONSUMER_SECRET=cs_abcdef1234567890
```

### Complete Frontend Environment

```env
# API Endpoints (you set these after backend deploys)
VITE_PRODUCT_SERVICE_URL=https://product-service.onrender.com
VITE_SEGMENT_SERVICE_URL=https://segment-service.onrender.com
```

---

## ✅ Checklist

Before going live, verify:

- [ ] PostgreSQL database is created and "Available"
- [ ] All 4 services show "Live" status
- [ ] WooCommerce credentials are set in product-service
- [ ] Frontend environment variables point to correct API URLs
- [ ] Health endpoints return 200 OK
- [ ] Manual product sync works
- [ ] Frontend loads and displays products
- [ ] Cron service logs show periodic syncing

---

## 🆘 Need Help?

If you're stuck, check:

1. Render service logs (most common issues show here)
2. Render Dashboard → Service → Events (deployment history)
3. Test each service independently
4. Use Render's built-in shell to debug

**Pro tip**: Use `console.log(process.env)` temporarily in your service to see what env vars are actually loaded.

---

Good luck with your deployment! 🚀
