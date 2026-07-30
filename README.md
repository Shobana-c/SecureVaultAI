# SecureVault AI

SecureVault AI is a secure password management web application developed using React and FastAPI.

The application allows users to securely store passwords, generate strong passwords, analyze password strength, and protect accounts using Two-Factor Authentication (2FA).

---

## Features

- User Registration
- User Login with JWT Authentication
- Password Vault
- AES Encrypted Password Storage
- Password Generator
- AI Password Strength Analysis
- Search Saved Passwords
- Backup Vault
- Two-Factor Authentication (Google Authenticator)
- Secure Dashboard

---

## Technologies Used

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

### Backend

- FastAPI
- Python
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib (Password Hashing)
- PyOTP
- QRCode

---

## Project Structure

```
SecureVaultAI
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── layouts
│
├── backend
│   ├── routes
│   ├── models
│   ├── schemas
│   ├── security
│   ├── utils
│   └── database
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Shobana-c/SecureVaultAI.git
```

### Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## Authentication Flow

Register

↓

Login

↓

JWT Token Generated

↓

Protected Dashboard

↓

Generate QR

↓

Scan using Google Authenticator

↓

Verify OTP

↓

2FA Enabled

---

## Future Enhancements

- Email OTP
- Cloud Backup
- Password Sharing
- Password History
- Browser Extension
- Dark Mode

---

## Author

**C. Shobana**

Kingston Engineering College Vellore

B.Tech Computer Science and Business Systems Final Year Student

SecureVault AI Project
