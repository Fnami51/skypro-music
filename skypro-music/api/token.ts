export function updateToken(refresh: string | null) {
    return fetch('https://skypro-music-api.skyeng.tech/user/token/refresh/', {
        method: "POST",
        body: JSON.stringify({
            refresh,
        }),
          headers: {
            "content-type": "application/json",
          },
    }).then((response) => {
      if (response.status === 401) {
          throw new Error ("Error auth")
      }
      return response.json()
  })
}

export function getToken(email: string, password: string) {
    return fetch("https://webdev-music-003b5b991590.herokuapp.com/user/token/", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 401) {
              throw new Error ("Error auth")
          }
          return response.json()})}