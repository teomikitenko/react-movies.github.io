import { configureStore, createSlice } from "@reduxjs/toolkit";
import { trendingPersons } from "../components/personsPage/personQuery";
import { reducer as searchReducer } from "../components/homePage/serchpanel/searchSlice";
import { reducer as typeFilmsCategory } from "../components/typePages/filmsTypePages/filmsTypeSlice";
import { reducer as typeSerialsCategory } from "../components/typePages/serialsTypePages/serialsTypeSlice";
import { multiFind } from "../components/homePage/serchpanel/searchSlice";
import { getTrailers } from "../components/homePage/trailerSection/trailersQuery";
import {
  findVideoTrailersSerials,
  findVideoTrailersMovie,
} from "../components/homePage/trailerSection/trailersQuery";
import { popularQuery } from "../components/homePage/popularBlock/popularBlockQuery";
import { inTrendsQuery } from "../components/homePage/inTrendQuery";
const myMiddleware = (store) => (next) => (action) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const initialState = {
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE",
};
const myToken = createSlice({
  name: "token",
  initialState,
});
let { reducer: authToken } = myToken;

export const store = configureStore({
  reducer: {
    authToken,
    searchReducer,
    typeFilmsCategory,
    typeSerialsCategory,
    [inTrendsQuery.reducerPath]:inTrendsQuery.reducer,
    [popularQuery.reducerPath]: popularQuery.reducer,
    [findVideoTrailersMovie.reducerPath]: findVideoTrailersMovie.reducer,
    [findVideoTrailersSerials.reducerPath]: findVideoTrailersSerials.reducer,
    [getTrailers.reducerPath]: getTrailers.reducer,
    [multiFind.reducerPath]: multiFind.reducer,
    [trendingPersons.reducerPath]: trendingPersons.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      myMiddleware,
      inTrendsQuery.middleware,
      popularQuery.middleware,
      findVideoTrailersMovie.middleware,
      findVideoTrailersSerials.middleware,
      getTrailers.middleware,
      multiFind.middleware,
      trendingPersons.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});
