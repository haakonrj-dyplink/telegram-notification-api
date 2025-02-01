import 'dotenv/config'; // Load environment variables
import express, { Request, Response } from 'express';
import TelegramBot from 'node-telegram-bot-api';
import HttpError from './core/error/http-error.js';
import apiConfig from './core/apiConfig.js';

const app = express(); // Do NOT type `app` manually
app.use(express.json());

const router = express.Router();

const botToken = apiConfig.TELEGRAM_BOT_TOKEN; // Replace with your bot token
const chatId = apiConfig.TELEGRAM_CHAT_ID; // Replace with your Telegram chat ID

const bot = new TelegramBot(botToken, { polling: true });

function sendNotification(message: string) {
  bot
    .sendMessage(chatId, message)
    .then(() => console.log('Notification sent:', message))
    .catch((err) => console.error('Error sending notification:', err));
}

// Example API route to send a notification
app.post('/notify', (req: Request, res: Response, next) => {
  try {
    const { message } = req.body;
    console.log('Message:', message); 
    if (!message) {
      throw new HttpError(400, 'Message is required');
    }

    sendNotification(message);
    res.send({ success: true, message: 'Notification sent' });
  } catch (error) {
    //next(error);
  }
});

// Listen for "/status" command
bot.onText(/\/status/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "✅ Server is running smoothly!");
});


const PORT = apiConfig.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
