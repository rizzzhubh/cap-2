export const actionType = {
    SET_USER: 'SET_USER',
    SET_ALL_USERS: 'SET_ALL_USER',
    SET_ALL_SONGS: 'SET_ALL_SONGS',
    SET_ARTISTS: 'SET_ARTISTS',
    SET_ALL_ALBUMS: 'SET_ALL_ALBUMS',
    // filters
    SET_FILTER_TERM: 'SET_FILTER_TERM',
    SET_ARTIST_FILTER: 'SET_ARTIST_FILTER',
    SET_LANGUAGE_FILTER: 'SET_LANGUAGE_FILTER',
    SET_ALBUM_FILTER: 'SET_ALBUM_FILTER',
    
}

const reducer = (state, action) => {
    // console.log(action.users.users);
    switch(action.type){
        case actionType.SET_USER:
                return{
                    ...state,
                    user: action.user, 
                }
        case actionType.SET_ALL_USERS:
                return {
                    ...state,
                    allUsers: action.allUsers,
                };

        case actionType.SET_ALL_SONGS:
                return {
                    ...state,
                    allSongs: action.allSongs,
                };

        case actionType.SET_ARTISTS:
                return {
                    ...state,
                    artists: action.artists,
                };
        case actionType.SET_ALL_ALBUMS:
                return {
                    ...state,
                    allAlbums: action.allAlbums,
                };
                
            default:
                return state;
            

        // filter case
        case actionType.SET_FILTER_TERM:
            return {
              ...state,
              filterTerm: action.filterTerm,
            };

        case actionType.SET_ARTIST_FILTER:
            return {
              ...state,
              artistFilter: action.artistFilter,
            };
      
          case actionType.SET_LANGUAGE_FILTER:
            return {
              ...state,
              languageFilter: action.languageFilter,
            };
          case actionType.SET_ALBUM_FILTER:
            return {
              ...state,
              albumFilter: action.albumFilter,
            };
        }
}


export default reducer;

