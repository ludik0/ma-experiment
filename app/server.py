from typing import Optional

from fastapi import FastAPI

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from .rule import show_rule_vis
from .lime_viz import get_lime_vis

app = FastAPI()

app.mount("/embedded", StaticFiles(directory="app/embedded/dist/embedded",html =True), name="embedded")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/rule")
def read_root():
    return FileResponse(show_rule_vis())

@app.get("/lime")
def read_root():
    return get_lime_vis()



@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}
