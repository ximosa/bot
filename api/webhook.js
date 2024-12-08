const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');
require('moment/locale/es');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

const menuPrincipal = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📦 Plugins WordPress', callback_data: 'plugins' }],
            [{ text: '🎨 Temas WordPress', callback_data: 'temas' }],
            [{ text: '📱 Soporte', callback_data: 'soporte' }]
        ]
    }
};

const menuContacto = {
    reply_markup: {
        inline_keyboard: [
            [{ text: '📧 Email', callback_data: 'email' }],
            [{ text: '🌐 Web', callback_data: 'web' }],
            [{ text: '💬 Telegram', callback_data: 'telegram' }],
            [{ text: '⬅️ Volver al Menú', callback_data: 'menu' }]
        ]
    }
};

module.exports = async (req, res) => {
    try {
        const { body } = req;

        if (body.message && body.message.text === '/start') {
            const chatId = body.message.chat.id;
            await bot.sendMessage(
                chatId, 
                "🚀 Bienvenido al Catálogo WordPress\nSelecciona una opción:",
                menuPrincipal
            );
        }
        
        if (body.callback_query) {
            const chatId = body.callback_query.message.chat.id;
            const data = body.callback_query.data;

            switch(data) {
                case 'plugins':
                    await bot.sendMessage(chatId, 
                        "📦 Carpeta de Plugins WordPress:\n\n" +
                        "🔗 <a href='https://1drv.ms/f/c/9d9ea4b6b0bffdd1/EhxtfhiVnQ1CisLKnLVYkAYBGsR_1uJ2aqzMuBE5MHQoYg?e=ovQDo4'>Acceder a Plugins</a>\n\n" +
                        "✅ Plugins premium y gratuitos\n" +
                        "🔄 Actualizados regularmente",
                        { parse_mode: 'HTML' }
                    );
                    break;

                case 'temas':
                    await bot.sendMessage(chatId, 
                        "🎨 Carpeta de Temas WordPress:\n\n" +
                        "🔗 <a href='https://1drv.ms/f/c/9d9ea4b6b0bffdd1/EscL1ySm5fRHj8rfmXLrEgUBM43m0GzdyIIrH_rqAPF1kw?e=IYXGdv'>Acceder a Temas</a>\n\n" +
                        "✅ Temas premium y gratuitos\n" +
                        "📱 Plantillas responsive",
                        { parse_mode: 'HTML' }
                    );
                    break;

                case 'soporte':
                    await bot.sendMessage(chatId, 
                        "📱 Opciones de Contacto\n" +
                        "Selecciona cómo prefieres contactarnos:",
                        menuContacto
                    );
                    break;

                case 'email':
                    await bot.sendMessage(chatId, 
                        "📧 Contacto vía Email:\n" +
                        "info@expertowordpress.com"
                    );
                    break;

                case 'web':
                    await bot.sendMessage(chatId, 
                        "🌐 Visita nuestra web:\n" +
                        "https://expertowordpress.com/contacto"
                    );
                    break;

                case 'telegram':
                    await bot.sendMessage(chatId, 
                        "💬 Contacto en Telegram:\n" +
                        "@Ximosabot"
                    );
                    break;

                case 'menu':
                    await bot.sendMessage(
                        chatId, 
                        "🚀 Menú Principal\nSelecciona una opción:",
                        menuPrincipal
                    );
                    break;
            }
        }

        res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(200).json({ ok: true });
    }
};