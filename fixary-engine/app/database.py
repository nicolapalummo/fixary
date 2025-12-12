import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

# Default to local SQLite if no DATABASE_URL is provided (e.g. on Railway)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./fixary.db")

# Fix for Railway/Heroku postgres URLs starting with postgres:// instead of postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
     DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

print(f"🔌 Connecting to Database: {DATABASE_URL.split('://')[0]}...")

engine = create_async_engine(
    DATABASE_URL,
    echo=False, # Set to True for SQL query logging
    future=True
)

SessionLocal = sessionmaker(
    engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def init_db():
    async with engine.begin() as conn:
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
