// dependencies
var AWS = require('aws-sdk');
const sharp = require('sharp');
const https = require('https');
const http = require('http');

// constants
var MD_WIDTH = 1200;

// get reference to S3 client 
var s3 = new AWS.S3();

var DEST_BUCKET = '', API_HOST = '', API_PORT = '';
var apiClient = https;

exports.handler = function (event, context, callback) {
    var srcBucket = event.Records[0].s3.bucket.name;

    if (srcBucket === 'findmyroof-incoming') {
        DEST_BUCKET = 'findmyroof'
        API_HOST = 'api.findmyroof.com'
        API_PORT = 443
    } else {
        DEST_BUCKET = 'findmyroof-dev'
        API_HOST = '24.125.100.123'
        API_PORT = 8080
        apiClient = http
    }

    console.log("Handler using profile settings: " + DEST_BUCKET + ' ' + API_HOST + ':' + API_PORT)

    // Object key may have spaces or unicode non-ASCII characters.
    // srcKey should look like this: AD_ID/IMG-2383.JPG
    var srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

    // Infer the image type.
    var typeMatch = srcKey.match(/\.([^.]*)$/);
    if (!typeMatch) {
        callback("Could not determine the image type.");
        return;
    }

    var imageType = typeMatch[1].toLowerCase();
    if (imageType != "jpg" && imageType != "jpeg" && imageType != "gif" && imageType != "png") {
        callback('Not an image type: ' + imageType);
        return;
    }

    var pieces = srcKey.split('/');

    var adId = parseInt(pieces[0]);
    var fileName = pieces[1];

    var destBucket = DEST_BUCKET;
    var destKey = srcKey;

    s3.getObject({Bucket: srcBucket, Key: srcKey}, function(error, response) {
        if (error) {
            console.error("Error getting the s3 object: ", srcKey);
            return;
        }

        // User sharp image library to rotate and resize the photo
        // https://sharp.pixelplumbing.com/api-operation#rotate
        sharp(response.Body).rotate().resize({width: MD_WIDTH, withoutEnlargement: true}).toBuffer().then(imageData => {
            console.log('**** completed image rotation and resizing')
            s3.putObject({
                Bucket: destBucket,
                Key: destKey,
                Body: imageData,
                ContentType: response.contentType
            }, (err, data) => {
                if (error) {
                    console.error("Error uploading to S3", error);
                } else {
                    console.log('**** photo copied to ' + destBucket + ':' + destKey);

                    var data = JSON.stringify({
                        action: 'UPDATE_PHOTO',
                        ad: {
                            id: adId,
                            photos: [
                                {
                                    adId: adId,
                                    fileName: fileName,
                                    key: destBucket + ':' + destKey
                                }
                            ]
                        }
                    });

                    console.log('**** call findmyroof API to update the ad', data)
        
                    var options = {
                        host: API_HOST,
                        port: API_PORT,
                        path: '/upload/updatePhoto',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8',
                            'Content-Length': data.length,
                            'Fmr-Access-Key': 'AKIAWU3SKYLCZG5AI34X'
                        }
                    };
        
                    var req = apiClient.request(options, function (res) {
                        var msg = '';
        
                        res.setEncoding('utf8');
                        res.on('data', function (chunk) {
                            msg += chunk;
                        });
                        res.on('end', function () {
                            var result = JSON.parse(msg);
                            console.log('API response', result);
                            if (result['code'] == 'SUCCESS') {
                                console.log('The photo is successfully updated.')
                            }
                        });
                    });
        
                    req.write(data);
                    req.end();
        
                }
            });
        });
    });
};
