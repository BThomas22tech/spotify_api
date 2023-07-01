require('dotenv').config();

// async function apicall()
// {
//     var response = await fetch("https://api.github.com/users/adion81");
//     var coderData = await response.json();
//     var count = coderData.followers
//     var element = document.querySelector("#propic")

//     var h1 = document.querySelector("h1");
//     element.src = coderData.avatar_url

//     h1.innerText = "Follower count: " + count;

//     return coderData;
// }


const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

async function api_post_call() {
    var authOptions = {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "client_credentials"
        })
    }

    fetch('https://accounts.spotify.com/api/token', authOptions)
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                var token = data.access_token;
                var token_type = data.token_type;
                var expires_in = data.expires_in 
                console.log(token)
                console.log(token_type)
                console.log(expires_in)
                get_api(token)
            }
        })
        .catch(error => console.error(error));
    }
api_post_call()

function get_api(token) {
    fetch("https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb", {
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error(error));
}

// get_api();