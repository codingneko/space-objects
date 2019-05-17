document.getElementById('submit').addEventListener('click', (action) => {
    action.preventDefault();

    let UserInput = {
        password: sha1(document.getElementById('password').value),
        userName: document.getElementById('userName').value,
        request: 'login'
    }

    fetch('/auth', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(UserInput)
    }).then(response => {
        return response.json();
    }).then(data => {
        // handle result displaying here
        if(data.status === 0){
            app.notify.success('Welcome, ' + data.user.name + '. You\'ll be redirected shortly.');
            app.setCookie('user', data.user.id);
            window.location.href = '/';
        }else if(data.status === 403){
            app.notify.error('try again', 'password was wrong');
        }else if(data.status === 1){
            app.notify.error('something went wrong');
        }
    });


    setTimeout(app.notify.clearAlerts, 3000);
});