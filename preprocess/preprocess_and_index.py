# Script: preprocess_and_index.py
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
import faiss
import json
import numpy as np
import sys

if len(sys.argv) < 2:
    print("Usage: python script.py <filename>")
    sys.exit(1)

filename = sys.argv[1]

with open(filename, "r", encoding="utf-8") as f:
    book_text = f.read()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=1024, chunk_overlap=50)
chunks = splitter.split_text(book_text)

# Embed chunks
model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(chunks, show_progress_bar=True)

# Save FAISS index
dimension = embeddings[0].shape[0]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))
faiss.write_index(index, "book_index.faiss")

# Save chunks for retrieval
with open("book_chunks.json", "w", encoding="utf-8") as f:
    json.dump(chunks, f)

print("Indexing complete. Book embedded and saved.")
