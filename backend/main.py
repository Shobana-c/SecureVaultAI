from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# ---------------- IMPORT ROUTERS ----------------

from routes.auth import router as auth_router
from routes.password import router as password_router
from routes.generator import router as generator_router
from routes.strength import router as strength_router
from routes.dashboard import router as dashboard_router
from routes.ai import router as ai_router
from routes.twofa import router as twofa_router


# ---------------- DATABASE ----------------

from database.database import Base, engine

# Import Models so tables are created
from models.user import User
from models.password import Password



# ---------------- CREATE APP ----------------

app = FastAPI(
    title="SecureVault AI API",
    version="1.0.0",
    description="AI Powered Secure Password Vault"
)



# ---------------- DATABASE TABLE CREATION ----------------

Base.metadata.create_all(
    bind=engine
)



# ---------------- ADD ROUTERS ----------------


app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)


app.include_router(
    password_router,
    prefix="/password",
    tags=["Password Vault"]
)


app.include_router(
    generator_router,
    prefix="/generator",
    tags=["Password Generator"]
)


app.include_router(
    strength_router,
    prefix="/strength",
    tags=["Password Strength"]
)


app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)


app.include_router(
    ai_router,
    prefix="/ai",
    tags=["AI Security"]
)


app.include_router(
    twofa_router,
    prefix="/2fa",
    tags=["Two Factor Authentication"]
)



# ---------------- CORS ----------------

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)



# ---------------- HOME API ----------------


@app.get("/")
def home():

    return {
        "status": "running",
        "message": "Welcome to SecureVault AI Backend"
    }



# ---------------- DEBUG ROUTES ----------------

print("\n========== REGISTERED ROUTES ==========")

for route in app.routes:

    if hasattr(route, "path"):

        print(route.path)

print("=======================================\n")