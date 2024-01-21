
const user = JSON.parse(localStorage.getItem("user"))
if(!user || user.role ===1){
    window.location.href = "./../../index.html"
}


const backBtn = document.getElementById("backBtn")
backBtn.addEventListener("click",()=>{
    window.location.href = "./../adminDashBoard/index.html"
})

const fetchAll = () => {
    fetch("http://localhost:3000/get-all-users", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const usersArr = data.users;
        console.log(usersArr);
        // Call a function to populate the table with the fetched data
        populateTable(usersArr);
    })
    .catch(error => console.error('Error fetching data:', error));
}

const populateTable = (usersArr) => {
    const tableBody = document.getElementById("userTableBody");
    
    // Clear existing rows in the tbody
    tableBody.innerHTML = '';

    // Iterate over the users array and create rows
    usersArr.forEach(user => {
        const row = tableBody.insertRow();
        row.classList.add("border", "border-dark","border-3" ,"align-items-center")
        // Insert cells with user data
        const cell1 = row.insertCell(0);
        cell1.textContent = user.userID;
        cell1.classList.add("border" ,"border-dark", "border-3", "align-middle")
       
        const cell2 = row.insertCell(1);
        cell2.textContent = user.name ? user.name : "-";
        cell2.classList.add("border" ,"border-dark", "border-3", "align-middle")
        
        const cell3 = row.insertCell(2);
        cell3.classList.add("border" ,"border-dark", "border-3", "align-middle")
        
        const image = document.createElement("img");
        image.classList.add("img-fluid");
        image.style.width = "15%";
        image.src = user.imgPath ? `http://localhost:3000/${user.imgPath}` : "./../../default-avatar.png";  // Make sure your user object has a 'photo' property
        cell3.appendChild(image);

        const cell4 = row.insertCell(3);
        cell4.classList.add("text-center","align-middle")
        if(!user.accepted){
            const button1 = document.createElement("button");
            button1.classList.add("btn", "text-white", "text-center", "pl-2", "pr-2", "pt-1");
            button1.style.backgroundColor = "#0500FF";
            button1.textContent = "Done";
            cell4.appendChild(button1);
            button1.addEventListener("click",()=>{

                fetch("http://localhost:3000/accept-user",{
                    method: "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({_id:user._id})
                }).then(response => response.json())
                .then(data => {
                    if(data.success){
                        alert("User profile accepted")
                        window.location.reload()
                    }else{
                        alert(data.err)
                    }
                })
            })
        }

        const button2 = document.createElement("button");
        button2.classList.add("btn", "text-center", "pl-2", "pr-2", "pt-1");
        button2.style.color = "#0500FF";
        button2.style.border = "2px solid #0500FF";
        button2.textContent = "Delete";
        cell4.appendChild(button2);
        button2.addEventListener("click",()=>{
            fetch("http://localhost:3000/delete-user",{
                    method: "DELETE",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({_id:user._id})
                }).then(response => response.json())
                .then(data => {
                    if(data.success){
                        alert(data.message)
                        window.location.reload()
                    }else{
                        alert(data.err)
                    }
                })
        })
    });
}

fetchAll();

