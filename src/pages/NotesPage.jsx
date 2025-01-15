
import { Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Note from '../components/Note';
import Masonry from 'react-masonry-css';
import GoTop from '../components/GoTop';
import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import addNew from "../assets/addnew.svg"

const breakPoints = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
}


const Notes = () => {
  const task = useSelector(state => state.notes);
  const [showGoTop, goTopStatus] = useState(false)
  const visRef = useRef();

  const { scrollYProgress } = useScroll({ target: visRef })

  useMotionValueEvent(scrollYProgress, "change", latest => {
    console.log(latest)
    if (latest >= 0.7) {
      goTopStatus(true)
    }
    else {
      goTopStatus(false)
    }
  })



  return (
    <Paper className='notes-page' sx={{ minHeight: "100vh" }} ref={visRef}>
      <div id="notes-top" style={{ width: "100%", height: "100px" }}>

      </div>
      {
        task.tasks.length === 0 &&
        <div className='nothing'>
          <Link to="/create" id="add-new-home">add new task
            <span className='add-new-logo'>
                <img src={addNew} alt=""/>
            </span>
          </Link>
          <p>nothing to show here</p>
        </div>
      }

      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {

          task.tasks.map((item, index) => {
            return (
              <div key={index} style={{ borderRadius: "10px" }} >
               
                <Note notes={item} index={index} theme={task.theme} />

              </div>
            )
          })

        }
      </Masonry>

      {
       ( showGoTop && task.tasks.length!==0)&&<GoTop link={"#notes-top"} />
      }



    </Paper>
  )
}

export default Notes