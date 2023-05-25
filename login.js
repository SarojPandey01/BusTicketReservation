let formImput=document.getElementById("form")
let nameInput=document.getElementById("name")
let passwordInput=document.getElementById("password")
let submitInput=document.getElementById("submit")
let API_URL = "https://kgnairbus.onrender.com";


form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    let name = nameInput.value;
    let password =passwordInput.value;
    let form=formImput.value;
    console.log(name)
    console.log(password)
    const data = {
        email:name,
        password,
    };
    console.log(data);
    let res = await fetch(`${API_URL}/login`, {
    
        method: "POST",
        body: JSON.stringify(data),
        cors: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
    
})
})
