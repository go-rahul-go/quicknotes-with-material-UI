
import { Button, Divider, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import { remove, markAsDone, markAsUnDone } from "../store/noteSlice";
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import Note from '../components/Note';
import Masonry from 'react-masonry-css';




const breakPoints={
  default: 3,
  1100: 3,
  700: 2,
  500: 1
}


const Notes = () => {
  const task = useSelector(state => state.notes);

  console.log(task.tasks)
 

 
  return (
    <Paper className='notes-page' sx={{ minHeight: "100vh" }}>
      {
        task.tasks.length === 0 &&
        <Typography sx={{ textAlign: "center", fontSize: 35, textTransform: "capitalize", py: 30 }}>
          nothing to show here
        </Typography>
      }

      <Masonry
        breakpointCols={breakPoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {

          task.tasks.map((item, index) => {
            return (
              <div key={index} style={{borderRadius:"10px"}}>
                <Note notes={item} index={index} theme={task.theme} />

              </div>
            )
          })

        }
      </Masonry>


    </Paper>
  )
}

export default Notes