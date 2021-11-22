const username = document.getElementById('username');
const password = document.getElementById('password');

//Does the signing up, if successful the user will be added. Due to not being able to understand how the 
//the api works of tedious, I can't (yet) get it to do things when it tries to create a duplicate username.
//Strapped for time, I will leave as is.
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
                alert("User already exists");
                console.log(resJson.message);
            }
            else {
                alert("User already exists");
                console.log(resJson.message);
                console.log(resJson.err)
            }
        })
    console.log(res);
}