import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({ cloud: { cloudName: 'dvhi4yyrm' } });

const UploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'MyLink_preset');
    formData.append('folder', 'Documents'); 

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dvhi4yyrm/auto/upload`, {
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
            throw new Error('Failed to upload file');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export default UploadFile;
