const aws = require('aws-sdk');
require('dotenv').config();
const fs = require("fs");

aws.config.update({
	secretAccessKey : process.env.AWS_ACCESS_KEY_ID,
	acessKeyId : process.env.AWS_SECRET_ACCESS_KEY,
	region:process.env.REGION
});

const bucketName = process.env.BUCKET_NAME;

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: bucketName}
});


const options = {
	partSize:10*1024*1024,
	queueSize:1
};

async function upload(file,filename, folder=null, rawFileName=false){
	
	const fileStream = fs.createReadStream(file.path);
	const params = {
		Bucket:bucketName,
		Key:`${folder ? `${folder}/` : ''}${rawFileName ? `${filename}` : `${Date.now().toString()}-${filename}`}`,
		//Key: `${process.env.PIC_LINK}/${filename}`,
		Body:fileStream,
		ContentType: 'image/jpeg', 
        ACL:'public-read'
	};
	let fileResp = null;

	await s3.upload(params,options)
	.promise()
	.then((res)=>{
		fileResp = res;
	})

	return fileResp;
}

module.exports = upload;
