export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    //REMOVE AFTER finished developing....
    token: "BQDpyFVJc0B7lhLfhuKOgTPKCGUTi9FV67FbbqlbxlBaD_t2LyIy8wDSLdIPDfwNCpKI93NOv_BoNnS31bavQnYK9zr6LByrRJmED7VYxo_uBvfeQ1N2oRr-Jq8Kk-k9GbcT_M7NooPTvubp4Jh4hc0LMHpgueBk8ftQISacTBDTqBTbRmPrfDMRw2uIoAbSUUZ_pxRsIKvrTGahaUmlVvx3quQJ7ORU8L8R",
};

const reducer = (state,action) => {
console.log(action);

// Action --> type, [payload]

    switch(action.type) {
        case 'SET_USER':
            return{
                ...state,
                user: action.user,
            }
        case 'SET_TOKEN':
            return{
                ...state,
                token: action.token
            }
        default: 
        return state;
    }
};

export default reducer;