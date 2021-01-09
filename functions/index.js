const functions = require('firebase-functions');
const admin = require('firebase-admin')
const { cloudinary } = require('./utils/cloudinary');
const { FirebaseFunctionsRateLimiter } = require("firebase-functions-rate-limiter");
const serviceAccount = require('./admin-config.json')
const cors = require('cors')

cors({ origin: true })

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://elemented-images-default-rtdb.firebaseio.com/"
});

const database = admin.database()

const limiter = FirebaseFunctionsRateLimiter.withRealtimeDbBackend(
    {
        name: "rate_limiter_collection",
        maxCalls: 2,
        periodSeconds: 15,
    },
    database,
);

exports.generateImage = functions.https.onRequest(async (request, response) => {
    await limiter.rejectOnQuotaExceededOrRecordUsage();
    return cors()(request, response, () => {
        const width = request.body.width;
        const height = request.body.height;
        const text = request.body.text;
        const color = request.body.color;
    
        try {
            const url = cloudinary.url(`backgrounds/${color}.png`, {
                secure: true,
                width: width,
                height: height,
                crop: 'crop',
                transformation: [
                    {
                        overlay: {
                            font_family: 'SFProBold.ttf',
                            font_size: 0.10 * width,
                            text: text,
                        },
                        color: '#ffffff',
                    }
                ]
            });
    
            response.status(200).json({ link: url });
        } catch (err) {
            console.error(err)
            response.status(500).json({ message: 'ERROR' });
        }
    })
});
