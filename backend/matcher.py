from collections import Counter, defaultdict
from database import SessionLocal, Fingerprint


def match_song(query_hashes):

    db = SessionLocal()

    offset_counter = Counter()
    song_offsets = defaultdict(list)

    hash_to_time = {
        h: t
        for h, t in query_hashes
    }

    hashes = list(hash_to_time.keys())

    batch_size = 5000

    for i in range(0, len(hashes), batch_size):

        batch = hashes[i:i + batch_size]

        rows = db.query(
            Fingerprint.hash,
            Fingerprint.song,
            Fingerprint.time
        ).filter(
            Fingerprint.hash.in_(batch)
        ).all()

        for db_hash, song, db_time in rows:

            query_time = hash_to_time[db_hash]

            # Temporary workaround if old DB contains bytes
            if isinstance(db_time, bytes):
                db_time = int.from_bytes(
                    db_time,
                    byteorder="little",
                    signed=True
                )

            offset = int(db_time) - int(query_time)

            offset_counter[(song, offset)] += 1
            song_offsets[song].append(offset)

    db.close()

    if not offset_counter:
        return {
            "song": None,
            "score": 0,
            "confidence": 0,
            "offset": 0,
            "offsets": []
        }

    top_two = offset_counter.most_common(2)

    (best_song, best_offset), best_score = top_two[0]

    second_score = (
        top_two[1][1]
        if len(top_two) > 1
        else 1
    )

    confidence = round(
        100 * best_score / (best_score + second_score),
        2
    )

    print("\nTOP MATCHES:")

    for (song, offset), score in offset_counter.most_common(10):
        print(song, offset, score)

    return {
        "song": best_song,
        "score": best_score,
        "confidence": confidence,
        "offset": best_offset,
        "offsets": song_offsets[best_song]
    }