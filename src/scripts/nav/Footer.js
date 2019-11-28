import { getChosenUser, getPosts, getUsers } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

let postCount = 0

export const Footer = () => {
    /*
        Component state variables
    */
    const posts = getPosts()
    const users = getUsers()

    /*
        Update the post count when the user changes the year selection
    */

    applicationElement.addEventListener("change", changeEvent => {
        if (changeEvent.target.id === "yearSelection") {
            const yearAsNumber = parseInt(changeEvent.target.value)
            const postCountOutput = document.querySelector("#postCount")

            postCount = postsSince(yearAsNumber)
            postCountOutput.textContent = postCount
        }
    })

    /*
        Calculate the number of posts since a given year
    */
    const postsSince = (year) => {
        const epoch = Date.parse(`01/01/${year}`)
        const postsSinceYear = []

        for (const post of posts) {
            if (post.timestamp >= epoch) {
                postsSinceYear.push(post)
            }
        }

        return postsSinceYear.length
    }

    /*
        Initial state of post count is number since 2020
    */
    postCount = postsSince(2020)


    return `
        <footer class="footer">
            <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount">${postCount}</span>
            </div>
            <div class="footer__item">
                Posts by user <select id="userSelection">
                    ${users.map(user => `
                        <option
                            ${getChosenUser() === user.id ? "selected" : ""}
                            value="user--${user.id}">${user.id}</option>
                    `)}
                </select>
            </div>
            <div class="footer__item">
            Show only favorites <input id="showOnlyFavorites" type="checkbox" />
            </div>
        </footer>
    `
}
