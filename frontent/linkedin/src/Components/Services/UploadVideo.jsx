import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({ cloud: { cloudName: 'dvhi4yyrm' } });

const UploadVideo = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'MyLink_preset'); // Replace with your unsigned upload preset
    formData.append('folder', 'Videos'); // Videos will be uploaded to the 'Videos' folder
    formData.append('resource_type', 'video'); // Make sure to set the resource_type to 'video'

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dvhi4yyrm/video/upload`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();

        if (response.ok) {
            return {
                originalUrl: data.secure_url,
                publicId: data.public_id,
                response,
            };
        } else {
            throw new Error('Failed to upload video');
        }
    } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
    }
};

export default UploadVideo;
