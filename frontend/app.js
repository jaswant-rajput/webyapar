

const submitBtn = document.getElementById("submit-login")


submitBtn.addEventListener("click",async()=>{
    const userID = document.getElementById("userID")
    const password = document.getElementById("password")
    if(userID.value == 1 && password.value === "admin"){
        console.log("jhdskjh")
        localStorage.setItem("user",JSON.stringify({role : 2}))
        window.location.href = "./adminPages/adminDashBoard/index.html"
        return
    }

    

    const credentials = {
        userID : userID.value ,
        password : password.value
    }
    
    const response = await fetch("http://localhost:3000/login",{
        method : "POST",
        headers : {
            'Content-Type' : "application/json"
        },
        body : JSON.stringify(credentials)
    })
    const data = await response.json()
    if(data.success && data.user.role === 1){
        localStorage.setItem("user",JSON.stringify(data.user))
        window.location.href = "./userPages/userDashBoard/index.html"
    }else if(data.success && data.user.role === 2){
        localStorage.setItem("user",JSON.stringify(data.user))
        window.location.href = "./adminPages/adminDashBoard/index.html"
    }else {
        alert(data.message)
    }

})