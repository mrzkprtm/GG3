const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory data storage
let playlists = [];

// Playlist Model
class Playlist {
  constructor(title, artists, url) {
    this.title = title;
    this.artists = artists;
    this.url = url;
    this.playCount = 0;
  }
}

// Route to create a new playlist
app.post("/playlist", (req, res) => {
  const { title, artists, url } = req.body;
  const newPlaylist = new Playlist(title, artists, url);
  playlists.push(newPlaylist);
  res.status(201).json({ message: "Playlist created successfully", playlist: newPlaylist });
});

// Route to get list of songs from the playlist
app.get("/playlist", (req, res) => {
  res.status(200).json({ playlists });
});

// Route to play a song from the playlist
app.put("/playlist/play/:playlistId", (req, res) => {
  const playlistId = req.params.playlistId;
  const playlist = playlists.find((playlist) => playlist.url === playlistId);

  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  playlist.playCount++;
  res.status(200).json({ message: "Song played successfully", playlist });
});

// Route to get list of songs sorted by most played
app.get("/playlist/most-played", (req, res) => {
  const sortedPlaylists = playlists.sort((a, b) => b.playCount - a.playCount);
  res.status(200).json({ playlists: sortedPlaylists });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
