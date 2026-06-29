import { revalidatePath } from 'next/cache';
import QRCode from 'react-qr-code';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateForwardingNumber(formData: FormData) {
    "use server";
    const num = formData.get("forwardingNumber") as string;
    await prisma.systemSettings.upsert({
        where: { id: "global" },
        update: { forwardingNumber: num },
        create: { id: "global", forwardingNumber: num }
    });
    revalidatePath('/admin');
}

async function addPortfolio(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const categoryId = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const link = formData.get("link") as string;

    if (!categoryId) return; // הגנה בסיסית

    await prisma.portfolio.create({
        data: {
            title,
            imageUrl,
            link,
            category: { connect: { id: categoryId } } // התיקון הקריטי
        }
    });
    revalidatePath('/admin');
}

// --- הקומפוננטה הראשית ---

export default async function AdminPanel() {
    const [settings, leads, categories] = await Promise.all([
        prisma.systemSettings.findUnique({ where: { id: "global" } }),
        prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 50 }),
        prisma.category.findMany()
    ]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 p-6 md:p-10 font-sans" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">מערכת ניהול | LION OS</h1>
                        <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full font-bold text-sm">גישת מנהל טכני</span>
                    </div>

                    <div className="bg-[#111] p-6 rounded-3xl border border-white/10 flex items-center gap-8 min-w-[350px]">
                        <div>
                            <h3 className="text-white font-bold mb-2">סטטוס בוט וואטסאפ</h3>
                            {settings?.botStatus === 'CONNECTED' ? (
                                <div className="text-green-400 font-black text-lg flex items-center gap-2">
                                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span> מחובר ופעיל
                                </div>
                            ) : (
                                <div className="text-red-400 font-bold">הבוט מנותק</div>
                            )}
                        </div>
                        {settings?.botStatus === 'WAITING_QR' && settings?.qrCode && (
                            <div className="bg-white p-2 rounded-xl">
                                <QRCode value={settings.qrCode} size={90} />
                            </div>
                        )}
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">⚙️ ניתוב לידים מהבוט</h2>
                        <form action={updateForwardingNumber} className="flex gap-4">
                            <input type="text" name="forwardingNumber" defaultValue={settings?.forwardingNumber || ''} className="flex-1 bg-[#151515] border border-white/20 p-4 rounded-xl text-white font-mono" dir="ltr" />
                            <button type="submit" className="bg-indigo-600 text-white px-8 font-black rounded-xl hover:bg-indigo-500 transition">עדכן</button>
                        </form>
                    </div>

                    <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">📸 הוספת עבודה לגלריה</h2>
                        <form action={addPortfolio} className="space-y-4">
                            <input type="text" name="title" placeholder="כותרת הפרויקט" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" required />
                            <select name="category" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" required>
                                <option value="">בחר קטגוריה...</option>
                                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                            </select>
                            <input type="url" name="imageUrl" placeholder="קישור לתמונה" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" required />
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 font-black rounded-xl hover:bg-blue-500 transition">פרסם באתר</button>
                        </form>
                    </div>
                </div>

                <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-white/10 bg-[#111]">
                        <h2 className="text-2xl font-bold text-white">👥 לידים חמים מהבוט</h2>
                    </div>
                    <table className="w-full text-right">
                        <thead className="bg-[#151515]">
                        <tr><th className="p-5 text-slate-400">שם</th><th className="p-5 text-slate-400">טלפון</th><th className="p-5 text-slate-400">שירות</th></tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                        {leads.map(lead => (
                            <tr key={lead.id}>
                                <td className="p-5 text-white font-bold">{lead.name}</td>
                                <td className="p-5 text-slate-300" dir="ltr">{lead.phone}</td>
                                <td className="p-5 text-indigo-400">{lead.serviceType}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}