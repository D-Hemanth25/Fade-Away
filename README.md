# Fade-Away

## Description
Fade Away is an Image Upload Service.
The backend application is built with FastAPI that provides an API for uploading, validating, and managing images.
Uploaded images are stored in an AWS S3 bucket, and metadata is managed using DynamoDB.
The service ensures security and efficiency by validating image content, restricting file sizes, and preventing the exposure of sensitive data.

## Why
This project addresses common challenges in building secure and scalable image upload services, such as:
- Preventing the upload of inappropriate content (e.g., NSFW images).
- Managing temporary access to uploaded files using pre-signed URLs.
- Automating cleanup of expired images to optimize storage costs.
- Providing a robust API for integration with frontend applications.

By leveraging AWS services like S3 and DynamoDB, the service is both cost-effective and highly scalable.

## Screenshots


<img title="application screenshot" alt="landing page" src="./client/assets/Screenshot 2024-12-24 at 9.55.30 PM.png">

<img title="application screenshot" alt="upload page" src="./client/assets/Screenshot 2024-12-24 at 9.55.18 PM.png">

## Quick Start
### Prerequisites
1. Install Python 3.9 or higher.
2. Set up an AWS account and create an S3 bucket.
3. Configure a DynamoDB table with the following fields:
   - `userId`: Partition key
   - `imageKey`: Sort key
   - `expiry`: Number (timestamp for expiration)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/image-upload-service.git
   cd image-upload-service
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Configure environment variables in a `.env` file:
   ```env
   BUCKET_NAME=your-s3-bucket-name
   AWS_ACCESS_KEY_ID=your-aws-access-key-id
   AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   DYNAMO_TABLE_NAME=your-dynamodb-table-name
   ```
4. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
5. Access the API documentation at `http://127.0.0.1:8000/docs`.

## Usage
### Upload an Image
**Endpoint:** `POST /upload`

#### Request Parameters:
- `userId` (string): Unique identifier for the user.
- `expiry` (integer): Expiry time in hours for the pre-signed URL.
- `file` (UploadFile): The image file to upload.

#### Example Request:
```bash
curl -X POST "http://127.0.0.1:8000/upload" \
     -F "userId=123" \
     -F "expiry=24" \
     -F "file=@path/to/image.png"
```

#### Response:
```json
{
  "message": "Image uploaded successfully",
  "info": {
    "size": 102400,
    "type": "image/png"
  },
  "url": "https://your-bucket.s3.amazonaws.com/image.png?AWSAccessKeyId=..."
}
```

# Work In progress

### Scheduled Cleanup
Expired images are automatically deleted using an AWS Lambda function. The Lambda function:
1. Scans the DynamoDB table for expired entries.
2. Deletes corresponding objects from the S3 bucket.
3. Removes metadata entries from DynamoDB.

Set up a scheduled event in EventBridge to trigger the Lambda function periodically.