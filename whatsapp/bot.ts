"use client";

import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import type { Message } from 'whatsapp-web.js';
// @ts-ignore
import qrcode from 'qrcode-terminal';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// פונקציית השהייה חכמה - מדמה זמן הקלדה אנושי
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const client = new Client({
    authStrategy: new LocalAuth({ clientId: "lion-group-cloud-worker" }),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable' // חובה עבור הרצה חלקה ב-Fly.io
    }
});

// שידור הברקוד ישירות למסד הנתונים עבור פאנל הניהול בענן
client.on('qr', async (qr: string) => {
    // מציג במסוף המקומי לגיבוי
    qrcode.generate(qr, { small: true });
    console.log('🔄 קוד QR חדש נוצר - מעדכן את פאנל הניהול ב-PostgreSQL...');

    await prisma.systemSettings.upsert({
        where: { id: "global" },
        update: { qrCode: qr, botStatus: "WAITING_QR" },
        create: { id: "global", qrCode: qr, botStatus: "WAITING_QR" }
    });
});

client.on('ready', async () => {
    console.log('✅ הבוט השיווקי של LION GROUP מחובר, חמוש ומוכן לקלוט לידים!');

    await prisma.systemSettings.upsert({
        where: { id: "global" },
        update: { qrCode: null, botStatus: "CONNECTED" },
        create: { id: "global", botStatus: "CONNECTED" }
    });
});

client.on('disconnected', async () => {
    console.log('❌ הבוט נותק מרשת וואטסאפ. מעדכן סטטוס פאנל...');

    await prisma.systemSettings.update({
        where: { id: "global" },
        data: { botStatus: "DISCONNECTED", qrCode: null }
    });
});

