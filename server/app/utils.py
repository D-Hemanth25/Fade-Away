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