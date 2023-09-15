import "./typeFilm.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { LinearProgress } from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FilterColumn } from "./filterColumn/filtersColumn";
import { memo } from "react";

const selectValues = createSelector(
  (state) => state.typeFilmsCategory.filmsArray,
  (state) => state.typeFilmsCategory.loadingStatus,
  (state) => state.typeFilmsCategory.filterType,
  (state) => state.typeFilmsCategory.sortingType,
  (data, flag, genre, sort) => ({
    data,
    flag,
    genre,
    sort,
  })
);

const TypeFilm = memo(({
  changePageThunk,
  filteSortThunk,
  title,
  type,
  sort,
}) => {
  const dispatch = useDispatch();
  const [hideButton, setHideButton] = useState(false);
  const [page, setPage] = useState(1);
  const base_poster = "https://image.tmdb.org/t/p/w500";

  const { data, flag, genre /* , sort  */} = useSelector(selectValues);
 
  const classNames = require("classnames");
  const divClass = classNames({
    download_more: true,
  });


  useEffect(() => {
    document.addEventListener("scroll", scrollListener);
    return () => document.removeEventListener("scroll", scrollListener);
  }, [data]);

  const scrollListener = () => {
    let scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    if (
      hideButton &&
      document.documentElement.clientHeight + window.pageYOffset >=
        scrollHeight - 400
    ) {
      setPage(page + 1);
    }
  };


  useEffect(() => {
    if(page>=2)dispatch(changePageThunk({ page, genre, sort }));
  }, [page]);

   useEffect(() => {
    if(sort)dispatch(filteSortThunk({ genre, sort }));
  }, [genre,sort]);

  return (
   <div className="wrapper_conteiner">
      <div className="content_column_wrapper">
        <div className="title_type_media">
          <p>{title}</p>
        </div>
        <div className="content_media">
          <FilterColumn type={type} />
          <div className="cards_column">
            <section className="media_results">
              <TransitionGroup component={null}>
                {data.map((film) => {
                  return (
                    <CSSTransition
                      key={film.id}
                      timeout={500}
                      classNames="my-node"
                    >
                      <div className="card_media">
                        <div className="card_image_wrapper">
                          <img src={base_poster + film.poster_path} alt="" />
                        </div>
                        <div className="card_text_wrapper">
                          <div className="text_title_card">
                            <p className="title_text">{film.title}</p>
                            <p className="date_text">{film.release_date}</p>
                          </div>
                        </div>
                      </div>
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
              {flag === "loading" && <Loader />}
              {page <= 1 && flag === "success" && (
                <div
                  onClick={() => {
                    setPage(page + 1);
                    setHideButton(true);
                  }}
                  className={divClass}
                >
                  <p>Завантажити більше</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
});
export const Loader = () => {
  return (
    <LinearProgress
      sx={{ width: "100%", position: "fixed", top: "0", left: "0" }}
    />
  );
};

export default TypeFilm;
