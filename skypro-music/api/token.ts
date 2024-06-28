export function updateToken(refresh: string) {
    fetch('https://skypro-music-api.skyeng.tech/user/token/refresh/', {
        method: "POST",
        body: JSON.stringify({
            refresh: refresh,
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
        return data.access;
    });
}

export async function getToken(email: string, password: string) {
    const result = await fetch('https://skypro-music-api.skyeng.tech/user/token/refresh/', {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
        }),
          headers: {
            "content-type": "application/json",
          },
    });
    if (!result.ok) {
        console.error('Token error', result.status);
    };
    const data = result.json()
    return data;
}