import { prisma } from '@/lib/prisma'; // ייבוא הלקוח המשותף (הסינגלטון)
import HomePageClient from './components/HomePageClient';

// מונע שמירת קאש - כדי שכל שינוי בפאנל האדמין יופיע מיד באתר!
export const revalidate = 0;

export default async function HomePage() {
    try {
        // שליפת כל המידע הרלוונטי מהענן במקביל (מהיר משמעותית!)
        const [packages, portfolios, testimonials, logos, settings] = await Promise.all([
            prisma.package.findMany({
                where: { page: 'home' },
                orderBy: { createdAt: 'desc' }
            }),
            prisma.portfolio.findMany({
                orderBy: { createdAt: 'desc' },
                take: 4,
                include: { category: true } // כולל את פרטי הקטגוריה עבור הגלריה
            }),
            prisma.testimonial.findMany({
                orderBy: { createdAt: 'desc' },
                take: 3
            }),
            prisma.clientLogo.findMany({
                orderBy: { createdAt: 'desc' }
            }),
            prisma.systemSettings.findUnique({
                where: { id: 'global' }
            })
        ]);

        return (
            <HomePageClient
                packages={packages}
                portfolios={portfolios}
                testimonials={testimonials}
                logos={logos}
                forwardingNumber={settings?.forwardingNumber || "972501234567"}
            />
        );
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
                <p>משהו השתבש בטעינת האתר. אנא נסה שוב מאוחר יותר.</p>
            </div>
        );
    }
}