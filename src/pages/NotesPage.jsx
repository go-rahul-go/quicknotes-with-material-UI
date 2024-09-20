
import { Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';


import Note from '../components/Note';
import Masonry from 'react-masonry-css';
import GoTop from '../components/GoTop';
import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import { useMotionValueEvent } from 'framer-motion';
import nothing from  "../assets/nothing.png"
import notFound from "../assets/notfound.jpg"

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
          <div id="nothing-image">
            <img src={nothing} alt="" onError={(e)=>{e.target.src=notFound; e.target.onError = null;}}/>
          </div>
          <p>nothing to show</p>
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