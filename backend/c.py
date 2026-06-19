import sqlite3

conn = sqlite3.connect("fingerprints.db")  
cur = conn.cursor()

cur.execute("SELECT COUNT(*) FROM fingerprints")
print("Total fingerprints:", cur.fetchone()[0])

cur.execute("SELECT COUNT(DISTINCT song) FROM fingerprints")
print("Songs:", cur.fetchone()[0])

conn.close()