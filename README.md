# Backend
Express Backend Server with PostgreSQL

You pass it your songs, we'll pass back the recommendations

## Endpoints

### Register

https://spotify-song-suggester-neo.herokuapp.com/api/auth/register

Expects something like this:

```
  {
    "firstName": "Second Name",
    "lastName": "Last Name",
    "email": "second.last@gmail.com",
    "username": "username",
    "password": "password"
  }
```

### Login

https://spotify-song-suggester-neo.herokuapp.com/api/auth/login

Expects this:
```
  {
    "username": "user",
    "password": "pass"
  }
```

### Get Recommendations

https://spotify-song-suggester-neo.herokuapp.com/api/recommendations/:id/recs

This will bring back the recommendations for a given ID. However, this will ultimately change, and this should only be used to model how to parse the response. 

The response will look like this:
```
[
    {
        "user_id": 4,
        "artist": "The Beatles",
        "album": "Revolver",
        "song": "I'm only sleeping"
    },
    {
        "user_id": 4,
        "artist": "Miles Davis",
        "album": "Kind of Blue",
        "song": "So What"
    }
]
```
