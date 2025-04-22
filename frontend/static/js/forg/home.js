import { registerfunc } from './register.js';


const success = localStorage.getItem("success");

if (success === "true") {
    localStorage.removeItem("success");
} else {
    registerfunc();
}


document.addEventListener("DOMContentLoaded", function () {
    statement()
})

function statement() {
    const addpost = document.getElementById("AddPost")
    if (addpost) {
        addpost.addEventListener("click",  function () {
            addpost.outerHTML = creatpost
            creat()
        })
    }
}

function creat() {
    const creat = document.getElementById("buttonAddPost")
    if (creat) {
        creat.addEventListener("click", async function(){
            const title = document.getElementById("titleID")
            const errortitle = document.getElementById("errortitle")
            const errorcontent = document.getElementById("errorcontent")
            const content = document.getElementById("contentID")
            const titlevalue = title.value.trim()
            const contentvalue = content.value.trim()
            if (titlevalue.length > 50) {
                title.style.borderColor = "red";
                errortitle.style.display = "block";

                errortitle.textContent = "your title it most have 50 char"
                return 
            }
            if (contentvalue.length > 200) {
                content.style.border = "red"
                errorcontent.style.display = "block"
                errorcontent.textContent = "your content it most have 200 char"
                return
            }
            const postdata = {
                title: titlevalue,
                content: contentvalue
            }

            try {
                const response = await fetch("http://localhost:8080/addpost" , {
                    method : "POST",
                    headers : {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(postdata),
                })

                if (response.ok) {
                    throw new Error(`HTTP Error: ${response.status}`)
                }

                const data = await response.json()
                if (data.success) {
                    window.location.href = "http://localhost:8080/";
                    return
                } else {
                    alert("it is failed");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            }
            
        });
    }
}