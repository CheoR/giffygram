import LoginForm from "./Login.js"

const eventHub = document.querySelector(".giffygram")

eventHub.addEventListener("unauthorizedRequest", event => {
    LoginForm()
})
