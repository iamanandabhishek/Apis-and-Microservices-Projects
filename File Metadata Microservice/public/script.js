document.querySelector("form").addEventListener("submit", function(e){
    e.preventDefault();
    const file = e.target.querySelector("input");
    console.log(file.value, file.files[0]);
    
});