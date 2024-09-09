import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

const cld = new Cloudinary({ cloud: { cloudName: 'dvhi4yyrm' } });

const UploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'MyLink_preset'); // Replace with your unsigned upload preset

    try {
        // Step 1: Upload the file to Cloudinary
        const response = await fetch(`https://api.cloudinary.com/v1_1/dvhi4yyrm/image/upload`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();

        if (response.ok) {
            const publicId = data.public_id;

            // Step 2: Generate a transformed URL for the uploaded image
            const img = cld
                .image(publicId)
                .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
                .quality('auto')
                .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect ratio

            // Step 3: Return the URLs (original and transformed)
            return {
                originalUrl: data.secure_url,
                transformedUrl: img.toURL(),
                response,
            };
        } else {
            throw new Error('Failed to upload image');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default UploadPhoto;

