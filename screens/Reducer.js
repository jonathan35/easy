


const Reducer = (state, action) => {
switch (action.type) {
    case 'RESTORE_TOKEN':
    return {
        ...state,
        userToken: action.token,
        isLoading: false,
    };
    case 'SIGN_IN':
    return {
        ...state,
        isSignout: false,
        userToken: action.token,
    };
    case 'SIGN_OUT':
    return {
        ...state,
        isSignout: true,
        userToken: null,
    };
    case 'SET_USER':
    return {
        ...state,
        user: action.user
    };
    case 'CLEAR_PHOTOS':
    return {
        ...state,
        photoIc: null,//Photo of IC
        photoLicense: null,//Photo of License
        photoFront: null,//Photo of vehicle Front
        photoBack: null,//Photo of vehicle back
        photoPod: null,//Photo of proved of delivery
    };
    case 'SET_IC':
    return {
        ...state,
        photoIc: action.value,
    };
    case 'SET_LICENSE':
    return {
        ...state,
        photoLicense: action.value,
    };
    case 'SET_FRONT':
    return {
        ...state,
        photoFront: action.value,
    };
    case 'SET_BACK':
    return {
        ...state,
        photoBack: action.value,
    };
    case 'SET_POD':
    return {
        ...state,
        photoPod: action.value,
    };
    case 'RELOAD_ORDERS':
    return {
        ...state,
        reloadOrders: action.value,
    };
}
};


export default Reducer;





