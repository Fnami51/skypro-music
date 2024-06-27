export function getTracks(/*token: string*/) {
    const result = fetch('https://skypro-music-api.skyeng.tech/catalog/track/all/', {
        method: "GET"
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
    /*if (!result.ok) {
        throw new Error('Ошибка при получении данных');
    }*/
    return result;
}