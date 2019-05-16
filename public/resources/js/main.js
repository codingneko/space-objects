var app = {
    notify: {
        warning: (text, title = '') => {
            $(".notification-container").append('<div class="alert alert-warning alert-dismissible">' + 
                '<button type="button" class="close" data-dismiss="alert">&times;</button>' + 
                '<strong>' + title + ' </strong>' + text + '</div>');
        },
        info: (text, title = '') => {
            $(".notification-container").append('<div class="alert alert-primary alert-primary">' + 
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' + 
            '<strong>' + title + ' </strong>' + text + '</div>');
        },
        success: (text, title = '') => {
            $(".notification-container").append('<div class="alert alert-success alert-dismissible">' + 
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' + 
            '<strong>' + title + ' </strong>' + text + '</div>');
        },
        error: (text, title = '') => {
            $(".notification-container").append('<div class="alert alert-danger alert-dismissible">' + 
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' + 
            '<strong>' + title + ' </strong>' + text + '</div>');
        },
        clearAlerts:() => {
            $(".alert").remove();
        }
    },
    setCookie: (key, value) => {
        document.cookie = key + '=' + value;
    }
}