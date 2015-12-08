var config = function () {
    function _getBuckets () {
        $.getJSON(chrome.extension.getURL('/config/bucket_id.json'), function(settings) {
            config.buckets = settings;
        });
    }

    function _getValueForBucket (bucket) {
        var value = null;

        for (var i in config.buckets) {
            if (config.buckets[i].id === bucket) {
                value = config.buckets[i].value;
            }
        }

        return value;
    }

    function _getBucketForValue (value) {
        var bucket = null;

        for (var i in config.buckets) {
            if (config.buckets[i].value === value) {
                bucket = config.buckets[i].id;
            }
        }

        return bucket;
    }

    _getBuckets();

    return {
        buckets                : [],
        retrieveValueForBucket : _getValueForBucket,
        retrieveBucketForValue : _getBucketForValue
    }
}();
