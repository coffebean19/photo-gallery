const username = document.getElementById('username');
const password = document.getElementById('password');

//Does the fetch for checking if the username or password is valid
function divClicked() {
    let _username = username.value;
    let _password = password.value;

    //The response will be that it is either valid, or not. 
    let res = fetch(`/login/${_username}&${_password}`)
        .then(response => response.json())
        .then(resJson => { 
            console.log(resJson.logged) 
            if (resJson.logged == "true") {
                window.location.href = "/home/home.html"
            }
            else {
                alert("Invald username or password");
                console.log(resJson.logged);
            }
        })
    console.log(res);
}
