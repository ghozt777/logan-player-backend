
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


### Adding Comments to videos

```http
    POST https://logan-player-backend.ghozt777.repl.co/comments/:videoId
```
#### paramters are required in the URL
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `videoID`      | `Object ID` | **Required** Id of video where comments are to be added |

#### parameters required in the body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required** username of a registered user |
| `comment`      | `string` | **Required** description of the comment |

#### required query paramters
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `type`      | `add-comment` | **Required** type of action: `add-comment`|

#### template url
```html
  POST https://logan-player-backend.ghozt777.repl.co/comments/<videoID>?type=add-comment

```

#### response Structure

```json
  {
    "success": true,
    "updatedVideo": {
        "_id": "** user _id **",
        "title": "The Beauty Of Mr Robot",
        "watchId": "5VEroFjcq1M",
        "videoLink": "https://youtube.com/watch?v=5VEroFjcq1M",
        "thumbnail": "https://img.youtube.com/vi/5VEroFjcq1M/maxresdefault.jpg",
        "description": "Directed by Sam Esmail Director of photography : Tod Campbell Song : Where's my mind - Telepathic Teddy bear",
        "comments": [
            {
                "content": {
                    "time": "9/5/2021",
                    "description": "this video is dope af 😎"
                },
                "user": "** user _id **",
                "_id": "** comment _id **"
            }
        ],
        "createdAt": "2021-09-05T05:13:08.807Z",
        "updatedAt": "2021-09-05T07:24:27.528Z",
        "__v": 1
    }
}

```

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

#### user Authorization (to validate the user)

```html
    POST https://logan-player-backend.ghozt777.repl.co/authorize
```
#### parameters required in the 'autorization' header
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `accessToken`      | `Bearer Token` | **Required** & **Valid** accessToken handed the client|

#### parameters required in the request body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `Bearer Token` | **Required** & **Valid** refreshToken handed the client|


#### response Structure

```json
    {
        "success": true,
        "username": "logan777",
        "email": "loganpaul@gmail.com",
        "password": "$2b$10$hmWSXqVN3TuWaXhK3ie8buWKSWHBeiyPnzFRrnYhWi7n2BtlAUAdi",
        "iat": 1630825751,
        "exp": 1630837751,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI73h6IdfXVCJ9.eyJ1c2VybmFtZSI6Imd34xvz2FuNzc3IiwiZW1haWwiOiJsb2dhbnBgdWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaG1XU1hxVkdzVHVXQVhoSzZpZTlidVdLU1dIQmVpeVBuekZScm5ZAHdpnM4yQnRsQVVBZGkiLCJpYXQiOjE2MzA4MjU7jTEsImV4cCI6MTYzMDgzNzc1MX0.jK8BYt-I-fUcKYouBitch-1JNoRLUZ7-W2sHMbpwg",
        "refreshToken": "eyjhbGciOiJIUzI1NiIsiNR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvZ2FuNzc3IiwiZW1haWwiOiJsb2dhbnBhdWxAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaG1XU1hxVk4zVHVXQVfUcKYouBitchTliDVdLU1dGQmVpeVBuekZScm5ZaHdpMm4yQnRsQVVBZGkiLCJpYXQiOjE2MzA4MjU3NTF9.4Io_8tZkhjD28wNIPdMEY5yJAjhzt2Dr5OwkA4GivUI"
    }
```

#### Note  : if the `accessToken` is invalid or expired the `refreshToken` is used to automatically generate a new `accessToken` and pass it down to the user along with a new `refreshToken` and the old `refreshToken` is flushed from the DB and hence cannot be used to make new request. If the `refreshToken` is invalid(tempered with) then the request to generate new `accessToken` / authorize is rejected

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
        "success": false,
        "message": "logout successful"
    }
```
