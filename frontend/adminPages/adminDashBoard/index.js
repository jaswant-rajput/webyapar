


const user = JSON.parse(localStorage.getItem("user"))
if(!user || user.role ===1){
    window.location.href = "./../../index.html"
}

const createUserBtn = document.getElementById("submit-login")
const userID = document.getElementById("userID")
const password = document.getElementById("password")

//Parent div
const users = document.getElementById("users")
const fetchData = () =>{
    fetch("http://localhost:3000/get-two-users", {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    const usersArr = data.users;

    // Iterate over the array and create HTML elements
    usersArr.forEach(user => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("p-5", "rounded-3","mb-3");
        newDiv.style.backgroundColor = "#EAECFF";

        const innerDiv = document.createElement("div");
        innerDiv.classList.add("p-2", "ps-2", "border", "border-2", "rounded-3");
        innerDiv.style.backgroundColor = "#ffffff";
        innerDiv.textContent = user.userID;

        newDiv.appendChild(innerDiv);
        
        // Append the new div to the users div
        users.appendChild(newDiv);
    });
    const newBtn = document.createElement("button")
    newBtn.classList.add("btn","col-md-2", "p-2", "text-white", "mt-2")
    newBtn.style.backgroundColor = '#0500FF'
    newBtn.style.alignSelf = "flex-end"
    newBtn.textContent = "View"
    newBtn.addEventListener("click",()=>{
        window.location.href = "./../usersTableView/index.html"
    })
    users.appendChild(newBtn)

})
.catch(error => console.error('Error fetching data:', error));
}

createUserBtn.addEventListener("click",async()=>{
    if(!userID.value  || !password.value){
        alert("userId or password is empty")
        return  
    }

    const newUser = {
        userID : userID.value,
        password : password.value
    }
    
    const response = await fetch("http://localhost:3000/create-user",{
        method : "POST",
        headers : {
            'Content-Type' : "application/json"
        },
        body : JSON.stringify(newUser)
    })
    const data = await response.json()
    console.log(data)
    if(data.success){
        alert(data.message)
        window.location.reload()
    }else {
        alert(data.err._message)
    }
})

fetchData()