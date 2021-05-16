import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";

function ProfileEdit(props) {
  const authContext = useContext(AuthContext);
  const loggedUser = authContext.loggedInUser.user;
  const [state, setState] = useState({
    name: "",
    email: "",
    image_url: "",
    gamesList: [],
    recieveMessages: [],
    uploadedPosts: [],
    role: "",
  });

  const history = useHistory();

  // Pré-popula o formulário com os dados do produto através do id da URL
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/${loggedUser._id}`);
        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [loggedUser._id]);

  function handleChange(event) {
    if (event.target.files) {
      setState({ ...state, [event.target.name]: event.target.files[0] });
    } else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  }

  async function handleFileUpload(file) {
    try {
      // FormData é uma função construtora global nativa do Javascript que cria um objeto de Formulario no formato multipart/form esperado pelo backend
      const uploadData = new FormData();

      // 'image' precisa bater com o valor de uploadCloud.single() no nosso backend
      uploadData.append("image", file);

      const response = await api.post("/image-upload", uploadData);

      return response.data.fileUrl;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      // Fazendo um backup da imagem atual
      let uploadedImageUrl = state.image_url;
      // Verifica se o usuário selecionou um novo arquivo para trocar a imagem, pois o valor que já estará armazenado em image_url é a URL da imagem atual armazenada no Cloudinary
      if (typeof state.image_url === "object") {
        uploadedImageUrl = await handleFileUpload(state.image_url);
      }

      const response = await api.put(`/user/${loggedUser._id}/edit`, {
        ...state,
        image_url: uploadedImageUrl,
      });

      // Redireciona programaticamente para a URL '/'
      history.push("/home");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="signupFormName" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="signupFormName"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signupFormEmail" className="form-label">
            E-mail Address
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="signupFormEmail"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="signupFormPassword" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="signupFormPassword"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              value="option1"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              1
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              2
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              3
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              4
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox2"
              value="option2"
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              5
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="userFormImage">Profile Picture</label>
          <input
            type="file"
            className="form-control"
            id="userFormImage"
            name="image_url"
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
