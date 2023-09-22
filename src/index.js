import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import { Header } from "./components/Header";
import HeadPage from "./components/headPage/HeadPage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import ContentPoster from "./components/filmPage/contentPoster/contentPoster";
import SearchAllResults from "./components/resultsPage/searchAllResult";
import Persons from "./components/personsPage/persons";
import Person from "./components/person/Person";
import Serials from "./components/serialsPage/serials";
import EnterInPage from "./components/authorizationPage/authorization";
import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material/styles";
import {
  ChangeUpcomingFilmsPage,
  SortGenreUpcomingFilms,
} from "./components/typePages/filmsTypePages/thunks/upcomingFilmsThunk";
import {
  ChangeNowPlayingPage,
  SortGenreNowPlaying,
} from "./components/typePages/filmsTypePages/thunks/nowPlayingThunk";
import {
  ChangeRaitingFilmsPage,
  SortGenreRaitingFilms,
} from "./components/typePages/filmsTypePages/thunks/raitingsFilmsThunk";
import {
  ChangePopularFilmPage,
  SortGenrePopularFilm,
} from "./components/typePages/filmsTypePages/thunks/popularFilmThunk";
import {
  ChangePopularSerialsPage,
  SortGenrePopularSerials,
} from "./components/typePages/serialsTypePages/thunks/popularSerialsThunk";
import {
  ChangeRaitingSerialsPage,
  SortGenreTopRatedSerials,
} from "./components/typePages/serialsTypePages/thunks/topRatedSerialsThunk";
import { ChangeAiringTodaySerialsPage,SortGenreAiringTodaySerials } from "./components/typePages/serialsTypePages/thunks/airingTodaySerialsThunk";
import TypeMedia from "./components/typePages/typeMediaSample/TypeMedia";
import { ChangeNowOnTVSerialsPage, SortGenreNowOnTVSerials } from "./components/typePages/serialsTypePages/thunks/nowOnTvSerialsThunk";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};
const moviesPagesType = [
  {
    id: 1,
    path: "/upcoming-films",
    mediaType: "movies",
    changePageThunk: ChangeUpcomingFilmsPage,
    filteSortThunk: SortGenreUpcomingFilms,
    title: "Очікувані фільми",
    endpoint: "popularity.desc",
    type: "Популярні",
  },
  {
    id: 2,
    path: "/now-playing",
    mediaType: "movies",
    changePageThunk: ChangeNowPlayingPage,
    filteSortThunk: SortGenreNowPlaying,
    title: "Фільми, що зараз у кіно",
    endpoint: "popularity.desc",
    type: "Популярні",
  },
  {
    id: 3,
    path: "/top-rated-movies",
    mediaType: "movies",
    changePageThunk: ChangeRaitingFilmsPage,
    filteSortThunk: SortGenreRaitingFilms,
    title: "Фільми з найвищими рейтингами",
    endpoint: "vote_average.desc",
    type: "Рейтинг високий",
  },
  {
    id: 4,
    path: "/popular-films",
    mediaType: "movies",
    changePageThunk: ChangePopularFilmPage,
    filteSortThunk: SortGenrePopularFilm,
    title: "Популярні фільми",
    endpoint: "popularity.desc",
    type: "Популярні",
  },
];
const serialPagesType = [
  {
    id: 5,
    path: "/popular-serials",
    mediaType: "serials",
    changePageThunk: ChangePopularSerialsPage,
    filteSortThunk: SortGenrePopularSerials,
    title: "Популярні серіали",
    endpoint: "popularity.desc",
    type: "Популярні",
  },
   {
    id: 6,
    path: "/top-rated-serials",
    mediaType: "serials",
    changePageThunk: ChangeRaitingSerialsPage,
    filteSortThunk: SortGenreTopRatedSerials,
    title: "Серіали з найвищими рейтингами",
    endpoint: "vote_average.desc",
    type: "Рейтинг високий",
  },
  {
    id: 7,
    path: "/on-air-today",
    mediaType: "serials",
    changePageThunk: ChangeAiringTodaySerialsPage,
    filteSortThunk: SortGenreAiringTodaySerials,
    title: "Серіали, що сьогодні в ефірі",
    endpoint: "popularity.desc",
    type: "Популярні",
  },
  {
    id: 8,
    path: "/on-tv",
    mediaType: "serials",
    changePageThunk: ChangeNowOnTVSerialsPage,
    filteSortThunk: SortGenreNowOnTVSerials,
    title: "Серіали, що виходять зараз",
    endpoint: "popularity.desc",
    type: "Популярні",
  },
];
export let theme = createTheme({
  breakpoints: {
    values: {
      s:0,
      xs: 320,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fill: "#000",
        },
      },
    },
    MuiTypography:{
      defaultProps:{
        variantMapping:{
          poster_title:'h5'
        }
      }
    }
  },
  typography: {
    fontFamily: "Source Sans 3",
    fontSize: "1rem",
    
     h1:{
      color:'#fff',
      fontSize:'4rem',
      fontWeight:700,
      lineHeight:1,
    },
    h2:{
      color:'#fff',
      fontSize:'3rem',
      fontWeight:700,
      lineHeight:1,
    },
    h3:{
      fontSize:'2rem',
      fontWeight:600,
      lineHeight: 1,
    }, 
     h5:{
      fontSize:'1rem',
      color:'#fff',
      fontWeight:400,
      lineHeight: 1,
    }, 
     h6:{
      fontSize:'1rem',
      color:'#fff',
      lineHeight:1,
      fontWeight:600,
    },
/*     h2:{
      fontSize:'2.2rem',
      color:'#fff',
      fontWeight:700,
      lineHeight: 1,
    }, */
 
  },
});
theme.typography.info_media={
  fontSize:'1rem',
  color:'#fff',
  fontWeight:400,
  lineHeight: 1,
   [theme.breakpoints.down('md')]:{
    fontSize:'0.9rem',
  }, 
  [theme.breakpoints.down('sm')]:{
    fontSize:'0.8rem',
  }, 
  [theme.breakpoints.down('xs')]:{
    fontSize:'0.7rem',
  }, 
}
theme.typography.poster_title={
  fontSize:'2.3rem',
  color:'#fff',
  fontWeight:700,
  lineHeight: 1,
  [theme.breakpoints.down('lg')]:{
    fontSize:'2.1rem',
  },
  [theme.breakpoints.down('md')]:{
    fontSize:'1.9rem',
  },
   [theme.breakpoints.down('sm')]:{
    fontSize:'1.7rem',
  }, 
  [theme.breakpoints.down('xs')]:{
    fontSize:'1.4rem',
  }, 
  
}


