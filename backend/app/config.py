from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080
    OPENAI_API_KEY: str
    ANTHROPIC_API_KEY: str  
    # GEMINI_API_KEY: str 
    # GROQ_API_KEY: str
    MISTRAL_API_KEY: str
    
    class Config:
        env_file = ".env"

settings = Settings()