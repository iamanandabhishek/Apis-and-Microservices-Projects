const formHandler = (e) => {
    e.preventDefault();
    const input = e.target.querySelectorAll("input");

    if (input.length == 1) {
        e.target.parentNode.parentNode.querySelector(".preloader").classList.remove("hide")
        axios.post("/api/exercise/new-user", {
                username: input[0].value
            }).then(res => {
                window.location.href = res.data.redirect;
                console.log(res)
            })
            .catch(err => console.log(err));

    } else {
        console.log("here212")
    }
}

document.querySelectorAll("form").forEach(form => form.addEventListener("submit", formHandler));