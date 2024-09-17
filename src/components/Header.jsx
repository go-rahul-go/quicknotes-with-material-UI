
import logo from "../assets/logo.svg"
import menu from "../assets/menu.svg"
import light from "../assets/day.svg"
import dark from "../assets/night.svg"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {changeTheme} from "../store/noteSlice"
import { useNavigate } from "react-router"

const Header = ({ menuOpenStatus, menuOpen }) => {
  const dispatch=useDispatch();
  const notes=useSelector(state=>state.notes);
  console.log(notes.theme)

  function toggleTheme(){
    if(notes.theme==="dark")
    {
      dispatch(changeTheme("light"))
    }
    else{
      dispatch(changeTheme("dark"))
    }
  }
  const nav=useNavigate();
  return (
    <div className='header'>
      <div className='menu-btn' onClick={() => menuOpenStatus(!menuOpen)}>
        <img src={menu} alt="" />
      </div>
      <div className="header-title" onClick={()=>nav("/")}>
          quick Memo
      </div>
      <div className='theme-box' onClick={toggleTheme}>
        <img src={notes.theme==="light"?light:dark} alt="" />
      </div>
    </div>
  )
}

export default Header