import { LoginForm } from "./auth/Login.js"
import { GiffyGram } from "./GiffyGram.js"
import { fetchLikes, fetchMessages, fetchUsers, fetchPosts } from "./data/provider.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("stateChanged", () => renderApp())

const synchronizeState = () => {
    return fetchUsers()
        .then(
            () => {
                return fetchMessages()
            }
        )
        .then(
            () => fetchPosts()
        )
        .then(() => fetchLikes())
}

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))

    if (user) {
        console.log("User authenticated")
        // Need to fetch all the data from the API first
        applicationElement.innerHTML = GiffyGram()
    } else {
        console.log("User not authenticated")
        applicationElement.innerHTML = LoginForm()
    }
}

renderApp()
