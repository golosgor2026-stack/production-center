import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function generateVideo() {
  try {
    console.log('🚀 Initializing Z-AI SDK...');
    const zai = await ZAI.create();

    // Read and encode the image
    const imagePath = '/home/z/my-project/upload/DSC_6331.jpg';
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

    console.log('📹 Creating video generation task...');
    console.log('Prompt: People in audience taking photos and applauding at concert');

    // Create video generation task
    const task = await zai.video.generations.create({
      image_url: base64Image,
      prompt: 'People in the audience taking photos with cameras and phones, applauding and clapping hands enthusiastically at a concert event in a grand hall, animated movement, realistic motion, celebration atmosphere',
      quality: 'quality',
      duration: 5,
      fps: 30,
      size: '1344x768'
    });

    console.log('✅ Task created:', task.id);
    console.log('Status:', task.task_status);

    // Poll for results
    let result = await zai.async.result.query(task.id);
    let pollCount = 0;
    const maxPolls = 120;
    const pollInterval = 5000;

    while (result.task_status === 'PROCESSING' && pollCount < maxPolls) {
      pollCount++;
      console.log(`⏳ Polling ${pollCount}/${maxPolls}: Status is ${result.task_status}`);
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      result = await zai.async.result.query(task.id);
    }

    if (result.task_status === 'SUCCESS') {
      const videoUrl = result.video_result?.[0]?.url ||
                      result.video_url ||
                      result.url ||
                      result.video;
      
      console.log('🎉 Video generated successfully!');
      console.log('Video URL:', videoUrl);
      
      // Save result
      fs.writeFileSync('/home/z/my-project/public/hero-video-url.txt', videoUrl || '');
      
      // Download video
      if (videoUrl) {
        console.log('📥 Downloading video...');
        const response = await fetch(videoUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync('/home/z/my-project/public/hero-video.mp4', buffer);
        console.log('✅ Video saved to /public/hero-video.mp4');
      }
      
      return videoUrl;
    } else {
      console.log('❌ Task failed or still processing');
      console.log('Result:', JSON.stringify(result, null, 2));
      return null;
    }
  } catch (error: any) {
    console.error('Error:', error.message);
    throw error;
  }
}

generateVideo();
