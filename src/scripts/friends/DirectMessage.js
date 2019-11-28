import { useFriends, sendDirectMessage } from "./FriendProvider.js"

const eventHub = document.querySelector(".giffygram")
const contentTarget = document.querySelector(".directMessage")

contentTarget.addEventListener("click", e => {
    if (e.target.id === "sendDirectMessage") {
        const recipient = contentTarget.querySelector("#recipient").value
        const text = contentTarget.querySelector("#directMessage").value
        sendDirectMessage(recipient, text)
        contentTarget.innerHTML = ""
    }
})

const render = (friendCollection) => {
    contentTarget.innerHTML = `
        <dialog id="directMessageDialog">
            <article class="message">
                <select id="recipient" class="select--friends">
                    <option value="0">Select a friend...</option>
                    ${
                        friendCollection.map(f => `
                            <option value="${f.id}">${f.name}</option>
                        `)
                    }
                </select>
                <textarea id="directMessage" class="directMessage message__section" placeholder="Direct message..."></textarea>
                <button id="sendDirectMessage" class="message__section">Send</button>
            </article>
        </dialog>
    `

    document.querySelector("#directMessageDialog").showModal()
}

const DirectMessage = () => {
    const friends = useFriends()
    render(friends)
}

export default DirectMessage
