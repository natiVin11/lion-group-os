import { PrismaClient } from '@prisma/client';
import HomePageClient from './components/HomePageClient';

const prisma = new PrismaClient();

// מונע שמירת קאש - כדי שכל שינוי בפאנל האדמין יופיע מיד באתר!
export const revalidate = 0;

export default async function HomePage() {
    // שליפת כל המידע הרלוונטי מהענן
    const packages = await prisma.package.findMany({ where: { page: 'home' }, orderBy: { createdAt: 'desc' } });
    const portfolios = await prisma.portfolio.findMany({ orderBy: { createdAt: 'desc' }, take: 4 });
    const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' }, take: 3 });
    const logos = await prisma.clientLogo.findMany({ orderBy: { createdAt: 'desc' } });
    const settings = await prisma.systemSettings.findUnique({ where: { id: 'global' } });

    return (
        <HomePageClient
            packages={packages}
            portfolios={portfolios}
            testimonials={testimonials}
            logos={logos}
            forwardingNumber={settings?.forwardingNumber || "972501234567"}
        />
    );
}