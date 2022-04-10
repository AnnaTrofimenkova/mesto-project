// подключение к карточккам сервера
const configCard = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8/cards',
  headers: {
    authorization: '837c0be1-5609-4c04-b384-491cd26df7eb',
    'Content-Type': 'application/json'
  }
}

// подключение к профилю сервера
const configName = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8/users/me',
  headers: {
    authorization: '837c0be1-5609-4c04-b384-491cd26df7eb',
    'Content-Type': 'application/json'
  }
}

const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(res)
}

// получаем карточки с сервера
export function getCard() {
  return fetch(configCard.baseUrl, {
    headers: configCard.headers
  })
    .then(onResponce)
}

// получаем профиль с сервера
export function getName() {
  return fetch(configName.baseUrl, {
    headers: configName.headers
  })
    .then(onResponce)
}

// меняем имя профиля на  сервере
export function editName(newName) {
  return fetch(configName.baseUrl, {
    method: 'PATCH',
    headers: configName.headers,
    body: JSON.stringify(newName)
  })
    .then(onResponce)
}

// добавляем на сервер карточку
export function addCard(newCardSer) {
  return fetch(configCard.baseUrl, {
    method: 'POST',
    headers: configCard.headers,
    body: JSON.stringify(newCardSer)
  })
    .then(onResponce)
}
// улаляем карточку с сервера
export function deleteCard(id) {
  return fetch(`${configCard.baseUrl}/${id}`, {
    method: 'DELETE',
    headers: configCard.headers
  })
    .then(onResponce);
}



// записываем лайк на сервер
export function editLike(id) {
  return fetch(`${configCard.baseUrl}/likes/${id}`, {
    method: 'PUT',
    headers: configCard.headers,
  })
    .then(onResponce)
}



// удаляем лайк с сервера
export function delLike(id) {
  return fetch(`${configCard.baseUrl}/likes/${id}`, {
    method: 'DELETE',
    headers: configCard.headers,
  })
    .then(onResponce)
}


// меняем аватарку
export function editAva(newURI) {
  return fetch(`${configName.baseUrl}/avatar`, {
    method: 'PATCH',
    headers: configName.headers,
    body: JSON.stringify(newURI)
  })
    .then(onResponce)
}

// const testURL = {
//   avatar: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
// };
// editAva(testURL);






// let idTest = "625055043407a100bb049349"
// delLike(idTest);

// смотрю на айдишки

// getCard()
//   .then((data) => {
//     data.forEach(function (item) {
//       console.log(item._id, item.name, item.likes.length);
//     })
//   });




