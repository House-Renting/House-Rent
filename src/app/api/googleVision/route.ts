import { NextRequest, NextResponse } from 'next/server';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 🔐 Credential Validation Utility Functions
function validateGoogleCredentials(keyPath: string) {
  try {
    // 1. Check File Existence
    if (!fs.existsSync(keyPath)) {
      throw new Error(`Credential file not found at: ${keyPath}`);
    }

    // 2. Read File with Explicit Encoding
    const rawCredentials = fs.readFileSync(keyPath, 'utf8');

    // 3. Comprehensive JSON Parsing with Detailed Error Handling
    let credentials: any;
    try {
      credentials = JSON.parse(rawCredentials);
    } catch (parseError:any) {
      console.error('🚨 JSON Parsing Error:', parseError);
      throw new Error(`Invalid JSON in credentials file: ${parseError.message}`);
    }

    // 4. Validate Critical Credential Fields
    const requiredFields = [
      'type',           // Must be 'service_account'
      'project_id',     // Google Cloud Project ID
      'private_key_id', // Unique key identifier
      'private_key',    // Actual private key
      'client_email',   // Service account email
      'client_id',      // Client identifier
      'auth_uri',       // Google OAuth endpoint
      'token_uri'       // Token generation endpoint
    ];

    // Check for Missing Fields
    const missingFields = requiredFields.filter(field => !credentials[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required credential fields: ${missingFields.join(', ')}`);
    }

    // 5. Additional Validation Checks
    if (credentials.type !== 'service_account') {
      throw new Error('Credentials must be for a service account');
    }

    // 6. Basic Private Key Validation
    if (!credentials.private_key.startsWith('-----BEGIN PRIVATE KEY-----')) {
      throw new Error('Invalid private key format');
    }

    console.log('✅ Credentials validated successfully');
    return true;

  } catch (error) {
    console.error('🚨 Credential Validation Failed:', error);
    throw error;
  }
}

// 🌟 Vision Client Initialization Function
async function initializeVisionClient(keyPath: string) {
  try {
    // 1. Validate Credentials First
    validateGoogleCredentials(keyPath);

    // 2. Initialize Client with Comprehensive Error Handling
    const client = new ImageAnnotatorClient({
      keyFilename: keyPath,
      
      // Optional: Additional configuration
      retryOptions: {
        autoRetry: true,
        maxRetries: 3,
        retryDelayMultiplier: 1.5,
        totalTimeout: 60000 // 60 seconds total timeout
      }
    });

    console.log('🌟 Google Vision Client Initialized Successfully');
    return client;

  } catch (initError:any) {
    console.error('🚨 Vision Client Initialization Error:', {
      message: initError.message,
      name: initError.name,
      stack: initError.stack
    });
    throw new Error(`Failed to initialize Vision Client: ${initError.message}`);
  }
}

// 🚫 Disable default body parsing for file upload
export const config = {
  api: {
    bodyParser: false,
  },
};

// 🔍 Main OCR Processing Function
export async function POST(req: NextRequest) {
  // Temporary file tracking for cleanup
  let tempFilePath: string | null = null;

  try {
    // 1. Parse Incoming Form Data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      throw new Error('No file provided in the request');
    }

    // 2. Validate File Metadata
    console.log('📄 File Details:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // 3. File Type Validation
    const supportedTypes = [
      'image/jpeg', 
      'image/png', 
      'image/gif', 
      'image/bmp', 
      'image/webp'
    ];

    if (!supportedTypes.includes(file.type)) {
      throw new Error(`Unsupported image format: ${file.type}`);
    }

    // 4. File Size Validation
    const maxFileSize = 20 * 1024 * 1024; // 20 MB
    if (file.size > maxFileSize) {
      throw new Error('File size exceeds the maximum limit of 20 MB');
    }

    // 5. Temporary File Storage
    const tempDir = path.join(process.cwd(), 'temp');
    tempFilePath = path.join(tempDir, file.name);

    // Ensure temporary directory exists
    fs.mkdirSync(tempDir, { recursive: true });

    // Convert file to buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    // Write file to temporary location
    fs.writeFileSync(tempFilePath, fileBuffer);

    console.log(`📁 Temporary file saved at: ${tempFilePath}`);

    // 6. Image Dimension Validation
    const metadata = await sharp(tempFilePath).metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;

    if (width > 6400 || height > 4800) {
      throw new Error('Image dimensions exceed 6400 x 4800 pixels');
    }

    // 7. Credential and Client Initialization
    const keyPath = process.env.GOOGLE_CLOUD_VISION_KEY_PATH;

    if (!keyPath) {
      throw new Error("🚨 Missing Google Cloud Vision key path environment variable");
    }

    // Resolve to absolute path
    const resolvedKeyPath = path.resolve(process.cwd(), keyPath);

    // Initialize Vision Client
    const client = await initializeVisionClient(resolvedKeyPath);

    // 8. Perform Text Detection
    const [result] = await client.textDetection(tempFilePath);

    // Optional: Detailed result logging
    console.log("🔍 Raw Vision API Result:", JSON.stringify(result, null, 2));

    // Extract text safely
    const extractedText = result.textAnnotations?.[0]?.description || '';

    console.log('📄 Extracted Text:', extractedText);

    // 9. Clean Up - Delete Temporary File
    if (tempFilePath) {
      fs.unlinkSync(tempFilePath);
      console.log(`🗑️ Temporary file ${tempFilePath} deleted`);
    }

    // 10. Return Successful Response
    return NextResponse.json({
      success: true,
      extractedText,
      fileDetails: {
        name: file.name,
        size: file.size,
        type: file.type,
        width,
        height
      },
      message: extractedText ? 'Text extracted successfully' : 'No text found in image',
    });

  } catch (error: any) {
    // Error Cleanup: Remove temporary file if it exists
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
      } catch (cleanupError) {
        console.error('🚨 Temporary file cleanup error:', cleanupError);
      }
    }

    // Comprehensive Error Logging
    console.error('🚨 OCR Process Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code
    });

    // Detailed Error Response
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Unexpected error processing image',
        errorDetails: {
          name: error.name,
          code: error.code,
          suggestion: 'Check credentials, file format, and Google Cloud setup'
        },
      },
      { status: 500 }
    );
  }
}