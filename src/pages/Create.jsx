import { Button, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/noteSlice";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";



const Create = () => {


  const tasks = useSelector(state => state.notes)
  const [title, setTitle] = useState("")
  const [taskName, setTaskName] = useState("")
  const [success, changeSuccess] = useState(false)

  const dispatch = useDispatch();
  const nav = useNavigate()

  function clearData() {
    setTitle("")
    setTaskName("")
  }
  async function showAlert() {
    changeSuccess(true)

    let result = new Promise((resolve, reject) => {
      let time = setTimeout(() => {
        // alert('ho gaya')
        changeSuccess(true)
        resolve(true)
      }, 1000)
    })

    return result;

  }
  function getDate() {

    const dayObj = {
      0: "sunday",
      1: "monday",
      2: "tuesday",
      3: "wednesday",
      4: "thursday",
      5: "friday",
      6: "saturday",

    }

    const monthObj = {
      0: "january",
      1: "feburary",
      2: "march",
      3: "april",
      4: "may",
      5: "june",
      6: "july",
      7: "august",
      8: "september",
      9: "october",
      10: "november",
      11: "december"
    }
    let dateObj = new Date();

    return {
      date: dateObj.getDate(),
      month: monthObj[dateObj.getMonth()],
      year: dateObj.getFullYear(),
      day: dayObj[dateObj.getDay()]
    }

  }
  function handleSubmit(e) {
    e.preventDefault();

    let date = getDate();
    dispatch(add({ title, taskName, done: false, date,isNew:true }))
    clearData();


    showAlert()
      .then(() => {

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true)
          }, 2000)
        })
      })
      .then((result) => {
        console.log("done")
        changeSuccess(false)


        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
          },1000)
        })

      })
      .then((result) => {
        console.log("redirect to home page after 1 seconds", result)
        nav("/")
      })


  }


  return (
    <Paper className="create-page" sx={{ minHeight: "100vh" }}>

      <div className={tasks.theme === "light" ? "form-container form-container-light" : "form-container form-container-dark"}>
        <h2 style={{ textTransform: "capitalize", paddingBlock: "10px" }}>create new note</h2>
        <AnimatePresence>
          {success &&
            <motion.div id="success" key={success} initial={{ y: "-100vh" }} animate={{ y: 0 }} exit={{ y: "-100vh" }}>
              <h4>success</h4>
              <p>redirecting to home page</p>
            </motion.div>}
        </AnimatePresence>

        <form autoComplete="off" className="form" onSubmit={(e) => handleSubmit(e)}>


          <TextField label="Title" required sx={{ width: { xs: "95%", sm: "95%", md: "70%", lg: "50%" }, marginTop: "15px" }} id="title" name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="enter title "
          />


          <TextField
            label="Note"
            required
            sx={{ width: { xs: "95%", sm: "95%", md: "70%", lg: "50%" }, marginTop: "15px", fontSize: "1.6rem" }} multiline={true} rows={5}
            id="taskName"
            name="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}

          />


          <Button variant="contained" sx={{
            width: { xs: "95%", sm: "95%", md: "70%", lg: "20%" },
            ':hover': {
              bgcolor: tasks.theme === "light" ? "#1AA5EF" : "#FFCA3A",
              color: tasks.theme === "light" ? "ghostwhite" : "black"
            },
            backgroundColor: tasks.theme === "light" ? "#715AFF" : "#F5C529"
          }} size="large" endIcon={<SendIcon />}
            type="submit"
            onSubmit={(e) => handleSubmit(e)}>
            Submit
          </Button>


        </form>
      </div>
    </Paper>
  )
}

export default Create;