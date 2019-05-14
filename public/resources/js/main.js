var app = {
    notify: {
        warning: (text, title = '') => {
            $(".main-container").prepend('<div class="alert alert-warning alert-dismissible">' + 
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' + 
            '<strong>' + title + ' </strong>' + text + '</div>');
        },
        info: (text, title = '') => {
            $(".main-container").prepend('<div class="alert alert-primary alert-primary">' + 
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' + 
            '<strong>' + title + ' </strong>' + text + '</div>');
        },
        success: (text, title = '') => {
            $(".main-container").prepend('<div class="alert alert-success alert-dismissible">' + 
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' + 
            '<strong>' + title + ' </strong>' + text + '</div>');
        },
        error: (text, title = '') => {
            $(".main-container").prepend('<div class="alert alert-danger alert-dismissible">' + 
            '<button type="button" class="close" data-dismiss="alert">&times;</button>' + 
            '<strong>' + title + ' </strong>' + text + '</div>');
        }
    }
}