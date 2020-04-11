// dependencies
var async = require('async');
var AWS = require('aws-sdk');
var gm = require('gm').subClass({ imageMagick: true }); // Enable ImageMagick integration.
var util = require('util');
var https = require('https');

// constants
var MD_WIDTH = 750;

// get reference to S3 client 
var s3 = new AWS.S3();

exports.handler = function (event, context, callback) {
  // Read options from the event.
  console.log("Reading options from event:\n", util.inspect(event, { depth: 5 }));

  var srcBucket = event.Records[0].s3.bucket.name;

  // Object key may have spaces or unicode non-ASCII characters.
  // srcKey should look like this: 914/upload/VB9qA/IMG-2383.JPG
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
  if (pieces[1] != 'upload') {
    callback("Not in upload folder.");
    return;
  }

  var userId = pieces[0];
  var uploadId = pieces[2];
  var fileName = pieces[pieces.length - 1];

  var destBucket = 'nexuspad';

  var uploadKeyPath = userId + '/upload/' + uploadId + '/';

  // re-oriented file has the same name
  var reorientKey = uploadKeyPath + fileName;

  // resized file has "-md" in the name
  var fileNameParts = fileName.split('.');
  var ext = fileNameParts.pop();
  var resizeKey = uploadKeyPath + fileNameParts.join('.') + '-md' + '.' + ext;

  var metaInfoKey = uploadKeyPath + "metaInfo.json";

  var metaInfo = {
    "imageInfo": {},
    "mediumSize": {},
    "originalFile": {}
  };

  // Download the image from S3, transform, and upload to a different S3 bucket.
  async.waterfall([
    function download(next) {
      // Download the image from S3 into a buffer.
      s3.getObject({
        Bucket: srcBucket,
        Key: srcKey
      }, next);
    },

    function metaData(response, next) {
      gm(response.Body).identify(function (err, data) {
        metaInfo.imageInfo = data;
        if (err) {
          next(err);
        } else {
          next(null, response);
        }
      })
    },

    function transform(response, next) {
      // Re-orient and re-size
      gm(response.Body).autoOrient().toBuffer(imageType, function (err, buffer) {
        if (err) {
          next(err);
        } else {
          s3.putObject({
            Bucket: destBucket,
            Key: reorientKey,
            Body: buffer,
            ContentType: response.contentType
          }, (err, data) => {
            if (err) next(err);
            else console.log('Upload successful: ' + reorientKey);
          });

          gm(buffer).size(function (err, size) {
            if (err) {
              next(err);
            }

            metaInfo.originalFile = {
              "fileName": reorientKey,
              "width": size.width,
              "height": size.height
            };

            if (size.width > MD_WIDTH) {
              // Infer the scaling factor to avoid stretching the image unnaturally.
              var scalingFactor = MD_WIDTH / size.width;

              var width = scalingFactor * size.width;
              var height = scalingFactor * size.height;

              // Transform the image buffer in memory.
              this.resize(width, height).toBuffer(imageType, function (err, buffer) {
                if (err) {
                  next(err);
                } else {
                  metaInfo.mediumSize = {
                    "fileName": resizeKey,
                    "width": width,
                    "height": height
                  };

                  s3.putObject({
                    Bucket: destBucket,
                    Key: resizeKey,
                    Body: buffer,
                    ContentType: response.contentType
                  }, (err, data) => {
                    if (err) {
                      next(err);
                    } else {
                      console.log('Upload successful: ' + resizeKey);
                      // upload meta info
                      next();
                    }
                  });
                }
              });
            } else {
              // upload meta info
              next();
            }
          });
        }
      });
    },

    function uploadMeta(next) {
      s3.putObject({
        Bucket: destBucket,
        Key: metaInfoKey,
        Body: JSON.stringify(metaInfo),
        ContentType: "application/json"
      }, (err, data) => {
        if (err) {
          next(err);
        } else {
          console.log('Upload successful: ' + metaInfoKey);
          // make call to API
          next();
        }
      });
    },

    function updateApi() {
      var data = JSON.stringify({
      });
  
      var options = {
          host: 'api.findmyroof.com',
          port: '443',
          path: '/api/upload/' + uploadId + '/photoinfo',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=utf-8',
              'Content-Length': data.length,
              'otoken': userId
          }
      };
  
      var req = https.request(options, function(res) {
        var msg = '';
  
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          msg += chunk;
        });
        res.on('end', function() {
          var result = JSON.parse(msg);
          console.log('API response', result);
          if (result['actionResult'] && result['actionResult'] === 'SUCCESS') {
            // delete the incoming bucket entry
            console.log('delete the incoming object ', srcBucket, uploadKeyPath)
            var params = {
              Bucket: srcBucket, 
              Prefix: uploadKeyPath
             };
            
            s3.listObjects(params, function(err, data) {
              if (err) console.log(err, err.stack);
              if (data.Contents.length !== 0) {
                params = {Bucket: srcBucket};
                params.Delete = {Objects:[]};
            
                data.Contents.forEach(function(content) {
                  params.Delete.Objects.push({Key: content.Key});
                });
            
                s3.deleteObjects(params, function(err, data) {
                  if (err) console.log(err, err.stack);
                  else console.log(data); 
                });
              }          
            });
          }
        });
      });
  
      req.write(data);
      req.end();
    }],

    // handle waterfall error
    function (err) {
      if (err) {
        console.error('Unable to perform action');
        console.error(err);
      } else {
        console.log('The action was successful');
      }
    }
  );
};
