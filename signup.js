let form = document.getElementById("signupform");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phoneno");
let pass1Input = document.getElementById("password1");
let pass2Input = document.getElementById("password2");
let API_URL = "https://kgnairbus.onrender.com";
// let API_URL = "http://localhost:3000";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let name = nameInput.value;
  let email = emailInput.value;
  let phoneno = phoneInput.value;
  let password1 = pass1Input.value;
  let password2 = pass2Input.value;
  let isPasswordValid = false;
  let isPhoneValid = false;
  if (password1 != password2) {
    alert("Passwords do not match");
  } else {
    isPasswordValid = true;
  }

  if (phoneno.length == 10) {
    isPhoneValid = true;
  } else {
    alert("Phone number is not valid");
  }
  let id = Math.floor(100000 + Math.random() * 900000);

  if (isPasswordValid && isPhoneValid) {
    const data = {
      id,
      name,
      email,
      phone: phoneno,
      password: password1,
    };
    console.log(data);
    let signupBtn = document.getElementById("sign-up-btn");
    signupBtn.disabled = true;
    signupBtn.style.clicke;
    signupBtn.style.background = "gray";
    signupBtn.innerText = "Signing Up...";
    let res = await fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      cors: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let resjson = await res.json();
    console.log(resjson);

    signupBtn.style.background = "initial";
    signupBtn.innerText = resjson.authorized
      ? "SIGNUP SUCCESS"
      : "SIGNUP FAILED";
    let userInfo = resjson;
    localStorage.setItem("kgn", JSON.stringify(userInfo));
  }
});
