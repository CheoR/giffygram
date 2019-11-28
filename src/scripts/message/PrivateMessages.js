import { NavBar } from "../nav/NavBar.js"
import { Footer } from "../nav/Footer.js"
import { MessageList } from "../feed/MessageList.js"

export const PrivateMessageList = () => {
    return `
        <div class="messages">
            ${MessageList()}
        </div>
    `
}
