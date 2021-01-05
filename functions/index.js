const { cloudinary } = require('./utils/cloudinary');
const functions = require('firebase-functions');

const cors = require('cors')
const corsConfig = cors({origin: true})

exports.generateImage = functions.https.onRequest((request, response) => {
    corsConfig(request, response, () => {
        const width = request.body.width;
        const height = request.body.height;
        const text = request.body.text;
        const color = request.body.color;

        try {
            const url = cloudinary.url(`backgrounds/${color}.png`, {
                secure: true,
                width: width,
                height: height,
                crop: 'scale',
                transformation: [
                    {
                        overlay: {
                            font_family: 'SFProBold',
                            font_size: 0.08 * width,
                            text: text,
                        },
                        color: '#ffffff',
                    }
                ]
            });

            response.status(200).json({ link: url });
        } catch (err) {
            console.error(error)
            response.status(500).json({ message: 'ERROR' });
        }
    })
});
