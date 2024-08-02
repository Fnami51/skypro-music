import { updateToken } from "./token"

export  function addFavotite(access: string, id: number, refresh: string) {
    return fetch("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/"+id+"/favorite/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
        .then((response) => {
          if (response.status === 404) {
            alert("Простите трек не найден")
            throw new Error ("Трек не найден")
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
  return fetch("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/"+id+"/favorite/", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    })
      .then((response) => {
        if (response.status === 404) {
          alert("Простите трек не найден")
          throw new Error ("Трек не найден")
        }
          if (response.status === 401) {
            updateToken(refresh).then((data) => {
              addFavotite(data.access, id, refresh)
            })
          }
          return response.json()
      })
}