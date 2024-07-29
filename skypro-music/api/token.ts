export function updateToken(refresh: string) {
    fetch('https://skypro-music-api.skyeng.tech/user/token/refresh/', {
        method: "POST",
        body: JSON.stringify({
            refresh,
        }),
          headers: {
            "content-type": "application/json",
          },
    }).then((response) => {
        if (response.ok) {
            return response.json()
            
        } else {
            console.error('Token error', response.status);
        };
    }).then((data) => {
        console.log("Access token", data.access)
        return data.access;
    });
}

export function getToken(email: string, password: string) {
    fetch("https://webdev-music-003b5b991590.herokuapp.com/user/token/", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            sessionStorage.setItem("refresh", json.refresh)
        });
}