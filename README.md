# Giffygram

For this project, you will be building a web application that lets people post their favorite gifs. Each post can be favorited by other users, and deleted by the original author.

Users can also send direct messages to each other, and be notified when they have messages.

![giffygram feed image](./giffygram.gif)

### Starting the API

Open a terminal window and go to the `giffygram` directory.

1. `cd api`
1. `json-server giffygram.json`

### Starting the Web Server

Open a terminal window and go to the `giffygram` directory.

1. `cd src`
1. `serve -l 8080` or `hs` if you have set up the alias

Then visit http://localhost:8080 and login with the following credentials.

* Email: meg@ducharme.com
* Password: meg

Once you are authenticated, you should see two posts render to the feed component.