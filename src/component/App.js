import { useEffect, useState, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/Api";
import * as auth from "../utils/Auth";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardToDelete, setSelectedCardToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const [load, setLoad] = useState(false);

  const [isRegistered, setIsRegistered] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setLoading] = useState(true);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    isInfoTooltipOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function clickOverPopups(e) {
      if (!e.target.closest(".popup__conteiner-open")) {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("mousedown", clickOverPopups);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("mousedown", clickOverPopups);
      };
    }
  }, [isOpen]);

  // Данные из API
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialUserInfo(), api.getInitialUserCards()])
        .then(([resUserInfo, resCards]) => {
          setCurrentUser(resUserInfo);
          setCards(resCards);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn]);

  //Закрытие всех попапов по Х
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function openProfilePopup() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function openEditAvatarPopup() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function openAddPlacePopup() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);

  }
  // Попап image
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Попап infoTooltip
  function openInfoTooltip() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen)
  }



  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.setLikes(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardClickDelete(card) {
    setSelectedCardToDelete(card);
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
  }
  // удаление карточки
  function handleCardDelete(card) {
    setLoad(true);
    api.deleteCards(card._id)
      .then(() => {
        const filtered = cards.filter((newCard) => newCard !== card);
        setCards(filtered);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setLoad(false);
      });
  }
  //Редактирование профиля
  function handleUpdateUser(values) {
    setLoad(true);
    api.editlUserInfo(values)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("здесь ошибка", err); // выведем ошибку в консоль
      })
      .finally(() => {
        setLoad(false);
      });
  }
  //Редактирование аватара

  function handleUpdateAvatar(values) {
    setLoad(true);
    api.editAvatar(values)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("здесь ошибка", err); // выведем ошибку в консоль
      })
      .finally(() => {
        setLoad(false);
      });
  }
  // Добавление карточек
  function handleAddPlaceSubmit(data) {
    setLoad(true);
    api.createNewCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setLoad(false);
      });
  }
  // Региcтрация
  const handleRegister = useCallback((values) => {
    auth.register(values)
      .then((res) => {
        setIsRegistered(true);
        openInfoTooltip()
        navigate("/singin", { replace: true });
      })
      .catch((err) => {
        console.log("здесь ошибка", err); // выведем ошибку в консоль
        setIsRegistered(false);
        openInfoTooltip()
      })
      .finally(setLoading(false))
  }, [])

  // Вход
  const handleLogin = useCallback(async (values) => {
    try {
      const res = await auth.authorize(values.email, values.password)
      if (!res) {
        throw new Error('Ошибка аутентификации');
      }
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setUserEmail(values.email);
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // Проверка токена
  const handleTokenCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    // проверим токен
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log("здесь ошибка", err); // выведем ошибку в консоль
        })
        .finally(setLoading(false));
    }
  }, []);

  useEffect(() => {
    handleTokenCheck();
  }, []);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isloggedIn={loggedIn}
                  element={
                    <>
                      <Main
                        onEditProfile={openProfilePopup}
                        onEditAvatar={openEditAvatarPopup}
                        onAddPlace={openAddPlacePopup}
                        onCardDelete={handleCardClickDelete}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        cards={cards}
                        email={userEmail}
                      />
                      <Footer />
                    </>
                  }
                />
              }
            />
            <Route path="/singup" element={<Register onAddAccount={handleRegister} />} />
            <Route path="/singin" element={<Login handleLogin={handleLogin} />} />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={load}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={load}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={load}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <ConfirmPopup
            card={selectedCardToDelete}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
            isLoading={load}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            registered={isRegistered}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
