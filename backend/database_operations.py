from database import (
    SessionLocal,
    Fingerprint
)


def insert_fingerprints(hashes, song_name):

    print("TOTAL HASHES RECEIVED:", len(hashes))

    db = SessionLocal()

    try:
        BATCH_SIZE = 1000

        for i in range(0, len(hashes), BATCH_SIZE):

            print(
                "INSERTING BATCH:",
                i,
                "to",
                i+BATCH_SIZE
            )

            batch = hashes[i:i+BATCH_SIZE]

            records = [
                Fingerprint(
                    hash=h,
                    song=song_name,
                    time=int(t)
                )
                for h,t in batch
            ]

            db.bulk_save_objects(records)
            db.commit()

    finally:
        db.close()