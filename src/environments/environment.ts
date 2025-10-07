const baseUrl = 'https://du-test-api.simbiotiktech.in/';
export const environment = {
    production:true,
    login:`${baseUrl}users/login`,

    fetchTodos : `${baseUrl}todos`,
    addTodo : `${baseUrl}todos`,

    weather:'https://api.openweathermap.org/data/2.5/weather',
    forecast : 'https://api.openweathermap.org/data/2.5/forecast',

    mapBaseUrl: 'https://nominatim.openstreetmap.org/',
    mapfromIcon :'https://w7.pngwing.com/pngs/959/926/png-transparent-location-icon-computer-icons-location-google-maps-location-angle-map-symbol.png',
    mapToIcon:'https://toppng.com/uploads/preview/map-google-maps-icon-free-icons-red-icon-11553375324uhx9qkujaz.png',

    
    openWeatherApiKey : 'a271982f3384814a64d4033b867792ac'
};
