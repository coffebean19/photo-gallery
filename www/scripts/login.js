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
    let res = fetch(`/login/${_username}`)
        .then(response => response.json())
        .then(resJson => console.log(resJson.data))
    console.log(res);
    window.location.href= '/home/home.html';
}
