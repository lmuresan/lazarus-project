var bucketController = function () {
    function _randomBucket (domain, interval, callback) {
        var min         = parseInt(interval[0], 10),
            max         = parseInt(interval[1], 10),
            bucket      = Math.floor(Math.random()*(max-min+1)+min),
            cookieValue = config.retrieveValueForBucket(bucket);

        _setBucket(domain, cookieValue, function () {
            callback(bucket);
        });
    }

    function _specificBucket (domain, bucket, callback) {
        var cookieValue = config.retrieveValueForBucket(bucket);

        _setBucket(domain, cookieValue, function () {
            callback(bucket);
        });
    }

    function _setBucket(domain, value, callback) {
        cookieService.set({
            url            : "http://www." + domain,
            domain         : "." + domain,
            name           : "vid",
            value          : value,
            path           : "/",
            expirationDate : (new Date().getTime()/1000) + 3600
        }, callback);
    }

    function _getBucket(domain, callback) {
        cookieService.get({
            url            : "http://www." + domain,
            name           : "vid"
        }, function (cookieData) {
            callback(config.retrieveBucketForValue(cookieData.value));
        });
    }

    return {
        randomBucket   : _randomBucket,
        specificBucket : _specificBucket,
        getBucket      : _getBucket
    }
}();
