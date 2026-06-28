import type { Config } from "tailwindcss";

const config: Config = {
    // הגדרת הנתיבים לסריקת קלאסים - כולל תמיכה מלאה בתיקיות הפרויקט של Next.js
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // סנכרון משתנה הפונט הייעודי מתוך ה-Root Layout
            fontFamily: {
                sans: ["var(--font-heebo)", "sans-serif"],
            },
            // פלטת צבעי מותג יוקרתית לשימוש מהיר ברחבי האתר (למשל: text-gold או bg-brand-dark)
            colors: {
                brand: {
                    dark: "#020202",
                    slate: "#050b14",
                    glass: "rgba(10, 10, 10, 0.85)",
                },
                gold: {
                    light: "#FDF0D5",
                    DEFAULT: "#D4AF37",
                    dark: "#997A00",
                },
            },
            // הגדרת האנימציות הדינמיות ישירות בתוך מנוע הליבה של Tailwind
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "star-move": {
                    "0%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(-2000px)" },
                },
            },
            animation: {
                marquee: "marquee 25s linear infinite",
                "stars-fast": "star-move 100s linear infinite",
                "stars-slow": "star-move 150s linear infinite",
            },
        },
    },
    plugins: [],
};

export default config;