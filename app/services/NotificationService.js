var notificationService = function () {
    function _create (id, obj, callback) {
        chrome.notifications.create(id, {
                type    : 'basic',
                iconUrl : '/icons/user_anonymous.png',
                title   : obj.title,
                message : obj.message
            },
            function(id) {
                callback();
                if (chrome.runtime.lastError) {
                    console.group('NotificationService.js');
                    console.log('Error creating the notification, error: ', chrome.runtime.lastError);
                    console.groupEnd();
                }
            }
        );
    }

    return {
        create : _create
    }
}();
