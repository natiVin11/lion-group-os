"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

// הגדרת סוגי הנתונים שמגיעים מהשרת
interface Props {
    packages: any[];
    portfolios: any[];
    testimonials: any[];
    logos: any[];
    forwardingNumber: string;
}

export default function HomePageClient({ packages, portfolios, testimonials, logos, forwardingNumber }: Props) {
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
        <div className="min-h-screen bg-[#020202] font-sans text-slate-300 selection:bg-blue-500 selection:text-white relative overflow-x-hidden" dir="rtl">

            {/* --- סטיילס גלובליים ואנימציות --- */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes star-move { from { transform: translateY(0); } to { transform: translateY(-2000px); } }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 25s linear infinite; }
                .stars-layer-1 { background-image: radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 90px 40px, #ffffff, rgba(0,0,0,0)); background-repeat: repeat; background-size: 400px 400px; animation: star-move 100s linear infinite; opacity: 0.3; }
                .stars-layer-2 { background-image: radial-gradient(1.5px 1.5px at 50px 160px, rgba(255,255,255,0.9), rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 280px, #ffffff, rgba(0,0,0,0)); background-repeat: repeat; background-size: 500px 500px; animation: star-move 150s linear infinite; opacity: 0.5; }
                .text-3d-premium { background: linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 4px 12px rgba(0,0,0,0.8)); }
                .text-3d-gold { background: linear-gradient(180deg, #FDF0D5 0%, #D4AF37 50%, #997A00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 4px 10px rgba(0,0,0,0.8)); }
                .dark-glass { background: linear-gradient(145deg, rgba(30,35,45,0.7) 0%, rgba(10,15,20,0.9) 100%); box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.9); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.08); }
                .timeline-glow { box-shadow: 0 0 20px rgba(59,130,246,0.8); }
                .glow-button { box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.3), 0 0 25px rgba(255,255,255,0.15); }
                .glow-button:hover { box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3); }
                .luxury-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.03; mix-blend-mode: overlay; pointer-events: none; position: absolute; inset: 0; z-index: 1; }
            `}} />

            {/* --- Navbar (ניווט עליון) --- */}
            <nav className={`fixed w-full z-50 top-0 transition-all duration-700 ${scrolled ? 'bg-[#050b14]/90 backdrop-blur-3xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center gap-4 group cursor-pointer z-50 relative">
                            <img src="/logo.png" alt="Lion Logo" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(218,165,32,0.4)] group-hover:scale-105 transition-transform duration-500" />
                            <span className="font-extrabold text-2xl tracking-[0.2em] text-white transition-all duration-700 drop-shadow-md hidden sm:block">
                                LION<span className="text-blue-400 font-light">GROUP</span>
                            </span>
                        </div>

                        <div className="hidden md:flex space-x-8 space-x-reverse items-center bg-white/5 px-8 py-3.5 rounded-full border border-white/10 backdrop-blur-xl">
                            <Link href="#process" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">איך זה עובד</Link>
                            <Link href="#services" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">שירותים</Link>
                            <Link href="#portfolio" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">עבודות נבחרות</Link>
                            <Link href="#packages" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Premium</Link>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <Link href="#contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-white to-slate-200 text-black font-extrabold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
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

                <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-[#050b14]/95 backdrop-blur-3xl transition-transform duration-700 flex flex-col pt-36 px-8 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="#process" className="text-4xl font-black text-white py-6 border-b border-white/5">איך זה עובד</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="#services" className="text-4xl font-black text-white py-6 border-b border-white/5">שירותים</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="#portfolio" className="text-4xl font-black text-white py-6 border-b border-white/5">עבודות</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="#packages" className="text-4xl font-black text-white py-6 border-b border-white/5">Premium</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="#contact" className="text-3xl font-black text-blue-400 py-6 mt-8">קביעת פגישה &larr;</Link>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <section className="relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-black pt-48 pb-32 md:pt-56 md:pb-48 z-10 px-4 flex flex-col items-center justify-center min-h-screen">
                <div className="absolute inset-0 stars-layer-1"></div>
                <div className="absolute inset-0 stars-layer-2"></div>
                <div className="luxury-noise"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-20">
                    <div className="relative group mb-8">
                        <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>
                        <img src="/logo.png" alt="Lion Logo" className="relative w-56 h-56 md:w-72 md:h-72 object-contain drop-shadow-[0_0_50px_rgba(218,165,32,0.4)] group-hover:scale-105 transition-transform duration-500"/>
                    </div>

                    <h1 className="text-[4rem] md:text-8xl lg:text-[9rem] font-black tracking-tighter mb-8 leading-[1.1] text-3d-premium">
                        העתיד של <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white">הדיגיטל.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                        טכנולוגיה עלית פוגשת שיווק מבוסס נתונים. בניית אתרים מורכבים, איקומרס, קמפיינים אגרסיביים ובוטים חכמים. אנו בונים מעטפת שמעניקה לעסק שלך יתרון לא הוגן בשוק.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-md sm:max-w-none">
                        <Link href="#contact" className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full font-black text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3 border border-blue-400/30">
                            קבע פגישת אפיון
                        </Link>
                        <Link href="#portfolio" className="w-full sm:w-auto px-12 py-5 dark-glass text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:-translate-y-1 text-center">
                            צפה בעבודות שלנו
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- Marquee (דינמי) --- */}
            <div className="bg-[#050505] py-5 overflow-hidden border-y border-white/10 relative z-20">
                <div className="flex animate-marquee whitespace-nowrap gap-16 font-bold text-slate-400 text-lg uppercase tracking-widest">
                    {logos.length > 0 ? (
                        <>
                            <span>{logos.map(l => `★ ${l.name} `).join('')}</span>
                            <span>{logos.map(l => `★ ${l.name} `).join('')}</span>
                            <span>{logos.map(l => `★ ${l.name} `).join('')}</span>
                        </>
                    ) : (
                        <>
                            <span>★ פיתוח SaaS ★ שיווק ממומן ★ בוטים לוואטסאפ ★ מערכות CRM ★ איקומרס ★ פיתוח בהתאמה אישית ★</span>
                            <span>★ פיתוח SaaS ★ שיווק ממומן ★ בוטים לוואטסאפ ★ מערכות CRM ★ איקומרס ★ פיתוח בהתאמה אישית ★</span>
                        </>
                    )}
                </div>
            </div>

            {/* --- Metrics --- */}
            <section id="metrics" className="py-32 relative z-20 bg-gradient-to-b from-[#050505] to-[#020202] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-6 block">The Lion Advantage</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 text-3d-premium">מספרים שמדברים בעד עצמם.</h2>
                        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto">אנחנו לא מאמינים בהבטחות, אלא בתוצאות אמיתיות שניתן למדוד. המערכות שלנו מייצרות אימפקט ישיר על שורת הרווח.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="dark-glass p-10 rounded-[2rem] text-center border-t border-blue-500/30 hover:-translate-y-2 transition-transform">
                            <div className="text-5xl font-black text-white mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">+250%</div>
                            <div className="text-slate-400 font-medium">גידול ממוצע בהמרות</div>
                        </div>
                        <div className="dark-glass p-10 rounded-[2rem] text-center border-t border-indigo-500/30 hover:-translate-y-2 transition-transform">
                            <div className="text-5xl font-black text-white mb-4 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">24/7</div>
                            <div className="text-slate-400 font-medium">בוטים ואוטומציות שעובדים</div>
                        </div>
                        <div className="dark-glass p-10 rounded-[2rem] text-center border-t border-purple-500/30 hover:-translate-y-2 transition-transform">
                            <div className="text-5xl font-black text-white mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">99.9%</div>
                            <div className="text-slate-400 font-medium">Uptime וזמינות שרתים</div>
                        </div>
                        <div className="dark-glass p-10 rounded-[2rem] text-center border-t border-yellow-500/30 hover:-translate-y-2 transition-transform">
                            <div className="text-5xl font-black text-white mb-4 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]">₪10M+</div>
                            <div className="text-slate-400 font-medium">היקף מכירות ללקוחותינו</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Timeline --- */}
            <section id="process" className="py-32 relative z-20 bg-[#020202] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-24">
                        <span className="text-indigo-500 font-bold tracking-widest text-sm uppercase mb-6 block">Our Blueprint</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 text-3d-premium">איך אנחנו מטיסים את העסק שלך.</h2>
                        <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto">משלב הרעיון ועד למכונת רווחים אוטומטית. תהליך מדויק המשלב טכנולוגיה, קריאייטיב ודאטה.</p>
                    </div>

                    <div className="relative border-r-2 border-indigo-500/20 pr-8 md:pr-12 space-y-16 max-w-3xl mx-auto">
                        {[
                            { step: '01', title: 'אסטרטגיה ומיפוי טכנולוגי', desc: 'אנו צוללים אל תוך העסק שלך, מנתחים את המתחרים, מזהים צווארי בקבוק וקובעים איזו ארכיטקטורת תוכנה (Web) או משפך שיווקי יעניקו לך את ה-ROI הגבוה ביותר.' },
                            { step: '02', title: 'עיצוב פרימיום ופיתוח תוכנה', desc: 'צוות הפיתוח שלנו בונה את הפלטפורמה מאפס (React, Next.js, Python). במקביל, הסטודיו שלנו יוצר ממשקי משתמש (UI/UX) מרהיבים שמותאמים פסיכולוגית להמרות.' },
                            { step: '03', title: 'שיווק אגרסיבי והטמעת בוטים', desc: 'השקת קמפיינים חכמים במטא ובגוגל. כל ליד שנכנס עובר סינון אוטומטי על ידי הבוטים מבוססי ה-AI שלנו בוואטסאפ, ומוזרם מסודר ל-CRM.' },
                            { step: '04', title: 'אופטימיזציה, סקייל וצמיחה', desc: 'העבודה לא נגמרת בהשקה. אנו מנטרים נתונים יומיים, משפרים זמני טעינה, מורידים את העלות לליד (CPL) ומכפילים את תקציבי השיווק ברגע שמזהים רווחיות קבועה.' }
                        ].map((item, idx) => (
                            <div key={idx} className="relative dark-glass p-8 rounded-3xl hover:-translate-x-2 transition-transform border border-indigo-500/10">
                                <div className="absolute top-1/2 -translate-y-1/2 -right-[43px] md:-right-[59px] w-5 h-5 bg-indigo-500 rounded-full timeline-glow border-4 border-black"></div>
                                <span className="text-indigo-400 font-black text-2xl block mb-2">{item.step}</span>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Services --- */}
            <section id="services" className="py-32 relative z-20 bg-gradient-to-b from-[#020202] to-[#050505] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 text-3d-premium">תחומי התמחות</h2>
                        <p className="text-xl text-slate-400 font-light">לחצו על השירות לקריאה מורחבת על התהליך.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ServiceCard title="פיתוח אתרים ו-SaaS" subtitle="Web Engineering" desc="ארכיטקטורה מותאמת אישית: מחנויות איקומרס ועד מערכות ניהול מורכבות. קוד נקי, אבטחה מקסימלית וביצועים מטורפים." link="/services/web" />
                        <ServiceCard title="שיווק דיגיטלי מבוסס דאטה" subtitle="Performance Marketing" desc="אנו יוצרים משפכים חכמים וקמפיינים אגרסיביים במטא ובגוגל כדי לייצר מכונת לידים בלתי פוסקת לעסק שלך." link="/services/marketing" />
                        <ServiceCard title="אוטומציות, בוטים ו-CRM" subtitle="AI & Integrations" desc="שחרר את הצוות שלך מעבודה שחורה. אינטגרציות API, בוטים חכמים לוואטסאפ וחיבור ישיר למערכות CRM לניהול עסק על טייס אוטומטי." link="/services/automations" />
                    </div>
                </div>
            </section>

            {/* --- Portfolio (דינמי) --- */}
            <section id="portfolio" className="py-32 relative z-20 bg-[#020202] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="text-center mb-24">
                        <span className="text-slate-500 font-bold tracking-widest text-sm uppercase mb-6 block">Showcase</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 text-3d-premium">עבודות נבחרות.</h2>
                        <p className="text-xl text-slate-400 font-light">הצצה לפרויקטים, לעיצובים ולפלטפורמות טכנולוגיות שפיתחנו עבור הלקוחות שלנו.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {portfolios.length > 0 ? (
                            portfolios.map(item => (
                                <PortfolioCard key={item.id} title={item.title} category={item.category} image={item.imageUrl} link={item.link} />
                            ))
                        ) : (
                            <>
                                <PortfolioCard title="פלטפורמת SaaS לניהול נדל״ן" category="React & Node.js" image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426" />
                                <PortfolioCard title="חנות E-Commerce יוקרתית" category="Next.js" image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2550" />
                                <PortfolioCard title="אתר תדמית מתקדם" category="WordPress" image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672" />
                                <PortfolioCard title="דאשבורד CRM ארגוני" category="Python / SQLite" image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670" />
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* --- Packages (דינמי) --- */}
            <section id="packages" className="relative bg-gradient-to-b from-[#0a0f1c] to-[#02050a] py-32 z-10 overflow-hidden border-b border-white/5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="luxury-noise"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                    <div className="text-center mb-24">
                        <span className="text-3d-gold text-sm font-bold tracking-[0.3em] uppercase mb-6 block">Pricing</span>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-6 text-3d-premium">חבילות Premium</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {packages.length > 0 ? (
                            packages.map(pkg => (
                                <PackageCard key={pkg.id} title={pkg.title} price={pkg.price} desc={pkg.description} features={pkg.features.split(',')} isGold={pkg.isGold} />
                            ))
                        ) : (
                            <>
                                <PackageCard title="Business Identity" price="החל מ-₪3,500" desc="אתר תדמית יוקרתי, מעוצב מאפס לשדרוג מיתוג העסק ברשת." features={['עיצוב פרימיום', 'SEO מובנה', 'פאנל ניהול עצמאי', 'חיבור לוואטסאפ']} />
                                <PackageCard title="SaaS & E-Commerce" price="החל מ-₪7,500" desc="חנות וירטואלית או פלטפורמה לניהול תהליכים." features={['סליקה מאובטחת', 'ניהול מלאי אוטומטי', 'אינטגרציות API']} isGold={true} />
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* --- Testimonials (דינמי) --- */}
            <section className="py-24 bg-black/40 relative z-10 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-3d-premium">לקוחות מדברים תוצאות</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.length > 0 ? (
                            testimonials.map(t => <TestimonialCard key={t.id} text={t.text} author={t.author} role={t.role} />)
                        ) : (
                            <>
                                <TestimonialCard text="האתר שבנו לנו מטורף. העיצוב יוקרתי, המערכת מהירה בטירוף, ופאנל הניהול פשוט להבנה." author="דניאל מ." role="מנכ״ל יזמות נדל״ן" />
                                <TestimonialCard text="האוטומציות לוואטסאפ חסכו לצוות שלי 4 שעות ביום. הלידים נקלטים אוטומטית ל-CRM." author="מיכל ק." role="מנהלת שירות ומכירות" />
                                <TestimonialCard text="שקיפות מלאה ולידים רותחים. מרגישים שיש כאן צוות של מהנדסים." author="יוסי א." role="בעלים רשת קמעונאות" />
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* --- Contact & FAQ --- */}
            <section id="contact" className="relative bg-[#000000] py-32 z-10">
                <div className="luxury-noise"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-20">
                    <div className="mb-24">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-10 text-center text-3d-premium">שאלות נפוצות</h2>
                        <div className="space-y-4">
                            {[
                                { q: 'האם אתם בונים אתרים מאפס או מתבניות?', a: 'אנו מפתחים מערכות ואתרים מותאמים אישית (Custom Made) מאפס.' },
                                { q: 'האם האתרים שלכם מותאמים למובייל?', a: 'בהחלט. כל פרויקט נבנה בגישת Mobile-First לתצוגה מושלמת וחווית משתמש חלקה.' },
                                { q: 'מהם הבוטים לוואטסאפ שאתם מספקים?', a: 'אנו מפתחים אינטגרציות מבוססות בינה מלאכותית לוואטסאפ העסקי (API).' }
                            ].map((faq, index) => (
                                <div key={index} className="dark-glass rounded-2xl overflow-hidden cursor-pointer hover:border-white/30 transition-colors" onClick={() => toggleFaq(index)}>
                                    <div className="p-6 flex justify-between items-center">
                                        <h4 className="text-lg font-bold text-white">{faq.q}</h4>
                                        <span className="text-slate-500 font-black text-xl">{openFaq === index ? '−' : '+'}</span>
                                    </div>
                                    <div className={`px-6 pb-6 text-slate-400 font-light leading-relaxed transition-all duration-300 ${openFaq === index ? 'block' : 'hidden'}`}>{faq.a}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="dark-glass rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]"></div>
                        <div className="text-center mb-16 relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 text-3d-premium">בואו נדבר תכל'ס.</h2>
                            <p className="text-slate-400 text-lg font-light">השאירו פרטים, ואינה מצוות LION GROUP תחזור אליכם בהקדם.</p>
                        </div>
                        <form className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <input type="text" className="w-full bg-[#0a0a0a]/50 border-b-2 border-white/20 px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-[#111] transition-all placeholder:text-slate-600 text-lg rounded-t-xl" placeholder="שם מלא" />
                                <input type="tel" className="w-full bg-[#0a0a0a]/50 border-b-2 border-white/20 px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-[#111] transition-all placeholder:text-slate-600 text-lg rounded-t-xl" placeholder="מספר טלפון נייד" />
                            </div>
                            <select className="w-full bg-[#0a0a0a]/50 border-b-2 border-white/20 px-4 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-[#111] transition-all appearance-none cursor-pointer text-lg rounded-t-xl">
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

            {/* --- Footer --- */}
            <footer className="bg-[#020202] border-t border-white/5 pt-24 pb-32 md:pb-12 relative z-10 px-4">
                <div className="luxury-noise"></div>
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
                                <li><Link href="/services/marketing" className="hover:text-white transition-colors">שיווק דיגיטלי</Link></li>
                                <li><Link href="/services/automations" className="hover:text-white transition-colors">אוטומציות ובוטים</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-8 text-lg uppercase tracking-wider">מרכז מידע</h4>
                            <ul className="space-y-4 text-slate-400 text-sm font-medium">
                                <li><Link href="#" className="hover:text-white transition-colors">תקנון האתר ותנאי שימוש</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">מדיניות פרטיות</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">הצהרת נגישות</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-medium tracking-wide">
                        <p className="mb-4 md:mb-0">© {new Date().getFullYear()} LION GROUP. כל הזכויות שמורות.</p>
                        <p>Designed by Lion Group Engineers</p>
                    </div>
                </div>
            </footer>

            <a href={`https://wa.me/${forwardingNumber}`} target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50 flex items-center justify-center gap-4 group">
                <div className="hidden md:flex absolute left-24 dark-glass px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap transform -translate-x-4 group-hover:translate-x-0 border border-white/10">
                    התייעצו איתנו בוואטסאפ
                </div>
                <div className="relative bg-white text-black p-4 md:p-5 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] group-hover:scale-110 transition-all duration-500 flex items-center justify-center border border-white/20">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </div>
            </a>
        </div>
    );
}

// קומפוננטות עזר פנימיות
function ServiceCard({ title, subtitle, desc, link }: { title: string, subtitle: string, desc: string, link: string }) {
    return (
        <Link href={link} className="dark-glass p-12 rounded-[3rem] hover:-translate-y-4 transition-transform duration-500 group relative border border-white/10 block text-right">
            <h3 className="text-3xl font-black text-white mb-2">{title}</h3>
            <div className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-8">{subtitle}</div>
            <p className="text-slate-400 leading-relaxed font-light mb-8">{desc}</p>
            <span className="text-white font-bold border-b border-white/30 pb-1 group-hover:text-blue-400 group-hover:border-blue-400/50 transition-colors">קראו בהרחבה וצפו בדוגמאות &larr;</span>
        </Link>
    );
}

function PortfolioCard({ title, category, image, link }: { title: string, category: string, image: string, link?: string }) {
    return (
        <div className="dark-glass rounded-[2.5rem] overflow-hidden group cursor-pointer relative h-[350px] md:h-[450px] border border-white/10 hover:border-white/30 transition-colors">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${image}')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:from-black group-hover:via-black/60 transition-colors duration-500"></div>
            <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition-all duration-500">
                <div className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-2 drop-shadow-md">{category}</div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-6 drop-shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{title}</h3>
                <button className="w-fit border border-white/30 px-6 py-2.5 rounded-full text-white text-sm hover:bg-white hover:text-black transition-colors font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-500 delay-100">
                    לצפייה בפרויקט
                </button>
            </div>
        </div>
    );
}

function PackageCard({ title, price, desc, features, isGold = false }: { title: string, price: string, desc: string, features: string[], isGold?: boolean }) {
    return (
        <div className={`dark-glass rounded-[3rem] p-10 md:p-14 relative transition-transform duration-500 hover:-translate-y-2 ${isGold ? 'border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.05)]' : ''}`}>
            {isGold && (
                <div className="absolute top-8 left-8 bg-white text-black text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.5)]">Popular</div>
            )}
            <h4 className={`text-2xl font-black mb-4 ${isGold ? 'text-3d-gold' : 'text-white'}`}>{title}</h4>
            <div className="text-4xl md:text-5xl font-black text-white mb-6">{price}</div>
            <p className="text-slate-400 text-sm md:text-base mb-10 font-light min-h-[3rem]">{desc}</p>
            <ul className="space-y-5 mb-12">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm md:text-base text-slate-300 font-light border-b border-white/5 pb-4 last:border-0">
                        <span className="text-blue-400 ml-4 font-black text-lg leading-none">·</span> {feature.trim()}
                    </li>
                ))}
            </ul>
            <Link href="#contact" className={`block w-full text-center py-5 rounded-2xl font-black text-lg transition-all ${isGold ? 'bg-white text-black hover:bg-slate-200' : 'border border-white/20 text-white hover:bg-white/10'}`}>בחירת חבילה</Link>
        </div>
    );
}

function TestimonialCard({ text, author, role }: { text: string, author: string, role: string }) {
    return (
        <div className="dark-glass p-10 rounded-[3rem] text-right border border-white/10 relative hover:-translate-y-2 transition-transform duration-500">
            <div className="text-6xl text-white/10 font-serif absolute top-4 right-8 leading-none">"</div>
            <p className="text-slate-300 font-normal leading-relaxed mb-10 text-lg relative z-10">{text}</p>
            <div className="flex items-center gap-5 relative z-10 border-t border-white/10 pt-6">
                <div className="w-14 h-14 rounded-full border border-blue-500/40 flex items-center justify-center text-white font-black text-xl bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
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