
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
| `comment`      | `Object ID` | **Required** description of the comment |

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
