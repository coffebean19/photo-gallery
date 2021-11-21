const username = document.getElementById('username');
const password = document.getElementById('password');

function signup() {
    let _username = username.value;
    let _password = password.value;
    let res = fetch(`/signup/${_username}&${_password}`)
        .then(response => response.json())
        .then(resJson => { 
            console.log(resJson.message) 
            if (resJson.message == "success") {
                alert("Successfully added user");
            }
            else if (resJson.message == "failed" || resJson.status == "200") {
                alert("Invald username or password");
                console.log(resJson.message);
            }
            else {
                alert("Could not connect");
                console.log(resJson.message);
                console.log(resJson.err)
            }
        })
    console.log(res);
}