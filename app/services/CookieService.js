var cookieService = function () {
    function getCookie(domain, callback) {
        chrome.cookies.get({"url": domain.url, "name": domain.name}, function(cookie) {
           callback(cookie);
       });
    }

    function setCookie(obj, callback) {
        chrome.cookies.set(obj, callback);
    }

    return {
        get    : getCookie,
        set    : setCookie,
        remove : function () {}
    }
}();
