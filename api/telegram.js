export default async function handler(req, res) {
    // نقبل فقط طلبات POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    // ⚠️ هذه هي المتغيرات الآمنة التي سيتم جلبها من Vercel Environment Variables المخبأة ⚠️
    // في حال قمت بكتابتها هنا مباشرة فستظل آمنة أيضا لأن هذا الملف يعمل في "سيرفر" Vercel ولا يصل لمتصفح الزائر أبدا
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN_HERE';
    const telegramChatId = process.env.TELEGRAM_CHAT_ID || 'YOUR_TELEGRAM_CHAT_ID_HERE';

    if (telegramBotToken === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
        return res.status(200).json({ success: true, warning: 'Please set Tokens in Vercel or replace placeholders in api/telegram.js' });
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: telegramChatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Telegram API Error:', data);
            return res.status(response.status).json({ error: 'Telegram API Error', details: data });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Serverless Function Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
