from fastapi import FastAPI, File, UploadFile, HTTPException
from app.validation.utils import getImageInfo, detectNSFWContent, uploadToS3
from app.dynamoDB.utils import addImageToDB

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
        
        isNSFW, nsfwLabels = detectNSFWContent(file)
        if isNSFW:
            raise HTTPException(status_code=400, detail=f"Uploaded file contains NSFW content: {nsfwLabels}")

        uploadResponse = uploadToS3(file, 1 * 3600)
        if not uploadResponse.get("success", False):
            error_message = uploadResponse.get("error", "Unknown error")
            raise HTTPException(status_code=400, detail=f"Error in uploading file: {error_message}")

        imageURL = uploadResponse["pre"]
        updateDBResponse = addImageToDB("test-user-1", imageURL, 5)

        if not updateDBResponse.get("success", False):
            error_message = updateDBResponse.get("error", "unknown error")
            raise HTTPException(status_code=400, detail=f"Error updating DB: {error_message}")

        return {
            "message": "Image uploaded successfully",
            "info": imageInformation,
            "url": imageURL
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
