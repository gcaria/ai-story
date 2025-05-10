# Backend (FastAPI + FAISS)
import json
import os

import faiss
import numpy as np
import openai
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

load_dotenv()  # optional — for local dev or when .env is mounted

openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load embeddings and FAISS index
model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("book_index.faiss")
with open("book_chunks.json", "r", encoding="utf-8") as f:
    chunks = json.load(f)


class QueryRequest(BaseModel):
    query: str


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/health")
def health_check():
    return JSONResponse(status_code=200, content={"status": "ok"})


@app.post("/query")
async def query_book(req: QueryRequest):
    # Embed query
    query_vec = model.encode([req.query])
    _, I = index.search(np.array(query_vec), k=3)

    # Retrieve top-k context chunks
    context = "\n".join([chunks[i] for i in I[0]])

    # Call OpenAI API
    prompt = f"""{req.query}

    This is some sample text to guide you learning the style of this author:
    "{context}"
    """

    print(prompt)
    response = openai.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
    )
    answer = response.choices[0].message.content.strip()
    return {"answer": answer}
