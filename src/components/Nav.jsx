import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import home from "../assets/home.svg"
import add from "../assets/add.svg"
import { NavLink } from 'react-router-dom'
import close from "../assets/close-svgrepo-com.svg"
import history from "../assets/history.svg"

const mot = {
  start: {
    x: "-100vw"
  },
  end: {
    x: 0,
    transition: { duration: 0.4 }
  },
  exit: {
    x: "-100vw",
    transition: { duration: 0.4 }
  }
}

const Nav = ({ menuOpen, menuOpenStatus }) => {

  return (
    <AnimatePresence>
     
        <motion.div className={"nav"} key={menuOpen} variants={mot} initial="start" animate={menuOpen ? "end" : "start"} exit="exit">
          <div className='nav-header'>
            <h3>tusky_Notes_</h3>
            <div className='nav-close' onClick={() => menuOpenStatus(false)}>
              <img src={close} alt="" />
            </div>
          </div>
          <ul className='menu-links'>
            <NavLink to="/" onClick={() => menuOpenStatus(false)}>
              <span className='menu-icon'>
                <img src={home} alt="" />
              </span>
              Home
            </NavLink>

            <NavLink to="/create" onClick={() => menuOpenStatus(false)}>
              <span className='menu-icon'>
                <img src={add} alt="" />
              </span>
              create new
            </NavLink>
            <NavLink to="/history" onClick={() => menuOpenStatus(false)}>
              <span className='menu-icon'>
                <img src={history} alt="" />
              </span>
              history
            </NavLink>
          </ul>
        </motion.div>
     

    </AnimatePresence>

  )
}

export default Nav