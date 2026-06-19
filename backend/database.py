from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String
)

from sqlalchemy.orm import (
    declarative_base,
    sessionmaker
)


DATABASE_URL="sqlite:///fingerprints.db"


engine=create_engine(
    DATABASE_URL,
    connect_args={
        "check_same_thread":False
    }
)


SessionLocal=sessionmaker(
    bind=engine
)


Base=declarative_base()



class Fingerprint(Base):

    __tablename__="fingerprints"


    id=Column(
        Integer,
        primary_key=True
    )


    hash=Column(
        String(40),
        index=True,
        unique=False
        
    )


    song=Column(
        String
    )


    time=Column(
        Integer
    )



def create_tables():

    Base.metadata.create_all(
        engine
    )