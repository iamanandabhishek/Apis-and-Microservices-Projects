const formHandler = (e) => {
    e.preventDefault();
    const input = e.target.querySelectorAll("input");
    e.target.parentNode.parentNode.querySelector(".preloader").classList.remove("hide")
    if (input.length == 1) {

        axios.post("/api/exercise/new-user", {
                username: input[0].value
            }).then(res => {
                window.location.href = res.data.redirect;
                console.log(res)
            })
            .catch(err => console.log(err));

    } else {
        let details = [...input].reduce((accum, curr) => !void (accum[curr.name] = curr.value) && accum, {});
        console.log(details, [...input]);
        axios.post("/api/exercise/add", {
            details
        }).then(res => {
            console.log(res);
            window.location.href = res.data.redirect;
        }).catch(err => console.log(err));
    }
}

document.querySelectorAll("form").forEach(form => form.addEventListener("submit", formHandler));