import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MusicSidebar from "./sidebar";
import MusicList from "./list";
import Player from "./player";
import { sidebarList, musicList } from "../utils.js/constants";

function MusicPlayer() {
  const [selectedMenu, setSelectedMenu] = useState(sidebarList[0]);
  const [selectedMusic, setSelectedMusic] = useState(musicList[0]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleRecentPlayed = async () => {
    const recentPlayedSongs = await sessionStorage.getItem("recentPlayed");
    if (
      !recentPlayedSongs ||
      recentPlayedSongs == null ||
      recentPlayedSongs == undefined
    ) {
      sessionStorage.setItem("recentPlayed", JSON.stringify([]));
    } else {
      setRecentlyPlayed(JSON.parse(recentPlayedSongs));
    }
  };
  const handleFavorites = async () => {
    const favoriteSongs = await localStorage.getItem("favorites");
    if (!favoriteSongs || favoriteSongs == null || favoriteSongs == undefined) {
      localStorage.setItem("favorites", JSON.stringify([]));
    } else {
      setFavorites(JSON.parse(favoriteSongs));
    }
  };

  const addMusicToSessionStorage = async () => {
    if (recentlyPlayed.length == 10) {
      const recentList = [...recentlyPlayed];
      recentList.splice(0, 1);
      await sessionStorage.setItem(
        "recentPlayed",
        JSON.stringify([...recentList, selectedMusic])
      );
    } else {
      await sessionStorage.setItem(
        "recentPlayed",
        JSON.stringify([...recentlyPlayed, selectedMusic])
      );
    }

    handleRecentPlayed();
  };
  useEffect(() => {
    if (
      (recentlyPlayed.length >= 1 &&
        selectedMusic.title !=
          recentlyPlayed[recentlyPlayed.length - 1].title) ||
      recentlyPlayed.length == 0
    ) {
      addMusicToSessionStorage();
    }
  }, [selectedMusic]);

  const addToFavorites = async () => {
    if (favorites.includes(selectedMusic)) {
      setFavorites(favorites.filter((i) => i.title != selectedMusic.title));
    } else {
      setFavorites([...favorites, selectedMusic]);
    }
    await localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  useEffect(() => {
    handleRecentPlayed();
    handleFavorites();
  }, []);
  console.log("favs", favorites);
  return (
    <Container fluid>
      <Row>
        <Col xs={3}>
          <MusicSidebar
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            sidebarList={sidebarList}
          />
        </Col>
        <Col xs={4}>
          <MusicList
            selectedMenu={selectedMenu}
            musicList={
              selectedMenu.title === "Recently Played"
                ? [...recentlyPlayed].reverse()
                : selectedMenu.title === "Favorites"
                ? [...favorites]
                : musicList
            }
            recentlyPlayedList={recentlyPlayed}
            selectedMusic={selectedMusic}
            setSelectedMusic={setSelectedMusic}
          />
        </Col>
        <Col xs={5}>
          <Player
            selectedMusic={selectedMusic}
            addToFavorites={addToFavorites}
            favorites={favorites}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default MusicPlayer;
