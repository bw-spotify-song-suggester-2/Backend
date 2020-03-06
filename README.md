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

This is what the response will look like:
```
{
    "created_user": "wddsddfdfdf",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODMyMTk3NTEsImV4cCI6MTU4MzIyMzM1MX0.mi3Jb7zVwRYJIoI1_SmohlHzi5ov856M4I4-s7JlSNw"
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

This is what the response will look like:

```
{
    "username": "first",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiZmlyc3QiLCJpYXQiOjE1ODMyMTQ1OTEsImV4cCI6MTU4MzIxODE5MX0.5L-yrZbnc8HgLRGYS1vQnipTf7LCvNIrOYIal1i3BJA"
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

### Post Spotify Playlist and Get Recommendations

https://spotify-song-suggester-neo.herokuapp.com/api/playlists/:id

You can post the following:
```
{
	"spotify_playlist": "5vBQ35wpIzaCTKFMCYrJqQ"
}
```

And get back this:

```
[
    {
        "track_id": 144,
        "artist": "Real Estate",
        "album": "In Mind",
        "song": "Stained Glass",
        "user_id": 4,
        "playlist_id": 77
    },
    {
        "track_id": 145,
        "artist": "will.i.am",
        "album": "#willpower",
        "song": "Scream & Shout",
        "user_id": 4,
        "playlist_id": 77
    }
]
```

### Delete Spotify Playlist and Associated Recommendations

https://spotify-song-suggester-neo.herokuapp.com/api/playlists/:id

If you send a delete to this passing in the ID of the playlist, it will remove it. 
