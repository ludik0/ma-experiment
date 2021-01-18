from typing import Optional

from fastapi import Request, FastAPI

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse,Response

from .rule import show_rule_vis
from .lime_viz import LimeViz
from .feature_selection import FeatureSelection
import uuid
import logging
logging.basicConfig(format='%(asctime)s %(message)s',filename='participants_access.log', level=logging.INFO)

limeviz = LimeViz()
fs = FeatureSelection()
app = FastAPI()

app.mount("/embedded", StaticFiles(directory="app/embedded/dist/embedded",html =True), name="embedded")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/rule")
def read_root():
    return FileResponse(show_rule_vis())

@app.post("/fs")
async def read_root(request: Request):
    body = await request.json()
    logging.info(",reqId:"+str(request.state.requestId)+","+str(request.query_params)+",url="+str(request.url)+",body="+str(body)) 
    print("hello")
    
    print(body)
    newFeatures = []
    for ele in body:
        newFeatures.append(ele["internalName"])
    #list(map(lambda x: x.internalName, body))
    print(str(newFeatures))
    return fs.calculateNewResult(newFeatures)
@app.get("/fs/feature_list")
def read_root():
    return fs.getFeatureList()

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

@app.middleware("http")
async def custom_logging(request: Request, call_next):
    if "/embedded" in str(request.url):
        return await call_next(request)
    reqId = uuid.uuid4()
    request.state.requestId = reqId
    #if(request.method == "POST"):
    #    logging.info(",reqId:"+str(reqId)+","+str(request.query_params)+",url="+str(request.url)+",body="+str(await request.json())) 
    #if(request.method == "GET"):
    #    logging.info(",reqId:"+str(reqId)+","+str(request.query_params)+",url="+str(request.url))
    response = await call_next(request)
    body = b""
    async for chunk in response.body_iterator:
        body += chunk
    logging.info(",reqId:"+str(reqId)+","+str(request.query_params)+",url="+str(request.url)+",body="+str(body))
    return Response(
        content=body,
        status_code=response.status_code,
        headers=dict(response.headers),
        media_type=response.media_type
    )
    return response
