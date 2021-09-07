
# Logan Player API

Its an API for a video library that also handles user authentication / authorization


## API Reference

### Get all videos

```http
  GET https://logan-player-backend.ghozt777.repl.co/videos
```


### Posting Videos

```http
  POST https://logan-player-backend.ghozt777.repl.co/videos
```
#### these parameters are required in the body and not the URL
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`         | `string` | **Required** title of the video |
| `watchId`         | `string` | **Required** watch id of the yt video |
| `videoLink`         | `URL` | **Required** URL of the actual yt video |
| `thumbnail`         | `URL` |  URL of the thumbnail image |
| `decription`         | `string` |  description of the video |


### Response Structure for GET , POST in /videos

``` json
    {
    "success": true,
    "videos": [
        {
            "_id": "613451e403cb75060dd77304",
            "title": "The Beauty Of Mr Robot",
            "watchId": "5VEroFjcq1M",
            "videoLink": "https://youtube.com/watch?v=5VEroFjcq1M",
            "thumbnail": "https://img.youtube.com/vi/5VEroFjcq1M/maxresdefault.jpg",
            "description": "Directed by Sam Esmail Director of photography : Tod Campbell Song : Where's my mind - Telepathic Teddy bear",
            "comments": [],
            "createdAt": "2021-09-05T05:13:08.807Z",
            "updatedAt": "2021-09-05T05:13:08.807Z",
            "__v": 0
        }
    ]
}
```


### Adding Comments to videos (requires an authorized user)

```http
    POST https://logan-player-backend.ghozt777.repl.co/videos/<videoId>?type=add-comment
```
#### paramters are required in the URL
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `videoID`      | `Object ID` | **Required** Id of video where comments are to be added |

#### parameters required in the body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** username of a registered user |
| `token`      | `Bearer` | **Required** refresh token of the user |
| `comment`      | `string` | **Required** description of the comment |

#### parameters required in the 'autorization' header
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `accessToken`      | `Bearer Token` | **Required** & **Valid** accessToken handed the client|

#### required query paramters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `add-comment` | **Required** type of action: `add-comment`|


#### response Structure

```json
{
    "success": true,
    "updatedVideo": {
        "_id": "6134527c03cb75060dd77306",
        "title": "Mr Robot Decryption Scene",
        "watchId": "i9CBKGLVCME",
        "videoLink": "https://youtube.com/watch?v=i9CBKGLVCME",
        "thumbnail": "https://img.youtube.com/vi/i9CBKGLVCME/maxresdefault.jpg",
        "description": "©2017 NBC UNIVERSAL, INC. ALL RIGHTS RESERVED. A DIVISION OF NBC UNIVERSAL.",
        "comments": [
            {
                "content": {
                    "time": "07/09/2021",
                    "description": "this is dope"
                },
                "user": {
                    "_id": "6136e322c15de97ee60c1d51",
                    "username": "test123",
                    "email": "ghoztsd@gmail.com",
                    "password": "$2b$10$5aaW/DYEz5iKi4OELA2q7.0NpcVWFup7J5a3aB3bPGAN7Tw6JEzGi",
                    "createdAt": "2021-09-07T03:57:22.951Z",
                    "updatedAt": "2021-09-07T03:57:22.951Z",
                    "__v": 0
                },
                "_id": "6136e41f631ad1a5e6cebb71"
            },
            {
                "content": {
                    "time": "07/09/2021",
                    "description": "keep posting more videos"
                },
                "user": {
                    "_id": "6136e322c15de97ee60c1d51",
                    "username": "test123",
                    "email": "ghoztsd@gmail.com",
                    "password": "$2b$10$5aaW/DYEz5iKi4OELA2q7.0NpcVWFup7J5a3aB3bPGAN7Tw6JEzGi",
                    "createdAt": "2021-09-07T03:57:22.951Z",
                    "updatedAt": "2021-09-07T03:57:22.951Z",
                    "__v": 0
                },
                "_id": "6136e64657963186d4282304"
            },
            {
                "content": {
                    "time": "07/09/2021",
                    "description": "keep posting more videos"
                },
                "user": {
                    "_id": "6136e322c15de97ee60c1d51",
                    "username": "test123",
                    "email": "ghoztsd@gmail.com",
                    "password": "$2b$10$5aaW/DYEz5iKi4OELA2q7.0NpcVWFup7J5a3aB3bPGAN7Tw6JEzGi",
                    "createdAt": "2021-09-07T03:57:22.951Z",
                    "updatedAt": "2021-09-07T03:57:22.951Z",
                    "__v": 0
                },
                "_id": "6136e70e0e1cfb70cc5a0bbd"
            }
        ],
        "createdAt": "2021-09-05T05:15:40.115Z",
        "updatedAt": "2021-09-07T04:14:06.763Z",
        "__v": 3
    },
    "tokens": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QxMjMiLCJlbWFpbCIsdmdob3p0c2RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNWFhVy9EWUV6NWlLaTRPRUxBMnE3LjB2323OcFuckuBitchDdKNWEzYUIzYlBHQU43VHc2SkV6R2kiLCJpYXQiOjE2MzA5ODcwNDMsImV4cCI6MTYzMDk5OTA0M30.tkL0Rns4FBuggHSa0V3SXWCAy0VgmURn0N7wX7bNk7E",
        "refreshToken": "eyJhbGciOiJIUzI1NiIssdcR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6In233QxMjMiLCJlbWFpbCI6Imdob3p0c2RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkNWFhVy9EWUV6NWlLaTRFuckuBitchOcGNWV0Z1cDdKNWEzYUIzYlBHQU43VHc2SkV6R2kiLCJpYXQiOjE2MzA5ODcwNDN9.z4aFb9YQZl-r0N5eqZi6qJwQfg3ME6-Y96Xwe6JrMCM"
    }
}
```

#### Note : reponse also includes `accessToken` ans `refreshToken` as in case of a stale `accessToken` the server automatically refreshes the tokens and provides new ones and hence its necessary to store them on the cliet side. This is the case for any authorizred route : it will give baack `accessToken` and `refreshToken` back. If the `accessToken` is invalid or expired the `refreshToken` is used to automatically generate a new `accessToken` and pass it down to the user along with a new `refreshToken` and the old `refreshToken` is flushed from the DB and hence cannot be used to make new request. If the `refreshToken` is invalid(tempered with) then the request to generate new `accessToken` / authorize is rejected

### User Authentication / Authorization

### User Creation

```http
  POST https://logan-player-backend.ghozt777.repl.co/create-user
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** & **Unique** username of the user|
| `email`      | `Email` | **Required** email id of user|
| `password`      | `string` | **Required** password of user |

