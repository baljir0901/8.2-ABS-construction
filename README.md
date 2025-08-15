# Firebase Studio

Энэ бол Firebase Studio-д зориулсан NextJS стартер төсөл юм.

## Төслийн бүтэц

- `src/app/page.tsx` — Эндээс эхлэн өөрчлөлтүүдээ хийнэ.
- `package.json` — Төслийн хамаарлууд болон скриптүүд.
- `next.config.ts` — Next.js төслийн тохиргоо.
- `apphosting.yaml` — Firebase App Hosting тохиргоо (хэрэв Firebase ашиглаж байгаа бол).
- `VERCEL_DEPLOYMENT.md` — Vercel-д байршуулалтын заавар.

## Хөгжүүлэлтийн орчин

1. Хамаарлуудыг суулгах:
   ```bash
   npm install
   ```
2. Хөгжүүлэлтийн серверийг ажиллуулах:
   ```bash
   npm run dev
   ```
   Сервер `http://localhost:9002` дээр ажиллана.

## Vercel-д байршуулалт

1. Github руу кодоо push хийнэ.
2. Vercel (https://vercel.com/import/git) руу орж, Github репозитороо импорт хийнэ.
3. Build команд: `npm run build`
   Output folder: `.next`
   Install команд: `npm install`
4. Орчны хувьсагч (Environment Variables) шаардлагатай бол Vercel-ийн тохиргоонд нэмнэ.

## Firebase App Hosting

- Хэрэв Firebase App Hosting ашиглах бол `apphosting.yaml` файлыг тохируулна.

## Тусламж

- Next.js болон Vercel-ийн албан ёсны баримт бичгийг уншина уу.
- Асуух зүйл байвал төслийн issue хэсэгт бичнэ үү.

---

Төслийг амжилттай байршуулж, хөгжүүлээрэй!
