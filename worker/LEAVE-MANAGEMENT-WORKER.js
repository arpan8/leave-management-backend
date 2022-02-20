const { QUEUE_NAME, queueConfig } = require('../config/queue');
const Queue = require('../services/queue');
const upload = require('../services/s3-bucket')
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const getSignedURL = require('../services/s3-url');
try {

    Queue[QUEUE_NAME.FILE_UPLOAD].process(async (job, done) => {

        try {
            
            console.log(`[ ${QUEUE_NAME.FILE_UPLOAD} ] => [ EXECUTING ]`, job.data);

            let { file } = job.data;

            let fileName = file.filename;

            let fileExtension = fileName.split('.').pop();

            const allowedExtensions = ["jpg", "jpeg", "png", "svg"];

            const shouldAcceptFileType = allowedExtensions.includes(fileExtension.toLowerCase());

            if (!shouldAcceptFileType) return error({}, `${fileExtension} files are not allowed`, 409)(h);

            let uploadResult = await upload(file, fileName);

            console.log('upload result', uploadResult.Location)

            let signedUrl = getSignedURL(uploadResult.Location, 8760);

            console.log('signedUrl', signedUrl);

            await unlinkFile(file.path);


        } catch (err) {
            console.log('ERR: ', err);
        }



        done();

    });

} catch (error) {
    console.error("QUEUE ERROR", error);
}


