import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

logger = logging.getLogger("bhu_rail.db")

engine = create_engine(
    settings.DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initializes the database: ensures postgis extension and creates tables."""
    try:
        with engine.connect() as conn:
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS postgis;"))
            conn.commit()
            logger.info("PostGIS extension confirmed.")
        
        # Import models so that Base.metadata knows about them
        from app.db import models  # noqa: F401
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables verified / created.")
    except Exception as e:
        logger.error(f"Error during database initialization: {e}")
        raise
