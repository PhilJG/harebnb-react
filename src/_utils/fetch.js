const getBaseUrl = (string) => {
  if (string.includes('localhost')) {
    return 'http://localhost:4100'
  }
  return 'harebnb-react-eawx8s660-phils-projects-89482ca9.vercel.app'
}

export default getBaseUrl

// const getBaseUrl = (string) => {
//     let baseUrl;
//     if(string.includes('localhost')){
//         baseUrl = 'http://localhost:4100'
//     } else {
//         baseUrl = 'https://harebnb-api.onrender.com/'
//     }
//     // Remove trailing slash if it exists
//     return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
// }

// export default getBaseUrl
