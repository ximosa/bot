// Manejador simple de mensajes
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Si no es un comando, es un mensaje de chat
    if (text && !text.startsWith('/')) {
        // Notificar al admin (puedes usar tu ID de Telegram)
       const ADMIN_ID = '7023016272'; 
        
        await bot.sendMessage(ADMIN_ID, 
            `📩 Nuevo mensaje de usuario:\n` +
            `De: @${msg.from.username || 'Sin username'}\n` +
            `Mensaje: ${text}`
        );

        // Confirmar al usuario
        await bot.sendMessage(chatId, 
            '✅ Mensaje recibido. Pronto te responderemos.'
        );
    }
});
