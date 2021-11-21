const login = document.getElementById('login');
const confirm = document.getElementById('confirm');


// (async () => {
//     let res = await fetch("/login");
//     res.json().then(function(data) {
//        console.log(data); // Check console for output
//     });
// })();

function divClicked() {
    let res = fetch("/login")
        .then(response => response.json())
        .then(resJson => console.log(resJson.data))
    console.log(res);
    window.location.href= '/home/home.html';
}
