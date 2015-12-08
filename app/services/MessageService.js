var messageService = function () {
    function _addMessage(obj, caller, action, callback) {
        /* ...query for the active tab... */
        chrome.tabs.query({
            active        : true,
            currentWindow : true
        }, function(tabs) {
            /* ...and send a request for the DOM info... */
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    caller : caller,
                    action : action,
                    data   : obj,
                    subject: 'TBC'
                },
                /* ...also specifying a callback to be called
                 *    from the receiving end (content script) */
                callback);
        });
    }

    return {
        sendMessage: _addMessage
    }
}();
