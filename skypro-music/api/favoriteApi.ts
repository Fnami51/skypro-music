function addFavotite(access: string, id: number) {
    return fetch("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/"+id+"/favorite/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
        .then((response) => {
            if (response.status === 401) {
                throw new Error ("Error auth")
            }
            return response.json()
        })
}