import useSimpleAuth from "../hooks/useSimpleAuth.js"

const eventHub = document.querySelector(".giffygram")

let friends = []

export const useFriends = () => friends.slice()

const setFriends = friendsArray => {
    friends = friendsArray.splice(0)
    eventHub.dispatchEvent(new CustomEvent("friendStateChanged"))
}

export const sendDirectMessage = (recipient, text) => {
    const auth = useSimpleAuth()

    return fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.token}`
        },
        body: JSON.stringify({
            userId: auth.user,
            recipient: parseInt(recipient),
            text
        })
    })
        .then(response => response.json())
        .then(() => {

        })
}

export const getFriends = () => {
    const auth = useSimpleAuth()

    return fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${auth.token}`
        }
    })
        .then(_ => _.json())
        .then(setFriends)
}