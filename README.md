# شاورما جمرة - موقع الطلب المباشر

موقع ويب ثابت (Static Site) لمطعم شاورما جمرة في تفوح، يتيح للزبون تصفح المنيو وإرسال الطلب مباشرة عبر واتساب.

## التقنية

- Vite + React + TypeScript
- Tailwind CSS
- خط Tajawal (محلي)
- بدون Backend / Database / Auth

## التشغيل المحلي

```bash
npm install
npm run dev
```

## البناء للإنتاج

```bash
npm run build
```

الناتج في مجلد `dist/`.

## النشر على Cloudflare Pages

1. اربط المستودع بـ Cloudflare Pages.
2. Build command: `npm run build`
3. Output directory: `dist`
4. لا حاجة لأي متغيرات بيئة.

أو ارفع مجلد `dist/` يدوياً عبر Cloudflare Dashboard.

## تعديل الأسعار والأصناف

كل البيانات في ملف واحد:

```
src/data/menu.ts
```

لتعديل سعر صنف، غيّر قيمة `price`. إذا لم يكن السعر محدداً بعد، اتركه `null`.

## إعدادات المطعم

كل الإعدادات في:

```
src/config/restaurant.ts
```

تشمل: رقم واتساب، العنوان، سعر التوصيل، مناطق التوصيل، روابط التواصل.

## الصور

ضع صور الأصناف في:

```
public/images/menu/
```

والشعار في:

```
public/logo.png
```

## الخط

خط Tajawal محلي في:

```
public/fonts/
```

الملفات المطلوبة:
- Tajawal-Regular.woff2
- Tajawal-Medium.woff2
- Tajawal-Bold.woff2

إذا لم تتوفر، سيستخدم النظام خط fallback تلقائياً.
