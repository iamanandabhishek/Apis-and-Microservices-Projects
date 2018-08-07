console.log("here");
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    axios.post("/api/shorturl/new", {
        url: document.querySelector("input").value
    }).then(function (response) {
        console.log(response);
        if (typeof response.data.redirect === "string"){
            window.location.href = response.data.redirect;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
})
