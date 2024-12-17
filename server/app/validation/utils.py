import boto3

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
        
        rekognitionClient = boto3.client('rekognition', region_name='ap-southeast-1')

        response = rekognitionClient.detect_moderation_labels(Image={'Bytes': image})
        labels = [
            {"Label": label["Name"], "Confidence": label["Confidence"]}
            for label in response.get("ModerationLabels", [])
        ]

        return bool(labels), labels
    
    except Exception as e:
        return {"error": str(e)}, []
