
// const configCard = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8/cards',
//   headers: {
//     authorization: '837c0be1-5609-4c04-b384-491cd26df7eb'
//   }
// }

// const configName = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8/users/me ',
//   headers: {
//     authorization: '837c0be1-5609-4c04-b384-491cd26df7eb'
//   }
// }

// const onResponce = (res) => {
//   return res.ok ? res.json() : Promise.reject(res)
// }


// export function getCard() {
//   return fetch(configCard.baseUrl, {
//     headers: configCard.headers
//   })
//     .then(onResponce)
// }

// export function getName() {
//   return fetch(configName.baseUrl, {
//     headers: configName.headers
//   })
//     .then(onResponce)
// }


// export function editName(dataId) {
//   return fetch(`${configName.baseUrl}/${dataId}`, {
//     method: 'PATCH',
//     headers: configName.headers,
//     body: JSON.stringify(data)
//   })
//     .then(onResponce)
// }
