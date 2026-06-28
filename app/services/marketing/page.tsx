"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MarketingServices() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-[#020202] text-slate-200 font-sans relative overflow-x-hidden" dir="rtl">

            {/* --- CSS מתקדם לאפקטים --- */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes star-move { from { transform: translateY(0); } to { transform: translateY(-2000px); } }
                .stars-layer-1 { background-image: radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)); background-size: 400px 400px; animation: star-move 100s linear infinite; opacity: 0.25; }
                .text-3d-premium { background: linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 4px 12px rgba(0,0,0,0.8)); }
                .dark-glass { background: rgba(10, 10, 10, 0.85); box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
                .timeline-glow { box-shadow: 0 0 20px rgba(99,102,241,0.8); }
                .luxury-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.03; mix-blend-mode: overlay; pointer-events: none; position: absolute; inset: 0; z-index: 1; }
            `}} />

            {/* --- רקע כוכבים ורעש --- */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#020202]">
                <div className="absolute inset-0 stars-layer-1"></div>
                <div className="luxury-noise"></div>
                {/* תאורה בצבע כחול/אינדיגו שמתאימה לשיווק */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-900/15 blur-[150px] rounded-full"></div>
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
                    <span className="text-indigo-400 font-bold tracking-widest text-sm uppercase mb-4 block drop-shadow-md">Performance Marketing & PPC</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 text-3d-premium">מכונת לידים<br/>מבוססת דאטה.</h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                        אנחנו לא אוספים לייקים, אנחנו מגדילים את שורת הרווח. מחלקת השיווק של LION GROUP משלבת קריאייטיב פסיכולוגי מדויק עם אלגוריתמים חכמים במטא, גוגל וטיקטוק כדי לייצר משפכי המרה קטלניים שמשאירים את המתחרים מאחור.
                    </p>
                </header>

                {/* =========================================
                    ציר זמן מטורף (Timeline)
                ========================================== */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-3d-premium">האנטומיה של קמפיין מנצח</h2>
                        <p className="text-lg text-slate-400">כך אנו הופכים תקציב פרסום למכונת הכנסות משומנת היטב.</p>
                    </div>

                    <div className="relative border-r-2 border-indigo-500/20 pr-8 md:pr-12 space-y-16 max-w-3xl mx-auto">
                        {[
                            { step: '01', title: 'מחקר, ריגול מתחרים ואסטרטגיה', desc: 'אנו מתחילים בפיצוח קהל היעד. מנתחים את המתחרים החזקים ביותר שלך, מזהים חולשות במסרים שלהם, ובונים עבורך "הצעת ערך בלתי ניתנת לסירוב" שתגרום ללקוחות להעדיף אותך.' },
                            { step: '02', title: 'קריאייטיב, קופי ומשפכי המרה', desc: 'כתיבת קופירייטינג ממיר מבוסס פסיכולוגיה צרכנית, עיצוב מודעות וידאו וסטטיק ברמת פרימיום, ובניית דפי נחיתה מהירים כטיל שמכוונים אך ורק לפעולה אחת – השארת פרטים או רכישה.' },
                            { step: '03', title: 'הקמה טכנית ומדידה (Tracking)', desc: 'התקנת פיקסלים מתקדמת, מעקבי Server-Side Tracking (CAPI) כדי לא לפספס אף נתון גם בעידן הפרטיות, והגדרת קהלי יעד חכמים מבוססי אלגוריתם (Lookalike, Retargeting).' },
                            { step: '04', title: 'אופטימיזציית AI וסקלביליות', desc: 'ברגע שהקמפיין באוויר, העבודה האמיתית מתחילה. מעקב יומי אחרי עלות לליד (CPL), ניתוח החזר השקעה (ROAS) ושינוי תקציבים בעזרת מודלים של בינה מלאכותית (AI) כדי למקסם תוצאות ולייצר צמיחה (Scale).' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative dark-glass p-8 rounded-3xl hover:-translate-x-2 transition-transform border border-indigo-500/10">
                                <div className="absolute top-1/2 -translate-y-1/2 -right-[43px] md:-right-[59px] w-5 h-5 bg-indigo-500 rounded-full timeline-glow border-4 border-black"></div>
                                <span className="text-indigo-400 font-black text-2xl block mb-3 drop-shadow-md">{item.step}</span>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg font-light">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* =========================================
                    דוגמאות לתוצאות (Case Studies)
                ========================================== */}
                <h2 className="text-4xl md:text-5xl font-black text-white mb-12 border-b border-white/10 pb-4 text-center text-3d-premium">תוצאות מהשטח - מקרי בוחן</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
                    <div className="dark-glass p-10 rounded-[2rem] border-t border-indigo-500/30 hover:-translate-y-2 transition-transform duration-500">
                        <div className="text-indigo-400 text-sm font-bold mb-4 tracking-widest uppercase">Meta Ads (Facebook/Insta)</div>
                        <h3 className="text-3xl font-black text-white mb-4">יזמות והתחדשות עירונית</h3>
                        <p className="text-slate-400 text-lg mb-8">
                            בנינו משפך שיווקי חכם שהחליף את הפניות ה"קרות" בלידים בשלים בלבד. דרך שילוב של סרטוני סמכות ותשובות לשאלות נפוצות במודעות, הגענו לירידה של 40% בעלות הליד תוך חודשיים.
                        </p>
                        <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]">+150 לידים חמים בחודש</div>
                    </div>

                    <div className="dark-glass p-10 rounded-[2rem] border-t border-blue-500/30 hover:-translate-y-2 transition-transform duration-500">
                        <div className="text-blue-400 text-sm font-bold mb-4 tracking-widest uppercase">Google Performance Max</div>
                        <h3 className="text-3xl font-black text-white mb-4">רשת איקומרס וקמעונאות אונליין</h3>
                        <p className="text-slate-400 text-lg mb-8">
                            העברנו את החנות מקמפיינים מסורתיים למערכת ה-AI של גוגל (PMax) עם פיד מוצרים מותאם אישית. אופטימיזציית מילים מתקדמת הכפילה את אחוזי הרכישה באתר בתוך רבעון.
                        </p>
                        <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">320% גידול ב-ROAS</div>
                    </div>

                    <div className="dark-glass p-10 rounded-[2rem] border-t border-pink-500/30 hover:-translate-y-2 transition-transform duration-500">
                        <div className="text-pink-400 text-sm font-bold mb-4 tracking-widest uppercase">TikTok & Social Media</div>
                        <h3 className="text-3xl font-black text-white mb-4">רשת קליניקות לרפואה אסתטית</h3>
                        <p className="text-slate-400 text-lg mb-8">
                            פצחנו את קהל היעד הצעיר דרך סרטוני UGC אותנטיים בטיקטוק ואינסטגרם. יצרנו קמפיין לידים אגרסיבי שמילא לרופאים את יומן הטיפולים חודש וחצי קדימה.
                        </p>
                        <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">יומנים מלאים 100%</div>
                    </div>

                    <div className="dark-glass p-10 rounded-[2rem] border-t border-emerald-500/30 hover:-translate-y-2 transition-transform duration-500">
                        <div className="text-emerald-400 text-sm font-bold mb-4 tracking-widest uppercase">LinkedIn & Google B2B</div>
                        <h3 className="text-3xl font-black text-white mb-4">חברת תוכנה ו-SaaS (B2B)</h3>
                        <p className="text-slate-400 text-lg mb-8">
                            יצירת מנגנון השגת פגישות דמו (Demo) עם מקבלי החלטות בחברות ענק. טרגוט חכם בלינקדאין שולב עם רימרקטינג אגרסיבי בגוגל וביוטיוב שהוביל לסגירת עסקאות High-Ticket.
                        </p>
                        <div className="text-5xl font-black text-white drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">₪500K עסקאות סגורות</div>
                    </div>
                </div>

                {/* =========================================
                    לקוחות ממליצים (ממוקד שיווק)
                ========================================== */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-3d-premium">עדויות מהשטח</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <TestimonialCard
                            text="אחרי שניסיתי לשווק בעצמי ועברתי דרך 3 סוכנויות שונות בלי לראות תוצאות, הגעתי ל-LION GROUP. תוך 3 שבועות הם הפכו לי את העסק עם כמות לידים שלא ידעתי איך להשתלט עליה."
                            author="רון ד."
                            role="בעלים, חברת שירותים"
                        />
                        <TestimonialCard
                            text="רמת השקיפות פסיכית. הקימו לנו דאשבורד נתונים שבו אנחנו רואים בדיוק כמה כל קליק עולה לנו, ואיזה קמפיין מביא לנו את הקונים הכי גדולים לחנות. ה-ROAS פשוט הכפיל את עצמו."
                            author="טלי ס."
                            role="מנהלת איקומרס"
                        />
                        <TestimonialCard
                            text="מה שאהבתי אצלם זה הגישה האגרסיבית לתוצאות. הם לא דיברו איתי על חשיפות ולייקים אלא רק על איך להוריד את מחיר הליד ולהגדיל את הסגירות. המלצה חמה!"
                            author="יונתן ר."
                            role="יזם נדל״ן"
                        />
                    </div>
                </section>

                <div className="text-center pb-20 border-b border-white/10">
                    <Link href="/#contact" className="inline-block px-14 py-6 bg-white text-black rounded-full font-black text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        בואו לבנות אסטרטגיה שיווקית שעובדת
                    </Link>
                </div>
            </div>

            {/* =========================================
                Footer (פוטר - זמין בכל עמוד)
            ========================================== */}
            <footer className="bg-[#020202] pt-24 pb-32 md:pb-12 relative z-10 px-4">
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
// קומפוננטת לקוחות
// ==========================================
function TestimonialCard({ text, author, role }: { text: string, author: string, role: string }) {
    return (
        <div className="dark-glass p-10 rounded-[3rem] text-right border border-white/10 relative hover:-translate-y-2 transition-transform duration-500">
            <div className="text-6xl text-white/10 font-serif absolute top-4 right-8 leading-none">"</div>
            <p className="text-slate-300 font-normal leading-relaxed mb-10 text-lg relative z-10">{text}</p>
            <div className="flex items-center gap-5 relative z-10 border-t border-white/10 pt-6">
                <div className="w-14 h-14 rounded-full border border-indigo-500/40 flex items-center justify-center text-white font-black text-xl bg-indigo-900/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
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