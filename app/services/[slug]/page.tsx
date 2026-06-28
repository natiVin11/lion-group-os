import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    // שליפת הקטגוריה והעבודות המשויכות אליה מהדאטה-בייס
    const category = await prisma.category.findUnique({
        where: { slug: params.slug },
        include: { portfolios: true }
    });

    // במידה והלקוח הזין כתובת לא נכונה
    if (!category) {
        return (
            <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center font-sans" dir="rtl">
                <h1 className="text-6xl font-black mb-6">שגיאה 404</h1>
                <p className="text-xl text-slate-400 mb-8">הקטגוריה שחיפשת לא קיימת במערכת.</p>
                <Link href="/" className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition">חזרה לעמוד הראשי</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020202] text-slate-200 font-sans relative overflow-x-hidden" dir="rtl">

            {/* --- CSS מתקדם לאפקטים --- */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes star-move { from { transform: translateY(0); } to { transform: translateY(-2000px); } }
                .stars-layer-1 { background-image: radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, #ffffff, rgba(0,0,0,0)); background-size: 400px 400px; animation: star-move 100s linear infinite; opacity: 0.25; }
                .text-3d-premium { background: linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0px 4px 12px rgba(0,0,0,0.8)); }
                .dark-glass { background: rgba(10, 10, 10, 0.85); box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
                .luxury-noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); opacity: 0.03; mix-blend-mode: overlay; pointer-events: none; position: absolute; inset: 0; z-index: 1; }
            `}} />

            {/* --- רקע כוכבים ורעש --- */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#020202]">
                <div className="absolute inset-0 stars-layer-1"></div>
                <div className="luxury-noise"></div>
                {/* תאורה עדינה במרכז */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-900/15 blur-[150px] rounded-full"></div>
            </div>

            {/* =========================================
                Navbar (תפריט עליון מותאם לשרת)
            ========================================== */}
            <nav className="fixed w-full z-50 top-0 bg-[#050b14]/95 backdrop-blur-3xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center gap-4 group cursor-pointer z-50 relative">
                            <Link href="/" className="flex items-center gap-4">
                                <img src="/logo.png" alt="Lion Logo" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(218,165,32,0.4)] hover:scale-105 transition-transform duration-500" />
                                <span className="font-extrabold text-2xl tracking-[0.2em] text-white hidden sm:block drop-shadow-md">
                                    LION<span className="text-blue-400 font-light">GROUP</span>
                                </span>
                            </Link>
                        </div>

                        <div className="hidden md:flex space-x-8 space-x-reverse items-center bg-white/5 px-8 py-3.5 rounded-full border border-white/10 backdrop-blur-xl">
                            <Link href="/#services" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">כל השירותים</Link>
                            <Link href="/#portfolio" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">עבודות</Link>
                            <Link href="/#packages" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Premium</Link>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link href="/#contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-white to-slate-200 text-black font-extrabold text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                קביעת פגישה
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* =========================================
                Hero Section (כותרת דינמית)
            ========================================== */}
            <div className="pt-48 pb-24 px-4 max-w-7xl mx-auto relative z-10 min-h-[60vh] flex flex-col justify-center">
                <header className="text-center">
                    <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block drop-shadow-md">{category.nameEn}</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 text-3d-premium">
                        {category.nameHe}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                        {category.description}
                    </p>
                </header>
            </div>

            {/* =========================================
                גלריית דוגמאות (Portfolio Grid דינמי)
            ========================================== */}
            <section className="py-24 relative z-20 bg-[#050505] border-y border-white/5">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-slate-500 font-bold tracking-widest text-sm uppercase mb-6 block">Our Work</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-3d-premium">דוגמאות לעבודות שלנו ({category.portfolios.length})</h2>
                    </div>

                    {category.portfolios.length === 0 ? (
                        <div className="text-center text-slate-500 text-xl py-20 dark-glass rounded-[3rem]">
                            טרם הועלו עבודות לקטגוריה זו.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {category.portfolios.map(item => (
                                <div key={item.id} className="dark-glass rounded-[2rem] overflow-hidden group relative h-[400px] border border-white/10 hover:border-blue-500/50 transition-colors">
                                    <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${item.imageUrl}')` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-8 text-right flex flex-col justify-end h-full opacity-90 group-hover:opacity-100 transition-opacity">
                                        <h3 className="text-2xl font-black text-white mb-4 drop-shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>

                                        {item.link ? (
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="w-fit border border-white/30 px-6 py-2.5 rounded-full text-white text-sm hover:bg-white hover:text-black transition-colors font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-500 delay-100">
                                                לצפייה בפרויקט &larr;
                                            </a>
                                        ) : (
                                            <span className="w-fit border border-white/10 px-6 py-2.5 rounded-full text-slate-400 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-500 delay-100">
                                                פרויקט פנימי
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* =========================================
                Footer הראשי
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

            {/* --- Floating WhatsApp --- */}
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