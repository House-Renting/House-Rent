// import { NextRequest, NextResponse } from 'next/server';
// import { createWorker } from 'tesseract.js';
// import { writeFile, unlink, mkdir } from 'fs/promises';
// import path from 'path';
// import { existsSync } from 'fs';

// export const runtime = 'nodejs';

// // Define worker options type
// interface WorkerOptions {
//   logger: (m: any) => void;
//   workerPath: string;
//   langPath: string;
//   cacheMethod: 'none' | 'write' | 'read' | 'readwrite';
// }

// export async function POST(request: NextRequest) {
//   console.log('🚀 Starting OCR process...');
//   let worker;
//   let tempPath;

//   try {
//     // Create tmp directory if it doesn't exist
//     const tmpDir = path.join(process.cwd(), 'tmp');
//     console.log('📁 Tmp directory path:', tmpDir);

//     if (!existsSync(tmpDir)) {
//       console.log('📂 Creating tmp directory...');
//       await mkdir(tmpDir, { recursive: true });
//       console.log('✅ Tmp directory created');
//     }

//     // Get file from request
//     console.log('📨 Parsing form data...');
//     const formData = await request.formData();
//     const file = formData.get('file') as File;

//     if (!file) {
//       console.log('❌ No file found in request');
//       return NextResponse.json(
//         { error: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     // Save file temporarily
//     console.log('💾 Converting file to buffer...');
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     tempPath = path.join(tmpDir, `${Date.now()}-${file.name}`);
//     console.log('📝 Temporary file path:', tempPath);

//     console.log('💾 Writing file to disk...');
//     await writeFile(tempPath, buffer);
//     console.log('✅ File written successfully');

//     // Define worker path based on your specific node_modules structure
//     const workerPath = path.join(
//       process.cwd(),
//       'node_modules',
//       'tesseract.js',
//       'src',
//       'worker-script',
//       'node',
//       'index.js'
//     );

//     // Define worker options
//     const workerOptions: WorkerOptions = {
//       logger: (m) => console.log(m),
//       workerPath: workerPath,
//       langPath: path.join(process.cwd(), 'tessdata'),
//       cacheMethod: 'none'
//     };

//     // Initialize worker with language and options
//     console.log('🤖 Creating Tesseract worker...');
//     console.log('Using worker path:', workerPath);
    
//     worker = await createWorker(
//       'eng',  // language
//       1,      // OEM (OCR Engine Mode)
//       workerOptions
//     );
    
//     console.log('✅ Worker created successfully');

//     // Perform OCR
//     console.log('🔍 Starting OCR recognition...');
//     const { data: { text } } = await worker.recognize(tempPath);
//     console.log('✅ OCR completed successfully');
//     console.log('📝 Extracted text:', text);

//     return NextResponse.json({ 
//       success: true,
//       text: text 
//     });

//   } catch (error: any) {
//     console.error('❌ OCR Error:', error);
//     console.error('Error details:', {
//       message: error.message,
//       name: error.name,
//       stack: error.stack
//     });

//     // More specific error handling
//     if (error.code === 'ENOENT') {
//       return NextResponse.json(
//         { error: 'Worker script or language file not found. Please check paths and installation.' },
//         { status: 500 }
//       );
//     }

//     if (error.message.includes('worker script')) {
//       return NextResponse.json(
//         { error: 'Invalid worker script path. Please check Tesseract.js installation.' },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'Failed to process image' },
//       { status: 500 }
//     );

//   } finally {
//     // Cleanup
//     if (tempPath) {
//       console.log('🧹 Cleaning up temporary file...');
//       try {
//         await unlink(tempPath);
//         console.log('✅ Temporary file deleted');
//       } catch (err) {
//         console.error('⚠️ Error deleting temp file:', err);
//       }
//     }

//     if (worker) {
//       console.log('👋 Terminating Tesseract worker...');
//       try {
//         await worker.terminate();
//         console.log('✅ Worker terminated');
//       } catch (err) {
//         console.error('⚠️ Error terminating worker:', err);
//       }
//     }

//     console.log('🏁 OCR process completed');
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

import { NextRequest, NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export const runtime = 'nodejs';

interface WorkerOptions {
  logger: (m: any) => void;
  workerPath: string;
  langPath: string;
  cacheMethod: 'none' | 'write' | 'read' | 'readwrite';
}

export async function POST(request: NextRequest) {
  console.log('🚀 Starting OCR process...');
  let worker;
  let tempPath;

  try {
    // Create tmp directory if it doesn't exist
    const tmpDir = path.join(process.cwd(), 'tmp');
    console.log('📁 Tmp directory path:', tmpDir);

    if (!existsSync(tmpDir)) {
      console.log('📂 Creating tmp directory...');
      await mkdir(tmpDir, { recursive: true });
      console.log('✅ Tmp directory created');
    }

    // Get file from request
    console.log('📨 Parsing form data...');
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      console.log('❌ No file found in request');
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Save file temporarily
    console.log('💾 Converting file to buffer...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    tempPath = path.join(tmpDir, `${Date.now()}-${file.name}`);
    console.log('📝 Temporary file path:', tempPath);

    console.log('💾 Writing file to disk...');
    await writeFile(tempPath, buffer);
    console.log('✅ File written successfully');

    // Use the correct worker path from your file system
    const workerPath = path.join(
      process.cwd(),
      'node_modules',
      'tesseract.js',
      'src',
      'worker-script',
      'node',
      'index.js'
    );

    // Use the correct language data path from your file system
    const langPath = path.join(process.cwd(), 'tessdata');

    // Define worker options with correct paths
    const workerOptions: WorkerOptions = {
      logger: (m) => console.log(m),
      workerPath: workerPath,
      langPath: langPath,
      cacheMethod: 'none'
    };

    // Initialize worker with language and options
    console.log('🤖 Creating Tesseract worker...');
    console.log('Using worker path:', workerPath);
    console.log('Using language path:', langPath);
    
    worker = await createWorker(
      'eng',  // language
      1,      // OEM (OCR Engine Mode)
      workerOptions
    );
    
    console.log('✅ Worker created successfully');

    // Perform OCR
    console.log('🔍 Starting OCR recognition...');
    const { data: { text } } = await worker.recognize(tempPath);
    console.log('✅ OCR completed successfully');
     console.log('📝 Extracted text:', text);

    return NextResponse.json({ 
      success: true,
      extractedText: text ,
      message:"Image has been processed successfully"
    });
  
   
  } catch (error: any) {
    console.error('❌ OCR Error:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });

    if (error.code === 'ENOENT') {
      return NextResponse.json(
        { error: 'Worker script or language file not found. Please ensure the following paths exist:\n' +
                 '- tessdata/eng.traineddata\n' +
                 '- node_modules/tesseract.js/src/worker-script/node/index.js' },
        { status: 500 }
      );
    }

    if (error.message.includes('worker script')) {
      return NextResponse.json(
        { error: 'Invalid worker script path. Please verify Tesseract.js installation.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );

  } finally {
    // Cleanup
    if (tempPath) {
      console.log('🧹 Cleaning up temporary file...');
      try {
        await unlink(tempPath);
        console.log('✅ Temporary file deleted');
      } catch (err) {
        console.error('⚠️ Error deleting temp file:', err);
      }
    }

    if (worker) {
      console.log('👋 Terminating Tesseract worker...');
      try {
        await worker.terminate();
        console.log('✅ Worker terminated');
      } catch (err) {
        console.error('⚠️ Error terminating worker:', err);
      }
    }

    console.log('🏁 OCR process completed');
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};