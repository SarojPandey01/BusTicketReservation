let form=document.getElementById('signupform')
let nameInput=document.getElementById('name')
let emailInput=document.getElementById('email')
let phoneInput=document.getElementById('phoneno')
let pass1Input=document.getElementById('password1')
let pass2Input=document.getElementById('password2')
console.log(nameInput)

form.addEventListener('submit',(e)=>{
    e.preventDefault();
   
    let name=nameInput.value
    let email=emailInput.value
    let phoneno=phoneInput.value
    let password1=pass1Input.value
    let password2=pass2Input.value
    let confirmedPassword=false;
    if (password1 != password2){
        alert('Passwords do not match')

    }
    else{
confirmedPassword=true;
    }
    
    // console.log(name)
    // console.log(email)
    // console.log(phoneno)
    // console.log(password1)
    // console.log(password2)
    if(confirmedPassword==true){
        const data={
            name,email,phoneno,password:password1
        }
        console.log(data)
    }
})
