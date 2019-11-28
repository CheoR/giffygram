document.addEventListener("click", (e) => {
    if (e.target.id.startsWith("blockPost--")) {
        const [, id] = e.target.id.split("--")
    }
})

export const Post = (postObject) => {
    return `
    <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <div class="post__description">
            ${postObject.description}
        </div>
        <div class="post__tagline">
            Posted by
            <a href="#" class="profileLink" id="profile--${postObject.userId}">
                User #${postObject.userId}
            </a>
            on ${new Date(postObject.timestamp).toLocaleDateString('en-US')}
        </div>
        <div class="post__actions">
            <div>
                <img id="favoritePost--${postObject.id}"
                    class="actionIcon"
                    src="${!postObject.favorite
                            ? "/images/favorite-star-blank.svg"
                            : "/images/favorite-star-yellow.svg"
                        }"
                />
            </div>
            <div>
                <img id="blockPost--${postObject.id}" class="actionIcon" src="/images/block.svg" />
            </div>
        </div>
    </section>
    `
}
