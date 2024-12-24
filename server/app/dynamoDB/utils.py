import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

def addImageToDB(username, url, expiry):
    """
    Adds an image (with URL and expiry) to the images list of a user in the DynamoDB table.

    Parameters:
    - username (str): The username of the user.
    - url (str): The URL of the image.
    - expiry (int): The expiry time of the image in seconds or as a timestamp.
    """
    try:
        new_image = {'url': url, 'expiry': expiry}

        response = table.update_item(
            Key={'username': username},
            UpdateExpression="SET #images = list_append(if_not_exists(#images, :empty_list), :new_image)",
            ExpressionAttributeNames={
                "#images": "images"
            },
            ExpressionAttributeValues={
                ":new_image": [new_image],
                ":empty_list": []
            },
            ReturnValues="UPDATED_NEW"
        )
        return {"success": True, "message": "Image added successfully", "response": response['Attributes']}
    
    except Exception as e:
        return {"error": str(e)}


def findUserImages(username):
    """
    Retrieves all the images for a given user.

    Parameters:
    - username (str): The username of the user.
    """
    try:
        response = table.get_item(
            Key={
                'username': username,
                }
        )
        item = response['Item']
        return {"success": True, "images": item}
    except Exception as e:
         return {"error": str(e)}
