# Vercel Deployment Guide

This project is ready for deployment on Vercel. Follow these steps:

1. **Push to GitHub**: Ensure your latest code is pushed to your GitHub repository.
2. **Connect to Vercel**:
   - Go to https://vercel.com/import/git
   - Import your GitHub repository.
3. **Configure Build Settings**:
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. **Environment Variables**:
   - If you use any environment variables, add them in the Vercel dashboard under Project Settings > Environment Variables.
5. **Custom Domains** (optional):
   - Add your custom domain in Vercel if needed.

## Notes

- The `next.config.ts` is compatible with Vercel.
- No special configuration is required for Vercel deployment.
- Remove or ignore `apphosting.yaml` if not using Firebase App Hosting.

---

For more details, see the [Vercel Next.js documentation](https://vercel.com/docs/frameworks/nextjs).
