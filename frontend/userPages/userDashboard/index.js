

const user = JSON.parse(localStorage.getItem("user"))
if(!user || user.role ===2){
    window.location.href = "./../../index.html"
}


document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('selectedImage');
    
    const saveButton = document.getElementById('saveButton');
    let cropper;
    const user = JSON.parse(localStorage.getItem("user"))

    imageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                if (cropper) {
                    cropper.destroy();
                }

                selectedImage.src = event.target.result;

                cropper = new Cropper(selectedImage, {
                    aspectRatio: 1, // Adjust this based on your requirements
                    viewMode: 1,
                    guides: true,
                    autoCropArea: 1,
                    responsive: true,
                });
            };
            reader.readAsDataURL(file);
        }
    });

    const saveEvent = () => {
        if (cropper) {
            // Get the cropped canvas
            const canvas = cropper.getCroppedCanvas();

            // Convert the canvas to a data URL
            const dataUrl = canvas.toDataURL();

            // Create a Blob from the data URL
            const blob = dataURItoBlob(dataUrl);

            // Create a FormData object and append the blob
            const formData = new FormData();
            formData.append('image', blob, 'cropped_image.png');
            formData.append('name',document.getElementById("name").value)
            formData.append('userID',user.userID)
            // Send the FormData to the server
            fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => (localStorage.setItem("user",JSON.stringify(data.user))))
            .catch(error => console.error(error));
        }
    }
    saveButton.addEventListener('click',saveEvent )

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }
});


const viewBtn = document.getElementById("view-btn")
viewBtn.disabled = user.name ? false : true

viewBtn.addEventListener("click",()=>{
    const view_h1 = document.getElementById("view-status")
    const user = JSON.parse(localStorage.getItem("user"))
    const viewImage = document.getElementById('view-image');
    const viewName = document.getElementById('view-name');
    console.log(user)
    viewName.value = user.name
    view_h1.textContent = user.accepted ? "Accepted By Admin" : "Not Accepted By Admin"
    if(user.accepted){
        view_h1.style.color = "green"
    }
    viewImage.src = `http://localhost:3000/${user.imgPath}`
})