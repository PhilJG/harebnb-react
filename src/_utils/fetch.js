const  getBaseUrl = (string) => {
    if(string.includes('localhost')){
        return 'http://localhost:4100'
    }
    return 'https://harebnb-api.onrender.com/'
}

export default getBaseUrl