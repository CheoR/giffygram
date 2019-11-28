import { savePost } from "../data/provider.js"

let miniMode = true
const applicationElement = document.querySelector(".giffygram")

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "miniMode") {
        miniMode = false
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})


document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost__cancel") {
        miniMode = true
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
    }
})

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "newPost__submit") {
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value

        const postObect = {
            title: title,
            imageURL: url,
            description: description,
            userId: parseInt(localStorage.getItem("gg_user")),
            timestamp: Date.now()
        }

        savePost(postObect)
            .then(
                () => {
                    miniMode = true
                    applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
                }
            )
    }
})

export const PostEntry = () => {
    if (miniMode) {
        return `<div class="miniMode" id="miniMode">Have a gif to post?</div>`
    }
    else {
        return `
        <div class="newPost">
            <div>
                <input value="Learning JavaScript"
                       name="postTitle"
                       class="newPost__input"
                       type="text"
                       placeholder="Title" />
            </div>
            <div>
                <input value="https://media.giphy.com/media/S9dN7OWFj8GoRhTIuL/giphy-downsized.gif"
                       name="postURL"
                       class="newPost__input"
                       type="text"
                       placeholder="URL of gif" />
            </div>

            <textarea name="postDescription"
                class="newPost__input newPost__description"
                placeholder="Story behind your gif...">Ethical chillwave jianbing ramps plaid subway tile.</textarea>

            <button id="newPost__submit">Save</button>
            <button id="newPost__cancel">Cancel</button>
        </div>
        `
    }
}
