var instagram = {
     token: cookie.get('token'),
     getLocations: function(location) {
         console.log(cookie.get('token'));
         console.log(location);
        this.sendAjax(
            'https://api.instagram.com/v1/media/search',
            'get',
            'jsonp',
            {lat: location[0], lng: location[1], access_token: this.token, distance: 100, count: 10},
            {success: function(json) {
                $('#photoContent').empty();
                json.data.forEach(function(e) {
                    var img = $('<img/>');
                    img.attr({src: e.images.standard_resolution.url})
                    img.appendTo($('<div/>')).appendTo($('#photoContent'));
                })
            },
            error: function() {console.log(arguments)}})
    },

    sendAjax: function(url, method, dataType, data, extra) {
        if (!extra) {
            extra = {};
        }
        var ajaxSettings = {
            url: url,
            type: method,
            dataType: dataType,
            data: data
        };
        var ajax = $.extend(ajaxSettings, extra);

        $.ajax(ajax);
    }
}