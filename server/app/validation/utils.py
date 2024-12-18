import os
import boto3
from dotenv import load_dotenv

load_dotenv()

REGION = os.getenv('REGION')
BUCKET_NAME = os.getenv("BUCKET_NAME")


def getImageInfo(file):
    """
    returns the information about input image.
    \n
    Args:
        * file: image-file
    \n
    Returns a dictionary with: 
        * name: file-name
        * size: file-size (in_bytes)
    """
    try:
        size = len(file.file.read())
        file.file.seek(0)
        return {
            "filename": file.filename,
            "size":  size
        }
    except Exception as e:
        return {"error": f"Error reading file: {str(e)}"}
    

def detectNSFWContent(file):
    """
    Analyzes the uploaded image using AWS Rekognition to detect moderation labels.
    \n
    Args:
        * file: The uploaded image file.
    \n
    Returns:
        * tuple: (bool, list) A boolean indicating if content is NSFW, and a list of moderation labels.
    """
    try:
        file.file.seek(0)
        image = file.file.read()
        
        rekognitionClient = boto3.client('rekognition', region_name=REGION)

        response = rekognitionClient.detect_moderation_labels(Image={'Bytes': image})
        labels = [
            {"Label": label["Name"], "Confidence": label["Confidence"]}
            for label in response.get("ModerationLabels", [])
        ]

        return bool(labels), labels
    
    except Exception as e:
        return {"error": str(e)}, []


def uploadToS3(file, expiration):
    """
    Uploads the given file to AWS S3 Bucket.
    \n
    Args:
        * file: The uploaded image file (UploadFile).
    \n
    Returns:
        * dict: Success or error message.
    """
    s3Client = boto3.client("s3")
    bucketName = BUCKET_NAME

    try:
        file.file.seek(0)
        
        s3Client.upload_fileobj(file.file, bucketName, file.filename)
        preSignedURL = s3Client.generate_presigned_url("get_object",
                                                        Params={'Bucket': BUCKET_NAME,
                                                                'Key': file.filename,
                                                                'ResponseContentDisposition': 'inline'
                                                                },
                                                        ExpiresIn=expiration,
                                                        )
        return {"success": True, "pre": preSignedURL, "message": f"File '{file.filename}' uploaded successfully."}
    
    except Exception as e:
        return {"error": str(e)}
