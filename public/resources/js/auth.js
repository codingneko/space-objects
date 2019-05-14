document.getElementById('submit').addEventListener('click', (action) => {
    action.preventDefault();

    let userInput = {
        password1: document.getElementById('password-1').value,
        passwoord2: document.getElementById('password-2').value,
        userName: document.getElementById('userName'),
        email: document.getElementById('email')
    }

    if(password1 == password2){
        if (password1.length >= 8) {
            fetch('/auth', {
                method: 'POST',
                cache: 'no-cache',
                body: JSON.parse(userInput)
            }).then(response => {
                return response.json();
            }).then(data => {
                // handle result displaying here
                if(data.response === 0){
                    app.notify.success('Welcome, ' + userName + '. You\'ll be redirected shortly.');
                    document.head.append('<meta http-equiv="refresh" content="2; URL=\'/\'" />');
                }
            });
        } else {
            app.notify.error('Your password needs to be at least 8 characters long', 'Password is too weak')
        }
    }else{
        app.notify.error('passwords do not match');
    }
});