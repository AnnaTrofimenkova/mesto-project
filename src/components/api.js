// подключение к карточккам сервера
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '837c0be1-5609-4c04-b384-491cd26df7eb',
    'Content-Type': 'application/json'
  }
}


const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res)
}

// получаем карточки с сервера
export function getCard() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
}

// получаем профиль с сервера
export function getName() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse)
}

// меняем имя профиля на  сервере
export function editName(newName) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(newName)
  })
    .then(checkResponse)
}

// добавляем на сервер карточку
export function addCard(newCardSer) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    //body: JSON.stringify(newCardSer)
    body: JSON.stringify({
      name: newCardSer.name,
      link: newCardSer.link
    })
  })
    .then(checkResponse)
}
// улаляем карточку с сервера
export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(checkResponse);
}



// записываем лайк на сервер
export function editLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(checkResponse)
}



// удаляем лайк с сервера
export function delLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
}


// меняем аватарку
export function editAva(newURI) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(newURI)
  })
    .then(checkResponse)
}

// const testURL = {
//   avatar: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
// };
// editAva(testURL);






// let idTest = "625055043407a100bb049349"
// delLike(idTest);

// смотрю на айдишки

// editLikeTest()
//   .then((data) => {
//     data.forEach(function (item) {
//       console.log(item._id, item.name, item.likes.length);
//     })
//   });




