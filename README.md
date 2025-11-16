# orbz — Daily AI-Powered Horoscope App

orbz is a React-based horoscope application that delivers **personalized daily horoscopes** based on the user’s birthday and zodiac sign. Using the OpenAI API, the app generates fresh, meaningful, and conversational astrology insights every day. Users can also **chat directly with the app** to ask questions, reflect on readings, and explore deeper interpretations of their horoscope.

---

## ✨ Features

### 🔮 Personalized Daily Horoscopes  
- Users enter their **birthday**.  
- The app automatically determines their **zodiac sign**.  
- A unique, AI-generated horoscope is created daily through the **OpenAI API**.

### 💬 Chat With Your Horoscope  
- Users can open a chat interface and speak directly with the app.  
- The OpenAI model provides contextual responses grounded in the user’s horoscope reading.  
- Great for reflection, guidance, and deeper astrological insight.

### ⚛️ Built With React  
- Clean, modular component structure.  
- Hooks for state management and API interaction.  
- Animated and responsive UI for a smooth user experience.

### 🔑 OpenAI Integration  
- Horoscope generation and chat conversations use an OpenAI API key.  
- Prompts are designed to stay consistent with the user's sign, date, and daily reading.  
- API key stored securely on the server or environment variables (not in the client).

---

## 🧠 How It Works

1. **User enters date of birth**  
   The app identifies the zodiac sign (e.g., Pisces, Leo, Virgo).

2. **Fetch daily horoscope**  
   A request is sent to OpenAI with a prompt that includes:
   - user’s birthday  
   - zodiac sign  
   - context for tone + daily astrological themes  

3. **Display the horoscope**  
   The model returns a personalized message which is shown in a clean UI.

4. **Optional: Start a Chat Session**  
   Users can discuss their horoscope with the AI:
   - ask follow-up questions  
   - explore emotional or practical interpretations  
   - reflect on meaning, energy, or advice  

   The chat maintains context using OpenAI's conversation structure.

---

## 🚀 Tech Stack

- **React / JavaScript**
- **OpenAI API**
- **React Hooks**
- **Styled Components / CSS**
- **Node / Express backend** (if applicable for API key protection)

---
