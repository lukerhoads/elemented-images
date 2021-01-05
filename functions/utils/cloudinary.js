const cloudinary = require('cloudinary').v2;
const functions = require('firebase-functions');
const SFProBold = '../../assets/SFProDisplayBold.ttf'

cloudinary.config({
    cloud_name: functions.config().cloudinary.cloud_name,
    api_key: functions.config().cloudinary.apikey,
    api_secret: functions.config().cloudinary.apisecret,
});

cloudinary.uploader.upload(SFProBold, {
    resource_type: 'raw',
    type: 'authenticated',
    public_id: 'SFProBold'
}, (result, err) => {
    console.log(result, err)
})

module.exports = { cloudinary };