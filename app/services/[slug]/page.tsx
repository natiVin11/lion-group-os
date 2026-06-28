import { prisma } from '@/lib/prisma';
import Link from 'next/link';

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

            {/* --- רקע --- */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#020202]">
                <div className="absolute inset-0 stars-layer-1"></div>
                <div className="luxury-noise"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-900/15 blur-[150px] rounded-full"></div>
            </div>

            {/* --- Navbar --- */}
            <nav className="fixed w-full z-50 top-0 bg-[#050b14]/95 backdrop-blur-3xl border-b border-white/10 py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-4">
                            <span className="font-extrabold text-2xl tracking-[0.2em] text-white">LION<span className="text-blue-400 font-light">GROUP</span></span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <div className="pt-48 pb-24 px-4 max-w-7xl mx-auto relative z-10 min-h-[60vh] flex flex-col justify-center">
                <header className="text-center">
                    {/* התיקון: שימוש בשדה name הקיים */}
                    <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block drop-shadow-md">{category.name}</span>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-8 text-3d-premium">
                        {category.name}
                    </h1>
                </header>
            </div>

            {/* --- Portfolio Grid --- */}
            <section className="py-24 relative z-20 bg-[#050505] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {category.portfolios.map(item => (
                            <div key={item.id} className="dark-glass rounded-[2rem] overflow-hidden group relative h-[400px] border border-white/10">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.imageUrl}')` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 w-full p-8 text-right">
                                    <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}