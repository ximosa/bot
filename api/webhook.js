const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');
require('moment/locale/es');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

module.exports = async (req, res) => {
    // Validación básica
    if (req.method !== 'POST') {
        return res.status(200).json({ ok: true });
    }

    try {
        const { body } = req;
        
        if (body.message) {
            const chatId = body.message.chat.id;
            const text = body.message.text;

            switch (text) {
                case '/start':
                    await bot.sendMessage(chatId, 
                        "¡Hola! Soy Experto en WordPress.\n\n" +
                        "Aquí tienes acceso a las carpetas de recursos WordPress:\n\n" +
                        "📂 <a href='https://1drv.ms/f/c/9d9ea4b6b0bffdd1/EhxtfhiVnQ1CisLKnLVYkAYBGsR_1uJ2aqzMuBE5MHQoYg?e=ovQDo4'>Carpeta de Plugins WordPress</a>\n" +
                        "- Plugins premium y gratuitos\n" +
                        "- Actualizados regularmente\n\n" +
                        "📂 <a href='https://1drv.ms/f/c/9d9ea4b6b0bffdd1/EscL1ySm5fRHj8rfmXLrEgUBM43m0GzdyIIrH_rqAPF1kw?e=IYXGdv'>Carpeta de Temas WordPress</a>\n" +
                        "- Temas premium y gratuitos\n" +
                        "- Plantillas responsive\n\n" +
                        "🔄 Las carpetas se actualizan periódicamente con nuevo contenido",
                        { parse_mode: 'HTML' }
                    );
                    break;

                case '/ayuda':
                    await bot.sendMessage(chatId,
                        "📚 <b>Comandos Disponibles:</b>\n\n" +
                        "/start - Iniciar bot y ver carpetas\n" +
                        "/ayuda - Ver esta lista de comandos\n" +
                        "/info - Información sobre el bot\n\n" +
                        "💡 <b>Cómo usar el bot:</b>\n" +
                        "1. Usa /start para ver las carpetas\n" +
                        "2. Haz clic en los enlaces para acceder\n" +
                        "3. Descarga o sube contenido según necesites\n\n" +
                        "🤝 <b>Asesoramiento:</b>\n" +
                        "Para consultoría WordPress o soporte con plugins:\n" +
                        "<a href='https://expertowordpress.com/contacto/'>expertowordpress.com/contacto</a>",
                        { parse_mode: 'HTML' }
                    );
                    break;

                case '/info':
                    moment.locale('es');
                    const fechaActual = moment().format('D [de] MMMM [de] YYYY');
                    await bot.sendMessage(chatId,
                        "ℹ️ <b>Información del Bot</b>\n\n" +
                        "Este bot proporciona acceso a una colección de plugins y temas WordPress premium.\n\n" +
                        "📦 <b>Contenido disponible:</b>\n" +
                        "- Plugins WordPress Premium\n" +
                        "- Temas WordPress Premium\n" +
                        "- Actualizaciones regulares\n\n" +
                        "👨‍💻 <b>Desarrollado por:</b> @Ximosabot\n" +
                        `📅 <b>Última actualización:</b> ${fechaActual}\n\n` +
                        "🤝 <b>Asesoramiento:</b>\n" +
                        "Para consultoría WordPress o soporte con plugins:\n" +
                        "<a href='https://expertowordpress.com/contacto/'>expertowordpress.com/contacto</a>",
                        { parse_mode: 'HTML' }
                    );
                    break;

                default:
                    await bot.sendMessage(chatId, 'Mensaje recibido');
                    break;
            }
        }

        if (body.message && body.message.text && !body.message.text.startsWith('/')) {
            const ADMIN_ID = "7023016272"; // Reemplaza con tu ID
            const msg = body.message;
            
            // Enviar mensaje al admin
            await bot.sendMessage(ADMIN_ID, 
                `📩 Nuevo mensaje de usuario:\n` +
                `De: @${msg.from.username || 'Sin username'}\n` +
                `Mensaje: ${msg.text}`
            );

            // Confirmar al usuario
            await bot.sendMessage(msg.chat.id, 
                '✅ Mensaje recibido. Pronto te responderemos.'
            );
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        console.error('Error en webhook:', error);
        return res.status(200).json({ ok: true });
    }
};