console.log(theme)

theme=responsiveFontSizes(theme)
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HeadPage />}>
      <Route index element={
       
        <Header />
      } />
      <Route
        path="films/:idFilm"
        loader={async ({ params }) => {
          return fetch(
            `https://api.themoviedb.org/3/movie/${params.idFilm}?append_to_response=credits%2Cvideos,%2Cimages%2Cexternal_ids%2Crelease_dates&language=uk%2Cen`,
            options
          );
        }}
        element={<ContentPoster />}
      />

      {moviesPagesType.map((page) => {
        return (
          <Route
          
            path={page.path}
            element={
                <TypeMedia
                  key={page.id} 
                  mediaType={page.mediaType}
                  changePageThunk={page.changePageThunk}
                  filteSortThunk={page.filteSortThunk}
                  title={page.title}
                  endpoint={page.endpoint}
                  type={page.type}
                />
            }
          />
        );
      })}
      {serialPagesType.map((page) => {
        return (
          <Route
            
            path={page.path}
            element={
              <ThemeProvider theme={theme}>
                <TypeMedia
                  key={page.id}
                  mediaType={page.mediaType}
                  changePageThunk={page.changePageThunk}
                  filteSortThunk={page.filteSortThunk}
                  title={page.title}
                  endpoint={page.endpoint}
                  type={page.type}
                />
              </ThemeProvider>
            }
          />
        );
      })}
      <Route path="results/:res" element={<SearchAllResults />} />
      <Route path="persons" element={<Persons />} />
      <Route
        path="persons/:idPerson"
        loader={async ({ params }) => {
          return fetch(
            `https://api.themoviedb.org/3/person/${params.idPerson}?append_to_response=movie_credits%2Ctv_credits%2Cexternal_ids`,
            options
          );
        }}
        element={<Person />}
      />
      <Route
        path="tv/:idSerial"
        loader={async ({ params }) => {
          return fetch(
            `https://api.themoviedb.org/3/tv/${params.idSerial}?append_to_response=credits%2Cimages%2Cvideos%2Cexternal_ids&language=en`,
            options
          );
        }}
        element={<Serials />}
      />
      <Route path="/auth" element={<EnterInPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
