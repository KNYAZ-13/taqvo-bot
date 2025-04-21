import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on("message", (msg) => {
  if (msg.web_app_data?.data) {
    const data = JSON.parse(msg.web_app_data.data);

    const orderText = `
🛒 *Новый заказ — TAQVO*
👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
📍 Адрес: ${data.address}
💳 Оплата: ${data.payment}

🧾 Заказ:
${data.products.map(p => `• ${p.name} — ${p.count} ${p.unit}`).join("\n")}

💰 *Итого:* ${data.total.toLocaleString()} сум
    `;

    bot.sendMessage(process.env.OWNER_ID, orderText, { parse_mode: "Markdown" });
  }
});