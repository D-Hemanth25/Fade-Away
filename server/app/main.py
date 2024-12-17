from fastapi import FastAPI, File, UploadFile, HTTPException
from app.utils import getImageInfo

app = FastAPI()

@app.get("/")
def index():
    return {
        "message": "Hello!"
    }

@app.post("/upload")
async def uploadImage(file: UploadFile = File(...)):
    """
    Endpoint takes in an image file and
    \n
    1. validates \n
    2. uploads the image to AWS S3 bucket \n
    3. updates DyanamoDB with meta-data
    """

    try:
        imageInformation = getImageInfo(file)
        if "error" in imageInformation:
            raise HTTPException(status_code=500, detail=imageInformation["error"])
        
        size = imageInformation["size"]
        if size < 1:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")
        elif size > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="Uploaded file is too large.")
        
        return {
            "message": "Image uploaded successfully",
            "info": imageInformation
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
