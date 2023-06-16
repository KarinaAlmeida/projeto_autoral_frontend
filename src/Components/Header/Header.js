import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Container, MenuContainer, DropMenu, ModalContainer, ModalContent, ModalTitle, ModalButton, StyledIcon } from "./HeaderStyle";

export function Header({ onResetSearch }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const picture = localStorage.getItem("pic");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("pic");
    navigate("/");
  }

  function handleIconClick() {
    if (!token || !picture) {
      setModalIsOpen(true);
    }else{
      setOpenMenu(!openMenu)
    }
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleModalConfirmation() {
    setUserChoice("redirect");
    closeModal();
  }

  function handleModalCancellation() {
    setUserChoice("close");
    closeModal();
  }

  function handleUserChoice() {
    if (userChoice === "redirect") {
      navigate("/");
    }
  }

  return (
    <>
      <Container>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <p>QS</p>
        </Link>

        <Link to="/post" style={{ textDecoration: "none" }}>
          <h1>Escreva seu resumo</h1>
        </Link>

        <Link to="/results" style={{ textDecoration: "none" }}>
          <h1 onClick={onResetSearch}>Pesquise um livro</h1>
        </Link>
        <MenuContainer>
        <div>
          {picture ? (
            <img
              onClick={handleIconClick}
              alt="icon"
              src={picture}
              style={{ marginRight: "30px" }}
            />
          ) : (
            <div onClick={handleIconClick}>
             <StyledIcon />
            </div>
          )}
        </div>

          {openMenu && (
            <DropMenu>
              <Link to="/user" style={{ textDecoration: "none" }}>
                <p>Meu Perfil</p>
              </Link>
              <p onClick={handleLogout}>Sair</p>
            </DropMenu>
          )}
        </MenuContainer>
      </Container>


      {modalIsOpen && (
      <ModalContainer>
        <ModalContent>
          <ModalTitle>Deseja fazer login?</ModalTitle>
          <ModalButton onClick={handleModalConfirmation}>Sim</ModalButton>
          <ModalButton onClick={handleModalCancellation}>Não</ModalButton>
        </ModalContent>
      </ModalContainer>
    )}

      {handleUserChoice()}
    </>
  );
}