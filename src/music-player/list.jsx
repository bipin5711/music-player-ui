import React, { useState, useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

function MusicList({
  selectedMenu,
  musicList,
  selectedMusic,
  setSelectedMusic,
}) {
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState(musicList);
  console.log("musicList", musicList);
  const debounce = (cb, delay = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  const handleSearch = debounce((e) => {
    setSearch(e.target.value);
  }, 1000);
  const handleChangeMusic = (music) => {
    setSelectedMusic(music);
  };
  useEffect(() => {
    if (search == "") {
      setFilteredList(musicList);
    } else {
      setFilteredList(
        musicList.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, musicList]);
  //   const fetchMusic = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "https://deezerdevs-deezer.p.rapidapi.com/playlist/",
  //         // "https://spotify23.p.rapidapi.com/playlist_tracks?id=37i9dQZF1DX4Wsb4d7NKfP",
  //         // "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks",
  //         {
  //           headers: {
  //             "X-RapidAPI-Key":
  //               "deb5b75d48mshf0e62dd9e7a6bacp1a4ba4jsn88486e45f655",
  //             "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchMusic();
  //   }, []);
  return (
    <Container fluid className="py-4">
      <p className="menu-title">{selectedMenu.title}</p>
      <input
        type="text"
        onChange={handleSearch}
        className="search-input mb-4"
      />
      {filteredList.map((music) => (
        <Container
          fluid
          className={`${
            music.title == selectedMusic.title &&
            selectedMenu.title != "Recently Played"
              ? "music-item-selected"
              : "music-item"
          } mb-2 pt-3`}
          onClick={() => handleChangeMusic(music)}
        >
          <Row xs="auto">
            <Col>
              <Image src={music.image_url} className="mb-4 music-image" />
            </Col>
            <Col>
              <p className="music-title mb-1">{music.title}</p>
              <p className="music-artist">{music.artist_name}</p>
            </Col>
          </Row>
        </Container>
      ))}
    </Container>
  );
}

export default MusicList;
