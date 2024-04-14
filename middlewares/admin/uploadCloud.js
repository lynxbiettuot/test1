const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
   
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

module.exports.uploadSingle = (req, res, next) => {
    if(req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
    
            streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            try {
                const result = await streamUpload(req);
                req.body[req.file.fieldname] = result.url;
                next();
            }catch(error) {
                next();
            }
        }
    
        upload(req);
    }else {
        next();
    }
}