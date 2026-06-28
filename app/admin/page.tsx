import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import QRCode from 'react-qr-code';

const prisma = new PrismaClient();

export default async function AdminPanel() {
    const settings = await prisma.systemSettings.findUnique({ where: { id: "global" } });
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
    const packages = await prisma.package.findMany({ orderBy: { createdAt: 'desc' } });
    const portfolios = await prisma.portfolio.findMany({ orderBy: { createdAt: 'desc' } });
    const clients = await prisma.clientLogo.findMany();

    // Server Actions
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

    async function addPackage(formData: FormData) {
        "use server";
        await prisma.package.create({
            data: {
                page: formData.get("page") as string,
                title: formData.get("title") as string,
                price: formData.get("price") as string,
                description: formData.get("description") as string,
                features: formData.get("features") as string,
                isGold: formData.get("isGold") === "on",
            }
        });
        revalidatePath('/admin');
    }

    async function addPortfolio(formData: FormData) {
        "use server";
        await prisma.portfolio.create({
            data: {
                title: formData.get("title") as string,
                category: formData.get("category") as string,
                imageUrl: formData.get("imageUrl") as string,
                link: formData.get("link") as string,
            }
        });
        revalidatePath('/admin');
    }

    async function deletePackage(formData: FormData) {
        "use server";
        await prisma.package.delete({ where: { id: formData.get("id") as string } });
        revalidatePath('/admin');
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 p-6 md:p-10 font-sans" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* --- הדר וחיבור בוט --- */}
                <header className="border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">מערכת ניהול | LION OS</h1>
                        <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full font-bold text-sm">גישת מנהל טכני</span>
                    </div>

                    {/* חלונית התחברות לבוט */}
                    <div className="bg-[#111] p-6 rounded-3xl border border-white/10 flex items-center gap-8 min-w-[350px]">
                        <div>
                            <h3 className="text-white font-bold mb-2">סטטוס בוט וואטסאפ</h3>
                            {settings?.botStatus === 'CONNECTED' ? (
                                <div className="text-green-400 font-black text-lg flex items-center gap-2">
                                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span> מחובר ופעיל
                                </div>
                            ) : settings?.botStatus === 'WAITING_QR' ? (
                                <div className="text-yellow-400 font-bold">ממתין לסריקת ברקוד...</div>
                            ) : (
                                <div className="text-red-400 font-bold">הבוט מנותק. מפעיל שרת...</div>
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

                    {/* --- הגדרות מספר העברה --- */}
                    <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">⚙️ ניתוב לידים מהבוט</h2>
                        <form action={updateForwardingNumber} className="flex gap-4">
                            <input
                                type="text"
                                name="forwardingNumber"
                                defaultValue={settings?.forwardingNumber || ''}
                                placeholder="לדוגמה: 972501234567"
                                className="flex-1 bg-[#151515] border border-white/20 p-4 rounded-xl text-white font-mono"
                                dir="ltr"
                            />
                            <button type="submit" className="bg-indigo-600 text-white px-8 font-black rounded-xl hover:bg-indigo-500 transition">עדכן מספר</button>
                        </form>
                    </div>

                    {/* --- הוספת דוגמאות לתיק עבודות --- */}
                    <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">📸 הוספת עבודה לגלריה</h2>
                        <form action={addPortfolio} className="space-y-4">
                            <input type="text" name="title" placeholder="כותרת הפרויקט (למשל: מערכת CRM לנדל״ן)" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" required />
                            <select name="category" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" required>
                                <option value="web">פיתוח אתרים ו-SaaS</option>
                                <option value="marketing">שיווק דיגיטלי</option>
                                <option value="automations">אוטומציות</option>
                            </select>
                            <input type="url" name="imageUrl" placeholder="קישור לתמונה (URL)" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" required />
                            <input type="url" name="link" placeholder="קישור לאתר הלקוח (אופציונלי)" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" />
                            <button type="submit" className="w-full bg-blue-600 text-white py-4 font-black rounded-xl hover:bg-blue-500 transition">פרסם באתר</button>
                        </form>
                    </div>

                </div>

                {/* --- ניהול חבילות ומחירים --- */}
                <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                    <h2 className="text-2xl font-bold text-white mb-6">📦 ניהול חבילות פרימיום</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <form action={addPackage} className="space-y-4 lg:col-span-1 border-l border-white/10 pl-8">
                            <select name="page" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white">
                                <option value="home">עמוד ראשי</option>
                                <option value="web">עמוד בניית אתרים</option>
                                <option value="marketing">עמוד שיווק דיגיטלי</option>
                                <option value="automations">עמוד אוטומציות</option>
                            </select>
                            <input type="text" name="title" placeholder="שם החבילה" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" required />
                            <input type="text" name="price" placeholder="מחיר (למשל: ₪5,000)" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" required />
                            <textarea name="description" placeholder="תיאור קצר" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white h-24" required></textarea>
                            <input type="text" name="features" placeholder="פיצ'רים מופרדים בפסיק" className="w-full bg-[#151515] border border-white/20 p-4 rounded-xl text-white" required />
                            <label className="flex items-center gap-3 text-white font-bold cursor-pointer">
                                <input type="checkbox" name="isGold" className="w-5 h-5 accent-yellow-500" /> חבילת Premium מודגשת
                            </label>
                            <button type="submit" className="w-full bg-yellow-500 text-black py-4 font-black rounded-xl hover:bg-yellow-400 transition">הוסף חבילה</button>
                        </form>

                        <div className="lg:col-span-2 overflow-y-auto max-h-[500px] space-y-4 pr-4">
                            {packages.map(pkg => (
                                <div key={pkg.id} className="bg-[#151515] p-5 rounded-2xl border border-white/5 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-white text-lg">{pkg.title} <span className="text-sm text-slate-500 font-normal">({pkg.page})</span></div>
                                        <div className="text-yellow-500 font-black">{pkg.price}</div>
                                    </div>
                                    <form action={deletePackage}>
                                        <input type="hidden" name="id" value={pkg.id} />
                                        <button type="submit" className="text-red-400 hover:text-red-300 font-bold bg-red-500/10 px-4 py-2 rounded-lg">מחק</button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- טבלת לידים --- */}
                <div className="bg-[#0a0a0a] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-white/10 flex justify-between items-center bg-[#111]">
                        <h2 className="text-2xl font-bold text-white">👥 לידים חמים מהבוט</h2>
                        <span className="bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full font-bold">{leads.length} לידים פתוחים</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-right">
                            <thead className="bg-[#151515]">
                            <tr>
                                <th className="p-5 font-bold text-slate-400">תאריך</th>
                                <th className="p-5 font-bold text-slate-400">שם הלקוח</th>
                                <th className="p-5 font-bold text-slate-400">טלפון</th>
                                <th className="p-5 font-bold text-slate-400">שירות מבוקש</th>
                                <th className="p-5 font-bold text-slate-400">תקציב (1-3)</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                            {leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-white/5 transition">
                                    <td className="p-5 text-sm text-slate-500">{lead.createdAt.toLocaleDateString('he-IL')}</td>
                                    <td className="p-5 font-bold text-white">{lead.name}</td>
                                    <td className="p-5 text-slate-300 font-mono" dir="ltr">{lead.phone.replace('@c.us', '')}</td>
                                    <td className="p-5 text-indigo-400 font-bold">{lead.serviceType || '-'}</td>
                                    <td className="p-5 text-yellow-500 font-black">{lead.budget || '-'}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}