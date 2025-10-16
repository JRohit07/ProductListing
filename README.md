# 🛍️ Product Listing Microservices Application

A modern, scalable microservices-based product listing application with WooCommerce integration.

## 🚀 Quick Deploy to Render.com

**Deploy in 5 minutes!**

1. Push to GitHub: `git push origin main`
2. Go to [render.com](https://render.com) → New → Blueprint
3. Select your repository
4. Click "Apply"
5. Done! ✅

See **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** for complete deployment setup.

## 📚 Documentation

- **[DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md)** - Start here! Complete deployment overview
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed deployment guide with troubleshooting
- **[PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md)** - Pre-flight checklist
- **[ENV_VARIABLES.md](./ENV_VARIABLES.md)** - Environment variables reference

## 🏗️ Architecture

### Services

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 80 | React + Vite + Tailwind CSS |
| Product Service | 3001 | Product management & WooCommerce sync |
| Segment Service | 3002 | Dynamic product segmentation |
| Cron Service | - | Background sync worker |
| Database | 5432 | PostgreSQL (prod) / SQLite (dev) |

## ✨ Features

- ✅ Full product CRUD operations
- ✅ WooCommerce API integration
- ✅ Automated product synchronization
- ✅ Dynamic product segmentation with rules
- ✅ RESTful API with Swagger documentation
- ✅ Docker containerization
- ✅ Production-ready deployment on Render.com

## 💻 Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Quick Start

1. **Install dependencies**
   ```bash
   # Product Service
   cd backend/services/product-service && npm install
   
   # Segment Service
   cd backend/services/segment-service && npm install
   
   # Cron Service  
   cd backend/cron-service && npm install
   
   # Frontend
   cd frontend && npm install
   ```

2. **Configure environment variables**
   
   Create `.env` files in each service directory (see ENV_VARIABLES.md)

3. **Run services**
   ```bash
   # Product Service
   cd backend/services/product-service && npm run dev
   
   # Segment Service
   cd backend/services/segment-service && npm run dev
   
   # Frontend
   cd frontend && npm run dev
   ```

4. **Access**
   - Frontend: http://localhost:5173
   - Product API: http://localhost:3001/api-docs
   - Segment API: http://localhost:3002/api-docs

## 📖 API Documentation

### Product Service API

- `GET /health` - Health check
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/sync` - Sync from WooCommerce

### Segment Service API

- `GET /health` - Health check  
- `POST /api/segments/evaluate` - Evaluate segment rules

Full API documentation available at `/api-docs` endpoint for each service.

## 🐳 Docker Support

All services include Dockerfiles. Build and run:

```bash
# Product Service
cd backend/services/product-service
docker build -t product-service .
docker run -p 3001:3001 --env-file .env product-service
```

## 🚀 Deployment

This application is configured for easy deployment on Render.com:

- **Blueprint file**: `render.yaml` (deploys all services automatically)
- **Auto-deploy**: Push to GitHub triggers deployment
- **Free tier available**: $0/month to get started
- **SSL/HTTPS**: Automatically configured

**See [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) for complete deployment guide.**

## 🛠️ Tech Stack

### Frontend
- React 18, Vite 5, Tailwind CSS 3, Axios, Nginx

### Backend
- Node.js 18, Express.js 4, Sequelize ORM
- PostgreSQL (prod) / SQLite (dev)
- Swagger UI, Helmet.js, CORS

### DevOps
- Docker, Render.com, GitHub Actions

## 📦 Project Structure

```
ProductListing/
├── frontend/                 # React frontend
├── backend/
│   ├── services/
│   │   ├── product-service/  # Product API
│   │   └── segment-service/  # Segment API
│   └── cron-service/         # Background worker
├── render.yaml               # Render deployment config
├── DEPLOYMENT_SUMMARY.md     # Deployment overview
└── DEPLOYMENT.md             # Detailed guide
```

## 🔐 Security

- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Input validation
- ✅ Environment variable protection
- ✅ SSL/TLS on production

## 💰 Cost (Free Tier)

- **$0/month** for all services on Render.com free tier
- Upgrade to $7/mo per service for 24/7 uptime

## 🆘 Support

- **Documentation**: See `/docs` folder
- **Issues**: GitHub Issues
- **Render Support**: [support@render.com](mailto:support@render.com)

## 📄 License

MIT License

---

**Ready to deploy?** See [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) 🚀
