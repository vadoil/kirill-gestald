import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  source: z.string().min(1).max(50),
  name: z.string().trim().min(1).max(100),
  contact: z.string().trim().min(1).max(200),
  message: z.string().trim().max(2000).optional().default(""),
  quizResult: z.string().trim().max(500).optional().default(""),
});

export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      throw new Error("Telegram credentials are not configured");
    }

    const lines = [
      `🆕 <b>Новая заявка</b> · ${escapeHtml(data.source)}`,
      "",
      `<b>Имя:</b> ${escapeHtml(data.name)}`,
      `<b>Контакт:</b> ${escapeHtml(data.contact)}`,
    ];
    if (data.quizResult) lines.push(`<b>Результат квиза:</b> ${escapeHtml(data.quizResult)}`);
    if (data.message) lines.push("", `<b>Сообщение:</b>`, escapeHtml(data.message));
    lines.push("", `🕒 ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Samara" })}`);

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("Telegram sendMessage failed", res.status, body);
      throw new Error("Не удалось отправить заявку. Попробуйте ещё раз.");
    }

    return { ok: true as const };
  });

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
