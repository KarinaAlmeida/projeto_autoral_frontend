import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #a088b8;
  min-height: 100vh;
  margin-top: 72px; 
`;

export const SideMenu = styled.div`
  position: fixed;
  left: 0;
  top: 65px; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(to bottom, #682DA4, #A088B8);
  padding: 20px;
  border-radius: 8px;
  height: calc(102vh - 72px); 
`;

export const MenuItem = styled.div`
  margin-bottom: 10px;

  p {
    width: 120px;
    height: 40px;
    color: #ffffff;
    font-family: "Passion One";
    font-weight: 400;
    font-style: normal;
    font-size: 20px;
    cursor: pointer;
  }
`;
export const SummariesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1%;
  gap: 30px;
  font-family: "Passion One";
  margin-left: 10%;

  @media (max-width: 600px) {
    margin-top: 5%;
    padding: 15 10px;
  }
`;

export const SummaryCard = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  width: 600px;
  cursor:pointer;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    width: 290px;
    margin-left:40%;
  }
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ff0000;
  font-size: 20px;
  cursor: pointer;
  margin-left: auto;
  

  &:hover {
    color: #cc0000;
  }
`;

export const CoverImage = styled.img`
  width: 200px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

export const SummaryInfo = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 25px;
    color: #682DA4;
  }
  h2 {
    font-size: 18px;
    color: #8c4bce;
  }

  @media (max-width: 600px) {
    align-items: center;
    text-align: center;
  }
`;

export const SummaryText = styled.p`
  margin-top: 10px;
  font-size: 20px;
  color: #585858;
  text-align: justify;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

export const Inputs = styled.div`
    @media (max-width: 950px) {
      height: 100vh;
      width: 100vw;
      margin-left: 30%;
      form {
        margin: auto;
        width: auto;
        input {
          width: 90%;
        }
        button {
          width: 90%;
        }
      }
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: "Oswald";
    font-weight: 700;
    gap: 0px;
    width: 50vw;
    background-color: #A088B8;
    margin-left: 12%;
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;
      gap: 10px;
    }
    input {
      width: 30vw;
      height: 80px;
      border-radius: 6px;
      font-family: "Oswald";
      font-size: 27px;
      color: #9f9f9f;
      padding: 18px;
      border-radius: 6px;
      border: none;
      box-sizing: border-box;
    }
    button {
      width: 30vw;
      height: 65px;
      background: #682DA4;
      border-radius: 6px;
      font-family: "Oswald";
      font-weight: 700;
      font-size: 27px;
      color: #ffffff;
      border-color: transparent;
      cursor: pointer;
      border-radius: 6px;
      border: none;
    }
    `;
    export const FavoriteButton = styled.button`
    background-color: transparent;
    border: none;
    color: #682DA4;
    font-size: 20px;
    cursor: pointer;
    align-self: flex-end; 
    margin-top: -20px;
  
    &:hover {
      color: #8c4bce;
    }
  `;

export const NoItemsMessage = styled.p`
font-size: 20px;
color: #ffffff;
font-family: "Passion One";
margin-top: -8%;
margin-left: 10%;
@media (max-width: 600px) {
  margin-left:40%;
  }
`;