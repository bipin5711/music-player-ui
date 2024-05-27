import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import spotifyLogo from "../assets/spotify-logo.svg";

function MusicSidebar({ selectedMenu, setSelectedMenu, sidebarList }) {
  const handleChange = (item) => {
    setSelectedMenu(item);
  };
  return (
    <Container className="px-4 py-4" fluid>
      <Image src={spotifyLogo} className="mb-4" />
      {sidebarList?.map((item) => (
        <Container
          className={
            item.title == selectedMenu.title ? "ml-0" : "ml-0 opacity-25"
          }
          onClick={() => handleChange(item)}
        >
          <p className="sidebar-text">{item.title}</p>
        </Container>
      ))}
    </Container>
  );
}

export default MusicSidebar;
