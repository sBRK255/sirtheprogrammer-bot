# SirTheProgrammer Bot

A powerful WhatsApp bot built with Node.js and Baileys library, featuring both QR code and pairing code authentication methods.

## 🌟 Features

- Dual Authentication Methods:
  - QR Code Scanning
  - Pairing Code Entry
- Command Handler System
- Basic Commands (ping, help)
- Easily Extensible Command Structure
- Docker Support
- Auto-Reconnect Feature

## 🚀 Installation

### Prerequisites
- Node.js v18 or higher
- npm v8 or higher
- Git

### Setup Steps

1. Clone the repository
2. bash
git clone https://github.com/sBRK255/sirtheprogrammer-bot.git
cd sirtheprogrammer-bot


2. Install dependencies
3. bash
npm install

3. Configure the bot
bash
cp .env.example .env


4. Start the bot

   bash
npm start


## 🔗 Connection Methods

### Method 1: QR Code
1. Run the bot
2. Scan the QR code displayed in terminal with WhatsApp
3. Bot is ready to use

### Method 2: Pairing Code
1. Run the bot
2. Choose 'yes' when asked about pairing code
3. Enter your phone number with country code
4. Enter the provided code in your WhatsApp app

## 🛠️ Commands

- `.help` - Display available commands
- `.ping` - Check bot response time
- More commands coming soon!

## 🚀 Deployment

### Deploy on Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

1. Fork this repository
2. Create a new Web Service on Render
3. Connect your forked repository
4. Use the following settings:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`

## 👤 Owner Information
- **Name:** Baraka Kibiki
- **Contact:** +255617200014

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Support

If you find this project helpful, please consider giving it a star ⭐

## 📞 Contact

For support, email sirtheprogrammer@gmail.com or +255617200014

## 🙏 Acknowledgments

- [Baileys](https://github.com/WhiskeySockets/Baileys) - WhatsApp Web API
- All contributors who helped with the project
