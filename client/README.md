# Full Stack Vite + Express App

## 📁 Project Structure

- `client/`: Frontend built with React and Vite.
- `server/`: Backend built with Express.js.
- Common components like Navbar and Footer are included on all pages **except** login and signup.

## 🧱 Pages

- Home
- Dashboard
- Trade
- Market
- Profile
- Login / Signup (without layout)

---

## ⚙️ Installation

### 🖥️ Frontend

```bash
cd client
npm install
npm run dev





import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import DefaultLayout from './layouts/DefaultLayout';

// Pages
import Home from './pages/Home';

