(function($) {
    var background = chrome.extension.getBackgroundPage(),
        console    = chrome.extension.getBackgroundPage().console;

    function retrieveBucketID () {
        messageService.sendMessage({}, 'POPUP_JS', 'getDocumentDomain', function (response) {
            bucketController.getBucket(response.domain, function (bucketId) {
                chrome.browserAction.setBadgeText({text: bucketId.toString()});
            });
        });
    }
    //set badge text with bucket id when plugin is openend

    $('#bucket .table button').click(function () {
        var interval = $(this).text().split('-');
        messageService.sendMessage({}, 'POPUP_JS', 'getDocumentDomain', function (response) {
            console.log(response);
            bucketController.randomBucket(response.domain, interval, function (obj) {
                //refresh the page if the checkbox is checked
                if ($('#refreshPage').prop('checked')) {
                    messageService.sendMessage({}, 'POPUP_JS', 'refreshPage', function () {});
                }
                window.close();
                notificationService.create('bucket-id-info', {
                    title   : 'Success',
                    message : 'Bucket set to browser: ' + obj
                }, function () {});
            });
        });
        retrieveBucketID();
    });

    $('#specific-bucket-id').on('keyup', function (event) {
        var button     = $('#set-specific-bucket-id'),
            bucketVal  = parseInt($(this).val(), 10),
            valueToSet = '';

        if (bucketVal && bucketVal <= 100) {
            valueToSet = bucketVal;
            button.removeAttr('disabled');
        } else if (bucketVal > 100) {
            valueToSet = parseInt($(this).val().substring(0, $(this).val().length - 1), 10);
            
            button.removeAttr('disabled');
        } else {
            button.attr('disabled', 'disabled');
        }

        $(this.val(valueToSet));
    });

    $('#set-specific-bucket-id').click(function () {
        var bucket = parseInt($('#specific-bucket-id').val(), 10);
        messageService.sendMessage({}, 'POPUP_JS', 'getDocumentDomain', function (response) {
            bucketController.specificBucket(response.domain, bucket, function (obj) {
                $('#specific-bucket-id').val('');
                if ($('#refreshPage').prop('checked')) {
                    messageService.sendMessage({}, 'POPUP_JS', 'refreshPage', function () {});
                }
                window.close();
                notificationService.create('bucket-id-info', {
                    title   : 'Success',
                    message : 'Bucket set to browser: ' + obj
                }, function () {});
            });
        });
        retrieveBucketID();
    });

    retrieveBucketID();
})(jQuery);