client.on('message', async (msg: Message) => {
    const phone = msg.from;
    const text = msg.body.trim();

    // חוק 1: סינון רעשי רקע (קבוצות, סטטוסים וספאם)
    if (phone.includes('@g.us') || phone === 'status@broadcast') return;

    try {
        const chat = await msg.getChat();

        // חוק 2: חסימת הקלטות ומדיה. הבוט חייב טקסט כדי לעבוד.
        if (msg.hasMedia || msg.type !== 'chat') {
            await chat.sendStateTyping();
            await delay(1500);
            await msg.reply("היי! כרגע המערכת שלי יודעת לקרוא טקסט בלבד 🤖.\nאשמח אם תכתוב/י לי במילים כדי שאוכל להפנות אותך למומחה הנכון!");
            return;
        }

        const lead = await prisma.lead.findUnique({ where: { phone } });

        // חוק 3: מסלול מילוט מיידי (Escape Hatch). לקוח חסר סבלנות = לקוח נוטש.
        if (text.includes('נציג') || text.includes('אינה') || text.includes('אנושי')) {
            if (lead && lead.botState !== 'FINISHED') {
                await prisma.lead.update({ where: { phone }, data: { botState: 'FINISHED' } });
            }
            await chat.sendStateTyping();
            await delay(1000);
            await msg.reply("הבנתי אותך! עצרתי את האוטומציה. 🛑\nהעברתי את הפנייה שלך לאינה מהצוות. היא תתפנה אליך ממש בהקדם! 🦁");

            const settings = await prisma.systemSettings.findUnique({ where: { id: "global" } });
            const forwardingNumber = settings?.forwardingNumber || "972501234567";
            await client.sendMessage(`${forwardingNumber}@c.us`, `⚠️ *התראת שירות: לקוח דורש נציג אנושי!*\nטלפון לפולו-אפ מיידי: wa.me/${phone.replace('@c.us', '')}`);
            return;
        }

        // --- התחלת משפך השיווק והמכירות (The Funnel) ---
        if (!lead) {
            await prisma.lead.create({
                data: { phone, botState: "ASK_NAME" }
            });

            await chat.sendStateTyping();
            await delay(2000); // השהייה ארוכה בהודעה ראשונה ליצירת אמינות
            await msg.reply("ברוכים הבאים ל-LION GROUP! 🦁\nכדי שנוכל להתאים לעסק שלך את המעטפת המדויקת ביותר, איך קוראים לך?");
            return;
        }

        // ניהול שלבי התשאול (State Machine)
        switch (lead.botState) {

            case 'ASK_NAME':
                // חוק 4: פרסונליזציה. שימוש בשם הלקוח בהודעה הבאה.
                await prisma.lead.update({ where: { phone }, data: { name: text, botState: 'ASK_SERVICE' } });

                await chat.sendStateTyping();
                await delay(1500);
                await msg.reply(`נעים מאוד ${text}! במה נוכל לעזור לעסק שלך היום שובר תקרות זכוכית?\n\n1️⃣ בניית אתרים, איקומרס ו-SaaS\n2️⃣ שיווק ממומן (PPC) ומכונת לידים\n3️⃣ בוטים, אוטומציות וחיבורי CRM\n\n*אנא השב/י רק עם הספרה (1, 2 או 3)*`);
                break;

            case 'ASK_SERVICE':
                // הגבלת קלט (Validation) כדי לשמור על הדאטה-בייס נקי
                if (!['1', '2', '3'].includes(text)) {
                    await msg.reply("אנא בחר/י אחת מהאפשרויות על ידי הקלדת הספרה *1, 2 או 3* בלבד, כדי שהמערכת תזהה את המומחה הנכון עבורך.");
                    return;
                }

                let service = "";
                let nextState = 'ASK_DEEP_DIVE';
                let replyText = "";

                // חוק 5: מיקוד הלקוח והעלאת מודעות לבעיה (Problem Awareness)
                if (text === '1') {
                    service = "פיתוח אתרים";
                    replyText = "החלטה מעולה. אתר הוא הסניף המרכזי של העסק.\nאיזו פלטפורמה אנו עומדים לבנות?\n\n1️⃣ חנות וירטואלית (E-commerce)\n2️⃣ אתר תדמית/חברה יוקרתי\n3️⃣ מערכת ניהול מורכבת / SaaS";
                } else if (text === '2') {
                    service = "שיווק דיגיטלי";
                    replyText = "הגעת למקום הנכון לסקייל. מהי המטרה המרכזית של הקמפיינים העתידיים?\n\n1️⃣ גיוס לידים חמים ואיכותיים (B2B/B2C)\n2️⃣ הגדלת מכירות אונליין (ROAS)\n3️⃣ מודעות ומיתוג עסקי מסיבי";
                } else if (text === '3') {
                    service = "אוטומציות";
                    nextState = 'ASK_BUDGET'; // אוטומציות עוברות ישר לתקציב ללא שלב ביניים מורכב
                    replyText = "אוטומציות הן החמצן של ארגון רווחי.\nאיזה תהליך נדרש לייעל אצלך?\n\n1️⃣ בוט וואטסאפ לסינון לידים\n2️⃣ חיבורי API למערכת CRM\n3️⃣ מעטפת אוטומציה כוללת לארגון";
                }

                await prisma.lead.update({ where: { phone }, data: { serviceType: service, botState: nextState } });

                await chat.sendStateTyping();
                await delay(1800);
                await msg.reply(replyText);
                break;

            case 'ASK_DEEP_DIVE':
                // מיפוי תת-שירות אינטליגנטי ומדויק על בסיס הבחירה הקודמת
                if (['1', '2', '3'].includes(text)) {
                    const currentLead = await prisma.lead.findUnique({ where: { phone } });

                    let subServiceDetail = "כללי";
                    if (currentLead?.serviceType === "פיתוח אתרים") {
                        if (text === '1') subServiceDetail = "חנות וירטואלית (E-commerce)";
                        if (text === '2') subServiceDetail = "אתר תדמית/חברה יוקרתי";
                        if (text === '3') subServiceDetail = "מערכת ניהול מורכבת / SaaS";
                    } else if (currentLead?.serviceType === "שיווק דיגיטלי") {
                        if (text === '1') subServiceDetail = "גיוס לידים חמים (B2B/B2C)";
                        if (text === '2') subServiceDetail = "הגדלת מכירות אונליין (ROAS)";
                        if (text === '3') subServiceDetail = "מודעות ומיתוג עסקי מסיבי";
                    } else {
                        if (text === '1') subServiceDetail = "בוט וואטסאפ לסינון לידים";
                        if (text === '2') subServiceDetail = "חיבורי API למערכת CRM";
                        if (text === '3') subServiceDetail = "מעטפת אוטומציה כוללת";
                    }

                    await prisma.lead.update({
                        where: { phone },
                        data: {
                            serviceType: `${currentLead?.serviceType} [${subServiceDetail}]`,
                            botState: 'ASK_BUDGET'
                        }
                    });
                } else {
                    await prisma.lead.update({ where: { phone }, data: { botState: 'ASK_BUDGET' } });
                }

                await chat.sendStateTyping();
                await delay(1500);
                await msg.reply("מעולה. שאלה אחרונה כדי שאינה תוכל לבנות עבורך הצעה ריאלית שמביאה תוצאות:\nמהו טווח התקציב המשוער לפרויקט?\n\n1️⃣ תקציב בסיסי (עד 5,000 ₪)\n2️⃣ פרויקט מקצועי (5,000 ₪ - 15,000 ₪)\n3️⃣ פרויקט פרימיום / סקייל (מעל 15,000 ₪)");
                break;

            case 'ASK_BUDGET':
                await prisma.lead.update({ where: { phone }, data: { budget: text, botState: 'FINISHED' } });

                await chat.sendStateTyping();
                await delay(2500);

                // חוק 6: פסיכולוגיית תקציב (Pricing Psychology)
                let budgetResponse = "תודה רבה על המידע! 🦁";
                let budgetLevel = '⚡ ליד סטנדרט';

                if (text === '1') {
                    budgetResponse = "מצוין, יש לנו פתרונות מדורגים שמתאימים גם לעסקים בשלבי צמיחה. תודה על המידע! 🦁";
                    budgetLevel = '🔹 ליד בסיסי';
                } else if (text === '2') {
                    budgetResponse = "מעולה, תקציב כזה מאפשר לנו לתכנן אסטרטגיה חזקה שתייצר אימפקט אמיתי. תודה! 🦁";
                    budgetLevel = '🔥 ליד חם';
                } else if (text === '3') {
                    budgetResponse = "מושלם. בתקציב כזה אנו פורסים את השטיח האדום ובונים מכונת מלחמה טוטאלית. תודה! 🦁";
                    budgetLevel = '🔥🔥 ליד פרימיום (High-Ticket)';
                }

                // חוק 7: שעות פעילות ותיאום ציפיות (SLA)
                const currentHour = new Date().getHours();
                const isWorkingHours = currentHour >= 8 && currentHour < 20; // 08:00 - 20:00

                let followUpText = "\nהפרטים הועברו ישירות לשולחן העבודה של צוות LION GROUP. אינה תיצור איתך קשר ממש בקרוב עם תוכנית פעולה.";
                if (!isWorkingHours) {
                    followUpText = "\nהמשרדים שלנו סגורים כעת, אך סימנו את הפנייה שלך בעדיפות עליונה, ואינה תיצור איתך קשר ראשון על הבוקר!";
                }

                // סיום שיחה עם הוכחה חברתית (Social Proof) לחמם את הליד
                await msg.reply(`${budgetResponse}${followUpText}\n\nבינתיים, אנו מזמינים אותך להציץ ולהתרשם מתיק העבודות ומהלקוחות שלנו באתר:\nwww.lion-group.co.il/#portfolio`);

                // שליפת נתונים עדכניים ישירות מהשרת (מונע שליחת ערכים ישנים/ריקים למנהל)
                const finalLead = await prisma.lead.findUnique({ where: { phone } });
                const settings = await prisma.systemSettings.findUnique({ where: { id: "global" } });
                const forwardingNumber = settings?.forwardingNumber || "972501234567";

                const leadSummary = `
🚨 *ליד חדש סונן ומוכן לסגירה!* 🚨

${budgetLevel}

👤 *שם הלקוח:* ${finalLead?.name || 'לא ידוע'}
📱 *וואטסאפ לפולו-אפ:* wa.me/${phone.replace('@c.us', '')}
🎯 *שירות מבוקש:* ${finalLead?.serviceType || 'לא הוגדר'}
💰 *דירוג תקציב (1-נמוך, 3-גבוה):* ${text}
⏱️ *זמן סיום תשאול:* ${new Date().toLocaleTimeString('he-IL')}

*טיפ מכירות:* ${text === '3' ? "הלקוח אותת על תקציב פרימיום, יש להציע את חבילת Lion 360°" : "יש לברר את הצורך המדויק ולהציע ROI מהיר."}
                `;

                await client.sendMessage(`${forwardingNumber}@c.us`, leadSummary);
                break;

            case 'FINISHED':
                break;
        }
    } catch (error) {
        console.error("שגיאה קריטית במערכת הבוט:", error);
    }
});

client.initialize();