/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    /* First, validate the message's structure */
//    console.group('content_script.js');
//    console.log('Message receive: ', msg);
//    console.log('From: ', sender);
//    console.groupEnd();

    if ((msg.caller === 'POPUP_JS') && (msg.subject === 'TBC')) {
        /* Collect the necessary data
         * (For your specific requirements `document.querySelectorAll(...)`
         *  should be equivalent to jquery's `$(...)`) */

        /* Directly respond to the sender (popup),
         * through the specified callback */
        switch (msg.action) {
            case 'getDocumentDomain':
                response({
                    domain : getDomain()
                });
                break;
            case 'refreshPage':
                refresh();
                break;
        }
    }
});

function getDomain () {
    return document.domain;
}

function refresh () {
    window.location.reload();
}