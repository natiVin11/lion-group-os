import './globals.css';
import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';

// הגדרת גופן פרימיום מובנה מבית גוגל לתמיכה מושלמת ועמוקה בעברית ובאנגלית
const heebo = Heebo({
    subsets: ['latin', 'hebrew'],
    weight: ['300', '400', '500', '700', '900'],
    variable: '--font-heebo', // מאפשר ל-Tailwind למשוך את הפונט דרך הקונפיגורציה
});

// הגדרות ה-SEO, ה-Open Graph והמיתוג של האתר למנועי חיפוש ורשתות חברתיות
export const metadata: Metadata = {
    title: 'LION GROUP | מעטפת דיגיטלית טוטאלית לעסקים',
    description: 'פתרונות טכנולוגיים ושיווקיים מתקדמים בקוד נקי: פיתוח אתרים ומערכות SaaS, שיווק דיגיטלי מבוסס דאטה (PPC), ואוטומציות AI ווואטסאפ לעסקים מובילים.',
    metadataBase: new URL('https://www.lion-group.co.il'), // החלף בכתובת הדומיין האמיתית שלך לאחר הרכישה
    alternates: {
        canonical: '/',
    },
    icons: {
        icon: '/logo.png', // מגדיר את הלוגו הרשמי של החברה כאיקון הלשונית (Favicon)
        apple: '/logo.png',
    },
    openGraph: {
        title: 'LION GROUP | מעטפת דיגיטלית טוטאלית לעסקים',
        description: 'פתרונות טכנולוגיים ושיווקיים מתקדמים בקוד נקי: פיתוח אתרים ומערכות SaaS, שיווק דיגיטלי (PPC), ואוטומציות AI.',
        url: 'https://www.lion-group.co.il',
        siteName: 'LION GROUP',
        locale: 'he_IL',
        type: 'website',
        images: [
            {
                url: '/logo.png', // התמונה שתוצג בשיתוף הלינק בוואטסאפ / פייסבוק
                width: 800,
                height: 800,
                alt: 'LION GROUP Logo',
            },
        ],
    },
};

// הגדרת הגדרות ה-Viewport למניעת בעיות זום במובייל
export const viewport = {
    themeColor: '#020202',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="he" dir="rtl" className={`${heebo.variable} scroll-smooth`}>
        <body className="bg-[#020202] text-slate-300 font-sans antialiased min-h-screen relative overflow-x-hidden">
        {/* הגדרת שכבת רעש/כוכבים גלובלית לכל עמודי האתר לחוויית Luxury אחידה */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

        {/* התוכן של העמודים מוזרק כאן */}
        <div className="relative z-10">
            {children}
        </div>
        </body>
        </html>
    );
}