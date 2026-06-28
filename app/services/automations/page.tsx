"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AutomationServices() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#020202] text-slate-200 font-sans relative overflow-x-hidden" dir="rtl">

            {/* --- CSS מתקדם לאפקטים --- */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes star-move { from { transform: translateY(0); } to { transform: translateY(-2000px); } }
                .stars-layer-1 { background-image: radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)); background-size: 400px 400px; animation: star-move 100s linear infinite; opacity: 0.25; }
                .text-3d-premium { background: linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 4px 12px rgba(0,0,0,0.8)); }
                .text-3d-gold { background: linear-gradient(180deg, #FDF0D5 0%, #D4AF37 50%, #997A00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 4px 10px rgba(0,0,0,0.8)); }
                .dark-glass { background: rgba(10, 10, 10, 0.85); box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
                .timeline-glow { box-shadow: 0 0 20px rgba(168,85,247,0.8); }
                .glow-button { box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.3), 0 0 25px rgba(255,255,255,0.15); }
                .glow-button:hover { box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3); }
                .luxury-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.03; mix-blend-mode: overlay; pointer-events: none; position: absolute; inset: 0; z-index: 1; }
            `}} />

            {/* --- רקע כוכבים ורעש --- */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#020202]">
                <div className="absolute inset-0 stars-layer-1"></div>
                <div className="luxury-noise"></div>
                {/* תאורה סגולה שמתאימה לבינה מלאכותית ואוטומציות */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-900/15 blur-[150px] rounded-full"></div>
            </div>

            {/* =========================================
                Navbar (תפריט עליון מלא)
            ========================================== */}
            <nav className={`fixed w-full z-50 top-0 transition-all duration-700 ${scrolled ? 'bg-[#050b14]/90 backdrop-blur-3xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center gap-4 group cursor-pointer z-50 relative">
                            <Link href="/" className="flex items-center gap-4">
                                <img src="/logo.png" alt="Lion Logo" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(218,165,32,0.4)] group-hover:scale-105 transition-transform duration-500" />
                                <span className="font-extrabold text-2xl tracking-[0.2em] text-white transition-all duration-700 drop-shadow-md hidden sm:block">
                                    LION<span className="text-blue-400 font-light">GROUP</span>
                                </span>
                            </Link>
                        </div>

                        <div className="hidden md:flex space-x-8 space-x-reverse items-center bg-white/5 px-8 py-3.5 rounded-full border border-white/10 backdrop-blur-xl">
                            <Link href="/#about" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">הסיפור שלנו</Link>
                            <Link href="/#services" className="text-sm font-semibold text-white transition-colors border-b border-white pb-1">שירותים</Link>
                            <Link href="/#portfolio" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">עבודות</Link>
                            <Link href="/#packages" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Premium</Link>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/#contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-white to-slate-200 text-black font-extrabold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                קביעת פגישה
                            </Link>
                        </div>

                        <div className="md:hidden flex items-center z-50">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* תפריט מובייל נפתח */}
                <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-[#050b14]/98 backdrop-blur-3xl transition-transform duration-700 flex flex-col pt-36 px-8 z-40 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/#about" className="text-4xl font-black text-white py-6 border-b border-white/5">הסיפור שלנו</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/#services" className="text-4xl font-black text-white py-6 border-b border-white/5">שירותים</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/#portfolio" className="text-4xl font-black text-white py-6 border-b border-white/5">תיק עבודות</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/#packages" className="text-4xl font-black text-white py-6 border-b border-white/5">Premium</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/#contact" className="text-3xl font-black text-blue-400 py-6 mt-8">קביעת פגישה &larr;</Link>
                </div>
            </nav>

            {/* =========================================
                Hero Section
            ========================================== */}
            <div className="pt-48 pb-24 px-4 max-w-7xl mx-auto relative z-10">
                <header className="mb-24 text-center">
                    <span className="text-purple-500 font-bold tracking-widest text-sm uppercase mb-4 block drop-shadow-md">AI & API Integrations</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 text-3d-premium">אוטומציות ובוטים<br/>על טייס אוטומטי.</h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                        הפסיקו לרדוף אחרי העבודה, תנו לטכנולוגיה לעבוד בשבילכם. אנו מפתחים אינטגרציות מתקדמות, בוטים מבוססי בינה מלאכותית לוואטסאפ וחיבורי CRM שמייעלים את העסק, חוסכים כוח אדם ומונעים טעויות אנוש לחלוטין.
                    </p>
                </header>

                {/* =========================================
                    ציר זמן (Timeline) - איך הופכים עסק לאוטומטי?
                ========================================== */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-3d-premium">השיטה להפיכת העסק לאוטומטי</h2>
                        <p className="text-lg text-slate-400">תהליך אפיון ופיתוח קפדני המבטיח שמערכות המידע יעבדו בסנכרון מושלם.</p>
                    </div>

                    <div className="relative border-r-2 border-purple-500/20 pr-8 md:pr-12 space-y-16 max-w-3xl mx-auto">
                        {[
                            { step: '01', title: 'מיפוי וניתוח צווארי בקבוק', desc: 'אנו צוללים אל תוך העסק שלכם ומזהים איפה מבזבזים הכי הרבה כוח אדם וזמן יקר: מענה ידני וחוזר ללידים, תיאום פגישות, שליחת מסמכים או הקלדת נתונים מרובה בין מערכות.' },
                            { step: '02', title: 'אפיון תרשים זרימה (Flow Architecture)', desc: 'שרטוט מדויק וויזואלי של תהליך האוטומציה ומסע הלקוח. נגדיר בדיוק מה קורה כשהליד לוחץ על מודעה, מה הבוט עונה לו שלב-אחר-שלב, ולאן הנתונים מועברים בסוף התהליך.' },
                            { step: '03', title: 'פיתוח והטמעה (API & Webhooks)', desc: 'פיתוח הבוט (Node.js/Python), חיבור רשמי ל-WhatsApp Business API להבטחת יציבות, והגדרת תרחישים מורכבים במערכות אוטומציה מתקדמות כמו Make.com ו-Zapier.' },
                            { step: '04', title: 'חיבור למערכות ניהול (CRM)', desc: 'סנכרון מלא דו-כיווני. כל ליד חם שעבר את התשאול של הבוט מוזרם ישירות למערכת ה-CRM, פותח כרטיסיה מסודרת, ושולח התראת Push / Telegram לסוכן המכירות בזמן אמת.' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative dark-glass p-8 rounded-3xl hover:-translate-x-2 transition-transform border border-purple-500/10">
                                <div className="absolute top-1/2 -translate-y-1/2 -right-[43px] md:-right-[59px] w-5 h-5 bg-purple-500 rounded-full timeline-glow border-4 border-black"></div>
                                <span className="text-purple-400 font-black text-2xl block mb-3 drop-shadow-md">{item.step}</span>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* =========================================
                    דוגמאות לתהליכים (Case Studies)
                ========================================== */}
                <h2 className="text-4xl md:text-5xl font-black text-white mb-12 border-b border-white/10 pb-4 text-center text-3d-premium">המערכות שחסכו ללקוחותינו אלפי שעות</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">

                    <div className="dark-glass p-10 rounded-[2rem] border-t border-purple-500/30 hover:-translate-y-2 transition-transform duration-500">
                        <div className="text-purple-400 text-sm font-bold mb-4 tracking-widest uppercase">WhatsApp AI Bot</div>
                        <h3 className="text-3xl font-black text-white mb-4">בוט תשאול, סינון ותיאום פגישות</h3>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            בוט חכם שפונה מידית לכל ליד חדש שנכנס מקמפיינים ממומנים. הבוט עורך תשאול קצר ואינטראקטיבי ("מאיזו עיר?", "מה טווח התקציב?"), ומעביר ל-CRM רק את הלידים האיכותיים באמת, תוך שהוא מאפשר ללקוח לתאם פגישה ישירות מול יומן הצוות.
                        </p>
                    </div>

                    <div className="dark-glass p-10 rounded-[2rem] border-t border-pink-500/30 hover:-translate-y-2 transition-transform duration-500">
                        <div className="text-pink-400 text-sm font-bold mb-4 tracking-widest uppercase">Make.com Integrations</div>
                        <h3 className="text-3xl font-black text-white mb-4">מערכת קליטת לידים מרובת-ערוצים</h3>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            מערכת ששואבת לידים מפייסבוק, גוגל, דפי נחיתה וטיקטוק למקום אחד. המערכת פותחת אוטומטית כרטיס ב-CRM, שולחת במקביל הודעת SMS אישית ללקוח ("היי נתנאל, קיבלנו את פנייתך"), ושולחת התראת טלגרם למנהל המכירות.
                        </p>
                    </div>

                    <div className="dark-glass p-10 rounded-[2rem] border-t border-blue-500/30 hover:-translate-y-2 transition-transform duration-500">
                        <div className="text-blue-400 text-sm font-bold mb-4 tracking-widest uppercase">E-Commerce Automation</div>
                        <h3 className="text-3xl font-black text-white mb-4">מערכת לשחזור עגלות נטושות</h3>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            חיבור פלטפורמת חנות וירטואלית (Shopify / WooCommerce) למערכת הדיוור. ברגע שלקוח נוטש עגלת קניות, נשלחת אליו לאחר שעה הודעת וואטסאפ אישית אוטומטית המכילה קופון הנחה שמעודד השלמת רכישה באופן מיידי.
                        </p>
                    </div>

                    <div className="dark-glass p-10 rounded-[2rem] border-t border-emerald-500/30 hover:-translate-y-2 transition-transform duration-500">
                        <div className="text-emerald-400 text-sm font-bold mb-4 tracking-widest uppercase">Financial Integrations</div>
                        <h3 className="text-3xl font-black text-white mb-4">הפקת חשבוניות ללא מגע יד אדם</h3>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            סנכרון מלא בין אתר הסליקה למערכת הנהלת החשבונות (כמו iCount או Morning). עם אישור התשלום, מופקת קבלה באופן אוטומטי, נשלחת למייל הלקוח, והסטטוס מתעדכן בתיק הלקוח ב-CRM באופן מיידי.
                        </p>
                    </div>

                </div>

                {/* =========================================
                    חבילות (Packages) - נמשך מפאנל ניהול
                ========================================== */}
                <section id="packages" className="mb-32">
                    <div className="text-center mb-16">
                        <span className="text-3d-gold text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Pricing Options</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-3d-premium">חבילות אוטומציה לעסקים</h2>
                        <p className="text-lg text-slate-400">חבילות מותאמות אישית שהוגדרו דרך פאנל הניהול.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <PackageCard
                            title="Bot Starter"
                            price="₪2,500"
                            desc="בוט וואטסאפ חכם לעסקים שרוצים מענה אוטומטי מהיר ללידים חדשים."
                            features={['תפריט שאלות נפוצות מובנה', 'איסוף שם, טלפון ומייל אוטומטי', 'שליחת התראה למנהל העסק', 'הקמה מהירה תוך 7 ימי עסקים']}
                        />
                        <PackageCard
                            title="Lion OS Auto"
                            price="₪7,500"
                            desc="מערכת אוטומציה טוטאלית. לידים, CRM, בוט מתקדם וסנכרון מלא של האופרציה."
                            features={['חיבור מלא ל-CRM (Manage/Zoho)', 'תשאול וסינון לידים מתקדם ב-AI', 'מערכת פולו-אפ אוטומטית בוואטסאפ', 'אוטומציית הנהלת חשבונות']}
                            isGold={true}
                        />
                    </div>
                </section>

                {/* =========================================
                    לקוחות ממליצים
                ========================================== */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-3d-premium">לקוחות שחסכו זמן וכסף</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <TestimonialCard
                            text="מאז שחיברנו את בוט הוואטסאפ של LION GROUP, חסכנו למזכירות שלנו לפחות 4 שעות ביום של עבודה ידנית. הלידים פשוט נכנסים ל-CRM מסודרים עם כל המידע שצריך."
                            author="מיכל ק."
                            role="מנהלת שירות לקוחות"
                        />
                        <TestimonialCard
                            text="האוטומציות שעשו לנו במערך המכירות פשוט שינו את כללי המשחק. הלקוח מקבל מענה בשנייה שהוא משאיר פרטים. אחוזי הסגירה שלנו זינקו בעשרות אחוזים."
                            author="אביב מ."
                            role="סמנכ״ל מכירות בנדל״ן"
                        />
                        <TestimonialCard
                            text="שחזור העגלות הנטושות שמערכת ההודעות האוטומטית עושה הכניס לנו החודש מעל 40,000 ש״ח שלקוחות פשוט נטשו. טכנולוגיה מטורפת שמייצרת רווח מיידי."
                            author="דנה י."
                            role="בעלת רשת איקומרס"
                        />
                    </div>
                </section>

                {/* =========================================
                    שאלות נפוצות וטופס יצירת קשר
                ========================================== */}
                <section id="contact" className="relative bg-transparent z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-24">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-10 text-center text-3d-premium">שאלות נפוצות</h2>
                            <div className="space-y-4">
                                {[
                                    { q: 'האם המערכת שלכם בטוחה ולא תחסום לי את הוואטסאפ?', a: 'לחלוטין כן. אנו מפתחים בוטים שמבוססים אך ורק על החיבור הרשמי של WhatsApp Business API מול חברת Meta. זה מבטיח יציבות של 100% ללא סכנת חסימה, בניגוד לפתרונות פיראטיים.' },
                                    { q: 'לאילו מערכות CRM אתם יודעים להתחבר?', a: 'לכולן. אנו מתמחים בחיבורי API ו-Webhooks למערכות כמו Salesforce, Zoho, Monday, PipeDrive, מערכות ניהול נדל"ן (BMatch), ואפילו ל-Google Sheets.' },
                                    { q: 'כמה זמן לוקח להקים מערכת אוטומציה כזו?', a: 'זמן ההקמה נע בין שבוע לבוט בסיסי, ועד חודש למערך אוטומציות מקיף הכולל אינטגרציות מרובות מול מחלקות הכספים והשיווק של העסק.' }
                                ].map((faq, index) => (
                                    <div key={index} className="dark-glass rounded-2xl overflow-hidden cursor-pointer hover:border-white/30 transition-colors" onClick={() => toggleFaq(index)}>
                                        <div className="p-6 flex justify-between items-center">
                                            <h4 className="text-lg font-bold text-white">{faq.q}</h4>
                                            <span className="text-slate-500 font-black text-xl">{openFaq === index ? '−' : '+'}</span>
                                        </div>
                                        <div className={`px-6 pb-6 text-slate-400 font-light leading-relaxed transition-all duration-300 ${openFaq === index ? 'block' : 'hidden'}`}>
                                            {faq.a}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="dark-glass rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]"></div>

                            <div className="text-center mb-16 relative z-10">
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 text-3d-premium">בואו לייעל את העסק.</h2>
                                <p className="text-slate-400 text-lg font-light">השאירו פרטים, ואינה מצוות LION GROUP תחזור אליכם לשיחת אפיון ראשונית ללא עלות.</p>
                            </div>

                            <form className="space-y-8 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <input type="text" className="w-full bg-[#0a0a0a]/50 border-b-2 border-white/20 px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:bg-[#111] transition-all placeholder:text-slate-600 text-lg rounded-t-xl" placeholder="שם מלא" />
                                    <input type="tel" className="w-full bg-[#0a0a0a]/50 border-b-2 border-white/20 px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:bg-[#111] transition-all placeholder:text-slate-600 text-lg rounded-t-xl" placeholder="מספר טלפון נייד" />
                                </div>
                                <select className="w-full bg-[#0a0a0a]/50 border-b-2 border-white/20 px-4 py-4 text-white focus:outline-none focus:border-purple-500 focus:bg-[#111] transition-all appearance-none cursor-pointer text-lg rounded-t-xl">
                                    <option className="bg-black">במה תרצו שנעזור לכם?</option>
                                    <option className="bg-black">עיצוב ופיתוח אתר / מערכת</option>
                                    <option className="bg-black">שיווק דיגיטלי ממומן</option>
                                    <option className="bg-black">אוטומציות, בוטים ו-CRM</option>
                                </select>
                                <button type="button" className="w-full bg-gradient-to-r from-white to-slate-300 text-black font-black text-xl py-6 rounded-2xl glow-button transition-transform transform hover:-translate-y-2 mt-8 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                                    שגרו אליי את ההצעה
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

            {/* =========================================
                Footer (פוטר - זמין בכל עמוד)
            ========================================== */}
            <footer className="bg-[#020202] border-t border-white/5 pt-24 pb-32 md:pb-12 relative z-10 px-4">
                <div className="max-w-7xl mx-auto relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-center md:text-right">
                        <div className="md:col-span-2">
                            <img src="/logo.png" alt="Lion Logo" className="w-20 h-20 object-contain mb-6 mx-auto md:mx-0 drop-shadow-[0_0_15px_rgba(218,165,32,0.3)]"/>
                            <span className="font-extrabold text-4xl tracking-widest text-white mb-6 block drop-shadow-md">LION<span className="text-blue-500 font-light">GROUP</span></span>
                            <p className="text-slate-500 text-sm leading-loose max-w-sm mx-auto md:mx-0 font-light">
                                בניית מעטפת דיגיטלית טוטאלית. אנו מספקים פתרונות תוכנה, עיצוב אתרים ושיווק לעסקים שרוצים להוביל את השוק. פועלים מאשקלון, מעניקים שירות בפריסה ארצית ובינלאומית.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-8 text-lg uppercase tracking-wider">ניווט מהיר</h4>
                            <ul className="space-y-4 text-slate-400 text-sm font-medium">
                                <li><Link href="/services/web" className="hover:text-white transition-colors">פיתוח אתרים ו-SaaS</Link></li>
                                <li><Link href="/services/marketing" className="hover:text-white transition-colors">שיווק דיגיטלי (PPC)</Link></li>
                                <li><Link href="/services/automations" className="hover:text-white transition-colors">אוטומציות ובוטים</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-8 text-lg uppercase tracking-wider">מרכז מידע</h4>
                            <ul className="space-y-4 text-slate-400 text-sm font-medium">
                                <li><Link href="/terms" className="hover:text-white transition-colors">תקנון האתר ותנאי שימוש</Link></li>
                                <li><Link href="/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link></li>
                                <li><Link href="/accessibility" className="hover:text-white transition-colors">הצהרת נגישות</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-medium tracking-wide">
                        <p className="mb-4 md:mb-0">© {new Date().getFullYear()} LION GROUP. כל הזכויות שמורות.</p>
                        <p>Designed by Lion Group Engineers</p>
                    </div>
                </div>
            </footer>

            {/* --- Floating Actions & WhatsApp --- */}
            <button className="fixed bottom-28 md:bottom-8 right-6 md:right-8 z-50 dark-glass p-4 rounded-full shadow-2xl border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300" aria-label="תפריט נגישות">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>

            <a href="https://wa.me/972501234567" target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 flex items-center justify-center gap-4 group">
                <div className="hidden md:flex absolute left-24 dark-glass px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap transform -translate-x-4 group-hover:translate-x-0 border border-white/10">
                    התייעצו עם אינה בוואטסאפ
                </div>
                <div className="relative bg-white text-black p-4 md:p-5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] group-hover:scale-110 transition-all duration-500 flex items-center justify-center border border-white/20">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </div>
            </a>
        </div>
    );
}

// ==========================================
// קומפוננטות עזר לעיצוב פנימי
// ==========================================

function TestimonialCard({ text, author, role }: { text: string, author: string, role: string }) {
    return (
        <div className="dark-glass p-10 rounded-[3rem] text-right border border-white/10 relative hover:-translate-y-2 transition-transform duration-500">
            <div className="text-6xl text-white/10 font-serif absolute top-4 right-8 leading-none">"</div>
            <p className="text-slate-300 font-normal leading-relaxed mb-10 text-lg relative z-10">{text}</p>
            <div className="flex items-center gap-5 relative z-10 border-t border-white/10 pt-6">
                <div className="w-14 h-14 rounded-full border border-purple-500/40 flex items-center justify-center text-white font-black text-xl bg-purple-900/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    {author.charAt(0)}
                </div>
                <div>
                    <h4 className="text-white font-bold text-lg">{author}</h4>
                    <p className="text-slate-500 text-xs tracking-widest uppercase">{role}</p>
                </div>
            </div>
        </div>
    );
}

function PackageCard({ title, price, desc, features, isGold = false }: { title: string, price: string, desc: string, features: string[], isGold?: boolean }) {
    return (
        <div className={`dark-glass rounded-[3rem] p-10 md:p-14 relative transition-transform duration-500 hover:-translate-y-2 ${isGold ? 'border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.05)]' : ''}`}>
            {isGold && (
                <div className="absolute top-8 left-8 bg-white text-black text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                    Popular
                </div>
            )}
            <h4 className={`text-2xl font-black mb-4 ${isGold ? 'text-3d-gold' : 'text-white'}`}>{title}</h4>
            <div className="text-4xl md:text-5xl font-black text-white mb-6">{price}</div>
            <p className="text-slate-400 text-sm md:text-base mb-10 font-light min-h-[3rem]">{desc}</p>
            <ul className="space-y-5 mb-12">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm md:text-base text-slate-300 font-light border-b border-white/5 pb-4 last:border-0">
                        <span className="text-purple-400 ml-4 font-black text-lg leading-none">·</span> {feature}
                    </li>
                ))}
            </ul>
            <Link href="#contact" className={`block w-full text-center py-5 rounded-2xl font-black text-lg transition-all ${isGold ? 'bg-white text-black hover:bg-slate-200' : 'border border-white/20 text-white hover:bg-white/10'}`}>
                בחירת חבילה
            </Link>
        </div>
    );
}