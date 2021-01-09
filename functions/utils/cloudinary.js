const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dxfzgyqor',
    api_key: '415779651193739',
    api_secret: 'Rz-lJmBPNiJdNySDDVLSq91CmQA',
});

module.exports = { cloudinary };