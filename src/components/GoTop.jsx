import React from 'react'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import { useSelector } from 'react-redux';
const GoTop = ({link}) => {
    const states=useSelector(state=>state.notes)
  return (
    <a className={states.theme==="light"?"gotop gotop-light":"gotop gotop-dark"} href={link}>
        <ArrowUpwardRoundedIcon/>
      
    </a>
  )
}

export default GoTop;