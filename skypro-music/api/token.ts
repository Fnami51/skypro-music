import { url } from "./configURLforAPi"

export function updateToken(refresh: string | null) {
    return fetch(url+'/user/token/refresh/', {
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
    return fetch(url+"/user/token/", {
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