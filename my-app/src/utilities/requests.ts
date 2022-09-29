const API_KEY = "4e463b8dd5bcf9cfc7261aaef50684c5";
const Base_Url = 'https://9d3c-105-112-183-160.eu.ngrok.io'

const requests ={
     fetchTrending:`/trending/all/day?api_key=${API_KEY}`,
     fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
     fetchTopRated:`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
     fetchActionMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
     fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
     fetchHorrorMovies:  `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
     fetchRomanceMovies:  `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
     fetchDocumentaries:  `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,

     getChurches:`${Base_Url}/api/v1/churches`,
     getChurchesByChurchId:`${Base_Url}/api/v1/church/`,
     getChurchesBygGroup:`${Base_Url}/api/v1/churches/`,
     postMember:`${Base_Url}/api/v1/create/members`,
     getmembers:`${Base_Url}/api/v1/members`,
     getmembersByChurchId:`${Base_Url}/api/v1/members/`,
     updateMembers:`${Base_Url}/api/v1/update/members/`,
     deleteMembers:`${Base_Url}/api/v1/delete/members/`,
     postUsers:`${Base_Url}/api/v1/create/users`,
     getUsers:`${Base_Url}/api/v1/users`,
     updateUsers:`${Base_Url}/api/v1/update/users/`,
     deleteUsers:`${Base_Url}/api/v1/delete/users/`,
     loginUsers:`${Base_Url}/api/v1/user/signin`
}
export default requests