import React, { createContext, useReducer } from 'react';
import reducer from "./Reducer";

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  user: [],
  photoIc: null,
  photoLicense: null,
  photoFront: null,
  photoBack: null,
  photoPod: null
};

export const Context = createContext(initialState);


export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default { Context, Store };
