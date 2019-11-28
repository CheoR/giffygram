const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    },
    users: [],
    posts: [],
    likes: [],
    messages: []
}

export const favoritePost = (id) => {
    return fetch(`${apiURL}/likes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: parseInt(localStorage.getItem("gg_user")),
            postId: id
        })
    })
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const setMessageDisplay = () => {
    applicationState.feed.displayMessages = true
}

export const clearFilters = () => {
    applicationState.feed.chosenUser = null
    applicationState.feed.displayFavorites = false
}

export const markAllMessagesRead = () => {
    const fetches = []

    getMessages().forEach(
        message => {
            fetches.push(
                fetch(`${apiURL}/messages/${message.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: message.userId,
                        recipientId: message.recipientId,
                        text: message.text,
                        read: true
                    })
                })
            )
        }
    )

    return Promise.all(fetches)
        .then(() => fetchMessages())
}

export const getMessages = () => {
    const userMessages = applicationState.messages.filter(
        (message) => {
            return message.recipientId === parseInt(localStorage.getItem("gg_user"))
                    && !message.read
        }
    )
    return userMessages
}

export const getPosts = () => {
    let posts = applicationState.posts.sort((a, b) => {
        return b.timestamp - a.timestamp
    })

    return posts
}

export const savePost = (post) => {
    return fetch()
}

export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.users = data
            }
        )
}

export const getUsers = () => {
    return [...applicationState.users]
}

export const toggleFavoritesOnly = (choice) => {
    if (choice) {
        applicationState.feed.chosenUser = null
    }
    applicationState.feed.displayFavorites = choice
}

export const deletePost = (id) => {
    return fetch(`${apiURL}/posts/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchLikes = () => {
    return fetch(`${apiURL}/likes`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.likes = data
            }
        )
}

export const getLikes = () => {
    return [...applicationState.likes]
}

export const getChosenUser = () => {
    return applicationState.feed.chosenUser
}

export const saveMessage = (message) => {
    return fetch()
}

export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.messages = data

                if (applicationState.messages.length !== data.length) {
                    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
                }
            }
        )
}

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.posts = data
            }
        )
}
