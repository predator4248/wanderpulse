# 🚀 Deploying WanderPulse Bali (24/7 Cloud Hosting)

This guide shows you how to host **WanderPulse Bali** online so **anyone in the world can access it 24/7, even when your PC is completely turned off**.

---

## ⚡ Option 1: Vercel (Recommended — Free, Fastest Global CDN, Zero Maintenance)

Your project is **already 100% pre-configured** for Vercel with:
- [`vercel.json`](./vercel.json) (routes all static assets and rewrites `/api/*` to serverless functions)
- [`api/index.js`](./api/index.js) (serverless Express handler)
- [`server.js`](./server.js) (exports Express app with zero server lock)

### Method A: Deploy via GitHub (1-Click, Easiest)
1. **Create a free GitHub repository**:
   - Go to [https://github.com/new](https://github.com/new) and name it `wanderpulse-bali`.
2. **Push your code to GitHub**:
   Run these 3 commands in your project terminal:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/wanderpulse-bali.git
   git push -u origin main
   ```
3. **Import to Vercel**:
   - Go to [https://vercel.com/new](https://vercel.com/new).
   - Sign in with your GitHub account.
   - Click **Import** on `wanderpulse-bali`.
   - Leave all default build settings as they are and click **Deploy**.
4. **Done!**
   - In ~30 seconds, Vercel gives you a permanent, live URL (e.g. `https://wanderpulse-bali.vercel.app`).
   - Every time you push changes to GitHub, Vercel automatically redeploys.

---

### Method B: Deploy directly via Terminal (Vercel CLI)
If you prefer not to use GitHub, you can deploy directly from your command line:
1. Run in PowerShell or Command Prompt:
   ```bash
   cmd /c "npx vercel"
   ```
2. Press **Enter** to confirm the defaults.
3. When prompted to log in, choose **Continue with GitHub** or enter your email for a 1-click login link.
4. When deployment finishes, run:
   ```bash
   cmd /c "npx vercel --prod"
   ```
   This gives you your permanent production URL!

---

## 🌐 Option 2: Render (Free 24/7 Persistent Node.js Web Service)

If you prefer a continuous Node.js server running in the cloud:
1. Push your code to GitHub (as in Method A above).
2. Go to [https://render.com/](https://render.com/) and create a free account.
3. Click **New +** -> **Web Service**.
4. Select your GitHub repository `wanderpulse-bali`.
5. Render will automatically detect [`render.yaml`](./render.yaml) and configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click **Create Web Service**.
7. In ~1 minute, your site will be live at `https://wanderpulse-bali.onrender.com`!

---

## 💻 Local Development (When Testing on Your Machine)

Whenever you want to run it locally on your PC:
```bash
npm start
```
- Open `http://localhost:3000/` in your browser.
