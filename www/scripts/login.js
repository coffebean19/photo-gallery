const username = document.getElementById('username');
const password = document.getElementById('password');


// (async () => {
//     let res = await fetch("/login");
//     res.json().then(function(data) {
//        console.log(data); // Check console for output
//     });
// })();

function divClicked() {
    let _username = username.value;
    let _password = password.value;
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
