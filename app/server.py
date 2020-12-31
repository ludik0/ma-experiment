from typing import Optional

from fastapi import Request, FastAPI

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from .rule import show_rule_vis
from .lime_viz import LimeViz
limeviz = LimeViz()
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
    return limeviz.get_lime_vis(None)
@app.get("/lime/sample")
def read_root():
    return limeviz.getSampleValues()
@app.post("/lime")
async def read_root(request: Request):
    body = await request.json()
    print(body.values()) 
    return limeviz.get_lime_vis(body.values())



@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}
