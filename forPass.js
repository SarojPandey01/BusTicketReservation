let formInput = document.getElementById("form");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phoneno");
let password00Input = document.getElementById("password");
let password01Input = document.getElementById("password1");
let submitInput = document.getElementById("submit");


formInput.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    let email = emailInput.value;
    let phoneno = phoneInput.value;
    let password00 = passwordInput.value;
    let password1 = password01Input.value;
    let form = formInput.value;
    console.log(name);
    console.log(password);
    const data = {
      email: name,
      password,
    };