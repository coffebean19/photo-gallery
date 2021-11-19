const login = document.getElementById('login');

(async () => {
    let res = await fetch("/login");
    res.json().then(function(data) {
       console.log(data); // Check console for output
    });
})();
console.log(response);