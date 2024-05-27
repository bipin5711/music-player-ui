import React from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import fav from "../assets/heart-fill.svg";
import notfav from "../assets/heart.svg";
import next from "../assets/next.svg";
import previous from "../assets/previous.svg";
import play from "../assets/play.svg";
import sound from "../assets/sound.svg";

function Player({ selectedMusic, addToFavorites, favorites }) {
  return (
    <Container fluid className="pt-4 px-4">
      <Container fluid className="px-4">
        <p className="title pt-4 mb-1">{selectedMusic.title}</p>
        <p className="artist-name">{selectedMusic.artist_name}</p>
        <Image
          src={selectedMusic.image_url}
          className="mb-4 music-large-image"
        />
        <Container fluid className="pt-4">
          <Row>
            <Col xs={3}>
              <Container
                className="image-container2 pt-1"
                onClick={addToFavorites}
              >
                <Image
                  src={favorites.includes(selectedMusic) ? fav : notfav}
                  className="player-image-dots"
                />
              </Container>
            </Col>
            <Col xs={6} className="mt-1 px-4">
              <Image src={next} className="player-image" />
              <Image src={play} className="player-image-play mx-4" />
              <Image src={previous} className="player-image" />
            </Col>
            <Col xs={3}>
              <Container className="image-container pt-1">
                <Image src={sound} className="player-image-sound" />
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
}

export default Player;