#### response Structure

```json
  {
        "success": true,
        "msssage": "user creation successfull",
        "savedUser": {
            "username": "logan777",
            "email": "loganpaul@gmail.com",
            "password": "** hashed password **",
            "_id": "** unique user id **",
            "createdAt": "2021-09-05T07:09:11.540Z",
            "updatedAt": "2021-09-05T07:09:11.540Z",
            "__v": 0
        },
        "accessToken": "** access token **",
        "refreshToken": "** refresh token **"
    }
```

#### user Login (to generate a fresh pair of tokens for logged out user)
```html
    POST https://logan-player-backend.ghozt777.repl.co/login
```

#### paramters required in the request body  
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** & **Valid** username of a registered user|
| `password`      | `string` | **Required** & **Valid** password of the registered user|



#### response Structure 
```json
    {
        "success": true,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvZ2FuNzc4IiwiZW1haWwiOFUckuBitchhdWxAD21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMtAkaG1XU1hxVk4zVHVxQVhoSzZpZTlidGdLu1dIQmVpeVBuekZScm5ZaHdpMm8yQnRsQVGBZGkiLCJpYXQiOjE2MzA4Mjg0OTAsImV4cCI6MTYzMDg0MDQ5MH0.cMJ3v3AImHKhWuiUnTtvNDus_dsUkczBZkr4xfOKp0Y",
        "refreshToken": "eyJhbGciOiJIuzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvZ2FuNzc4IiwiZW1haWwiOiJsd2dhbnBhdWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaG1Xg1hxVk7zVHVXQVhoSzZfuCkUbiTchmVplVBueIZScm5ZaHdpMm4yQnRsQVVBZGkiLCJpYXQiOjE2MzA4Mjg9OTB9.JBNHlc9U2FCbGxLxAd7sLaJ_D6D94bghsxtDFypeTQk"
    }
``` 
### user Logout

```html
    DELETE https://logan-player-backend.ghozt777.repl.co/logout
```

#### parameters required in the request body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `Bearer Token` | **Required** & **Valid** refreshToken handed the client|

#### Note: By Loging out the server removes the provided `refreshToken` from the DB and hence no autorization will be valid using that `refreshToken`. To get authorized the user has to login again and get a fresh pair of `accessToken` and `refreshToken`

#### response Structure upon successful logging out
```json
    {
        "success": true,
        "message": "logout successful"
    }
```

### resetting password

```html
    GET https://logan-player-backend.ghozt777.repl.co/reset-password
```

#### parameters required in the request body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `Email` | **Required** & **Valid** email address of a registered user|

#### Note: If you reset your password you will get a email with a link to reset-your password where you provide your new password to complete the process

#### response for successful email-verification

```json
    {
        success:true,
        message:"email sent"
    }
```
