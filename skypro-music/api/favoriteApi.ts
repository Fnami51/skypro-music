import { url } from "./configURLforAPi"
import { updateToken } from "./token"

export  function addFavotite(access: string, id: number, refresh: string) {
    return fetch(url+"/catalog/track/"+id+"/favorite/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
        .then((response) => {
          if (response.status === 404) {
            alert("Простите, трек не найден")
            throw new Error ("Трек не найден")
          }
          if (response.status === 500) {
            alert("Проблемы с сервером. Попробуйте позже")
            throw new Error ("Проблемы с сервером")
          }
            if (response.status === 401) {
              updateToken(refresh).then((data) => {
                addFavotite(data.access, id, refresh)
              })
            }
            return response.json()
        })
}

export  function deleteFavotite(access: string, id: number, refresh: string) {
  return fetch(url+"/catalog/track/"+id+"/favorite/", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          alert("Простите, трек не найден")
          throw new Error ("Трек не найден")
        }
        if (response.status === 500) {
          alert("Проблемы с сервером. Попробуйте позже")
          throw new Error ("Проблемы с сервером")
        }
          if (response.status === 401) {
            updateToken(refresh).then((data) => {
              addFavotite(data.access, id, refresh)
            })
          }
          return response.json()
      })
}