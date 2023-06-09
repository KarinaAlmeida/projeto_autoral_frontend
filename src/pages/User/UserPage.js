import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../Components/Header/Header.js";
import { Container, SideMenu, MenuItem,
  SummariesContainer, SummaryCard, SummaryInfo, SummaryText,
   CoverImage, DeleteButton, Inputs, FavoriteButton, NoItemsMessage } from "./UserStyle.js";
import { userPostAPI } from "../../services/userPostApi.js";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsBalloonHeartFill, BsBalloonHeart } from "react-icons/bs";
import { deletePostAPI } from "../../services/deletePostApi.js";
import { UpdateAPI } from "../../services/updatePictureApi.js";
import { userFavesAPI } from "../../services/userFavesApi.js";
import { deleteFavesAPI } from "../../services/deleteFave.js";


export function UserPage() {
  const [showForm, setShowForm] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showFaves, setShowFaves] = useState(false);
  const [isFavorite, setIsFavorite] = useState({});
  const navigate = useNavigate();
  const [userSummaries, setUserSummaries] = useState([]);
  const [userFaves, setUserFaves] = useState([]);
  const [update, setUpdate] = useState({picture: ""});
  const {picture} = update;
  const token = localStorage.getItem("token");



  const fetchUserSummaries = async () => {
    try {
      const response = await userPostAPI(token);
      setUserSummaries(response);
     
    } catch (err) {
        console.log(err.response.data);
    }
  };

  const fetchUserFaves = async () => {
    try {
      const response = await userFavesAPI(token);
      setUserFaves(response);
     
    } catch (err) {
        console.log(err.response.data);
    }
  };

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("pic");
    navigate("/");
  }

  function handleToggleForm() {
    setShowForm(true);
    setShowPosts(false);
  }

  function handleTogglePosts() {
    setShowPosts(true);
    setShowForm(false);
    setShowFaves(false);
    fetchUserSummaries();
  }
  function handleToggleFaves() {
    setShowPosts(false);
    setShowForm(false);
    setShowFaves(true);
    fetchUserFaves();
  }
  const toggleFavorite = async (summaryId) => {
    try {
      await deleteFavesAPI(token, summaryId)
      setIsFavorite((prevFavorites) => ({
      ...prevFavorites,
      [summaryId]: !prevFavorites[summaryId]
    }));
    alert("Post desfavoritado!");
    window.location.reload();
    } catch (error) {
      console.log(error);
    }
    
  };

  const deletePost = async (postId) =>{
    const token = localStorage.getItem("token");
    try {
      await deletePostAPI(token, postId);
      alert("Resumo deletado com sucesso!")
      navigate("/user")
    } catch (error) {
      console.log(error)
    }
  }

  function updatePic(event) {
    event.preventDefault();

    if (picture==="") {
      return alert("Por favor, preencha todos os dados!");
    }

    const promise = UpdateAPI(update, token);

    promise.then((res) => {
      alert("Foto atualizada!");
      localStorage.setItem("pic", picture);
      navigate("/home");
    });

    promise.catch((err) => {
      console.log(err.response.data);
      alert("Ops! Tente novamente!");
    });
  }

  function  handleInputChange(e){
    setUpdate({...update, [e.target.name]: e.target.value})
  }

  return (
    <Container>
      <Header />
      <SideMenu>
        <MenuItem onClick={handleTogglePosts}>
          <p>Meus Posts</p>
        </MenuItem>
        <MenuItem onClick={handleToggleForm}>
          <p>Mudar Foto</p>
        </MenuItem>
        <MenuItem onClick={handleToggleFaves}>
          <p>Meus Favoritos</p>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <p>Sair</p>
        </MenuItem>
      </SideMenu>


      {showForm &&(
        <Inputs>
         <form onSubmit={updatePic}>
          <input
              type="url"
              placeholder="Foto URL"
              value={update.picture}
              name="picture"
              onChange = {(e) => handleInputChange(e)}
              required
            />
            <button type="submit">
              Alterar
            </button>
          </form>
        </Inputs>
      )}

      {showPosts && userSummaries.length === 0 && (
        <NoItemsMessage>Você ainda não possui nenhum post!</NoItemsMessage>
      )}
      {showPosts && userSummaries.length > 0 && (
        <SummariesContainer>
            {userSummaries.map((summary) => (
              <SummaryCard key={summary.id} onClick={() => navigate(`/post/${summary.id}`)}>
                <CoverImage src={summary.coverUrl} alt="Cover" />
                <SummaryInfo>
                  <h1>{summary.title}</h1>
                  <h2>Autor(a): {summary.author}</h2>
                  <SummaryText>{summary.summary}</SummaryText>
                </SummaryInfo>
                <DeleteButton onClick={() => deletePost(summary.id)}>
                  <RiDeleteBin6Line />
                </DeleteButton>
              </SummaryCard>
            ))}
        </SummariesContainer>
      )} 

      {showFaves && userFaves.length === 0 && (
        <NoItemsMessage>Você ainda não possui nenhum favorito!</NoItemsMessage>
      )}

      {showFaves && userFaves.length > 0 && (
         <SummariesContainer>
         {userFaves.map((summary) => (
           <SummaryCard key={summary.id}>
             
               <CoverImage src={summary.coverUrl} alt="Cover" onClick={() => navigate(`/post/${summary.id}`)} />
               <SummaryInfo>
                 <h1 onClick={() => navigate(`/post/${summary.id}`)}>{summary.title}</h1>
                 <h2>Autor(a): {summary.author}</h2>
                 <SummaryText>{summary.summary}</SummaryText>
                 <FavoriteButton onClick={() => toggleFavorite(summary.id)}>
               {isFavorite[summary.id] ?  <BsBalloonHeart />: <BsBalloonHeartFill />}
             </FavoriteButton>
               </SummaryInfo>
           </SummaryCard>
         ))}
       </SummariesContainer>
      )}
    </Container>
  );
}