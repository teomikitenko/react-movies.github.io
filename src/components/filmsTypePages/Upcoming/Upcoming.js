import './upcoming.css'
import { useEffect, useState,useRef } from 'react'
import { fetchTypeFilm } from '../filmsTypeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LinearProgress } from '@mui/material'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group'
import { FilterColumn } from './filterColumn/filtersColumn'


const UpcomingFilms=()=>{
  const dispatch=useDispatch()
  const[hideButton,setHideButton]=useState(false)
  const[page,setPage]=useState(1)
  const[genre,setGenre]=useState()

  const base_poster='https://image.tmdb.org/t/p/w500'

  const data=useSelector(state=>state.typeFilmsCategory.upcomingFilms)
  const flag=useSelector(state=>state.typeFilmsCategory.loadingStatus)
  const classNames = require('classnames');
  const divClass=classNames({
   'download_more':true,
    
  })
    useEffect(()=>{
  document.addEventListener('scroll',scrollListener)
  return ()=>document.removeEventListener('scroll',scrollListener)
   },[page]) 



   const scrollListener=()=>{
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    console.log(scrollHeight)
    console.log(document.documentElement.clientHeight + window.pageYOffset)
    if(hideButton&&document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight-150){
      console.log('scroll')
      setPage(page+1) 
    }

  } 
     
    useEffect(()=>{dispatch(fetchTypeFilm(page))},[page]) 
 
    return(
        <div className="wrapper_conteiner">
        <div className="content_column_wrapper">
          <div className="title">
            <p>Очікувані фільми</p>
          </div>
          <div className="content_media">
            <FilterColumn/>
              <div className="cards_column">
                 <section className="media_results">
                    <TransitionGroup component={null}> 
                  {data.map(film=>{
                     return(
                      <CSSTransition
                      key={film.id}
                      timeout={500}
                      classNames="my-node">
                            <div  className="card_media">
                        <div className="card_image_wrapper">
                          <img src={base_poster+film.poster_path} alt=""/>
                        </div>
                        <div className="card_text_wrapper">
                          <div className="text_title_card">
                            <p className="title_text">{film.title}</p>
                            <p className="date_text">{film.release_date}</p>
                          </div>
                        </div>
                      </div> 
                      </CSSTransition>
                    
                     )  
                    })}
                   </TransitionGroup>
                       {!hideButton&&flag === 'loading'&&<Loader/>} 
                  {                 <div onClick={()=>{
                   setPage(page+1) 
                     setHideButton(true)  
                 }} className={divClass}>
                  <p >Завантажити більше</p>
                  </div>
                 } 
                </section> 
              
              </div>
          </div>
        </div>
      </div>
  
      
    )
}
export const Loader=()=>{


  return(
    <LinearProgress
       sx={{width:"100%",position:'fixed',top:'0',left:'0'}}/> 
  )
}
/* const MediaResults=()=>{
  return(
    <section className="media_results">
    <TransitionGroup component={null}> 
  {data.map(film=>{
     return(
      <CSSTransition
      key={film.id}
      timeout={500}
      classNames="my-node">
            <div  className="card_media">
        <div className="card_image_wrapper">
          <img src={base_poster+film.poster_path} alt=""/>
        </div>
        <div className="card_text_wrapper">
          <div className="text_title_card">
            <p className="title_text">{film.title}</p>
            <p className="date_text">{film.release_date}</p>
          </div>
        </div>
      </div> 
      </CSSTransition>
    
     )  
    })}
   </TransitionGroup>
       {flag === 'loading'&&<Loader/>} 
  {                 <div onClick={()=>{
   setPage(page+1) 
     setButton(true)  
 }} className={divClass}>
  <p >Завантажити більше</p>
  </div>
 } 
</section> 
  )
}
 */



export default UpcomingFilms