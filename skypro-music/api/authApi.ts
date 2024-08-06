import { url } from "./configURLforAPi";
import { getToken } from "./token";

export function toSignUp(email: string, password: string) {
      return  fetch(url+"/user/signup/", {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              username: email,
            }),
            headers: {
              "content-type": "application/json",
            },
          })
            .then((response) => {
              return response.json()}
            )
}

export function toLogIn(email: string, password: string) {
    return fetch(url+"/user/login/", {
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
          return response.json()
        });
}