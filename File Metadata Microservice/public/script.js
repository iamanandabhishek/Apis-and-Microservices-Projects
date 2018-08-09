document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();
    document.querySelector(".preloader").classList.remove("hide");
    const file = e.target.querySelector("input");
    const formData = new FormData();
    formData.append("file", file.files[0]);
    
    console.log(file.value, file.files[0]);

    axios.post("/api/fileanalyse", formData, {
        headers: {"Content-Type" : "multipart/form-data"}     
    }).then(res => {
        console.log(res);
        window.location.href = res.data.redirect;
    }).catch(err => {
        console.log(err);
    })
    
});
