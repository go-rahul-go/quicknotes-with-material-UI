import { Alert, Button, Card, CardActions, CardContent, CardHeader, Paper, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { deleteForever, add } from "../store/noteSlice"
import Divider from '@mui/material/Divider';
import BlockIcon from '@mui/icons-material/Block';


const History = () => {

  const notes = useSelector(state => state.notes)
  const dispatch = useDispatch();
  const [showDeletePopUp, deletePopUpStatus] = useState(false);
  const [deleteItem, changeDeleteItem] = useState()

  console.log(notes)
  return (
    <Paper sx={{ minHeight: "100vh", paddingTop: "70px", display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
      {
        notes.history.length === 0 && <Paper
          sx={
            {
              fontSize: 25, color: notes.theme === "light" ? "#292F36" : "#CCCCCC", textTransform: "capitalize", py: 10,
              boxShadow: 0, fontWeight: 600
            }
          }
        >nothing to show here</Paper>}
      {
        notes.history.map((item, index) => {
          return (
            <Card key={index}
              sx={
                {

                  minHeight: "50px",
                  width: "97%",
                  borderRadius: "20px",
                  backgroundColor: notes.theme === "light" ? "#EAE9EC" : "#1F1F1F",
                  my: 1
                }
              }
            >
              <CardHeader
                title={item.title}
                titleTypographyProps={{
                  fontSize: 20,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  width: "77%",
                  py: 0,

                }}
              >

              </CardHeader>
              <Divider orientation="vertical"
                sx={
                  {
                    height: "1px",
                    width: "98%",
                    mx: "auto",
                    backgroundColor: notes.theme === "light" ? "#C3CBD5" : "#44474B"
                  }
                } />
              <CardContent
                sx={{

                  py: 1,

                  width: "98%",

                  overflow: "hidden",
                  textWrap: "wrap",

                }}>
                <Typography sx={
                  {
                    fontSize: 18,
                    fontWeight: 400,

                    wordWrap: "break-word",


                  }
                }
                >
                  {item.taskName}
                </Typography>

              </CardContent>

              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "0px 15px 0px 0px",
                  gap: "5px"
                }}>
                <Button varaint="outlined"
                  sx={{
                    color: "#009FB7",
                    outline: "0.10rem solid #009FB7",
                    fontSize: 13,
                    ":hover": {
                      backgroundColor: "#009FB7",
                      color: "white"
                    }
                  }}
                  endIcon={<AddIcon />}
                  onClick={() => { dispatch(add(item)); dispatch(deleteForever(index)) }}
                >Add again</Button>
                <Button
                  sx={{
                    color: "#FF2F0A",
                    outline: "0.10rem solid #FF2F0A",

                    fontSize: 13,
                    ":hover": {
                      backgroundColor: "#FF2F0A",
                      color: "white"
                    }
                  }}
                  endIcon={<DeleteIcon />}
                  onClick={() => { deletePopUpStatus(!showDeletePopUp); changeDeleteItem(index) }}
                >delete
                </Button>
              </CardActions>

              <CardContent>
                <Typography sx={{ fontSize: 15, display: "flex", justifyContent: "flex-end", textTransform: "capitalize", fontWeight: 300, py: 0 }}>
                  {item.date.date} {item.date.month} {item.date.year}, {item.date.day}
                </Typography>
              </CardContent>
            </Card>
          )
        })
      }
      {
        showDeletePopUp && <DeletePopUp index={deleteItem} deletePopUpStatus={deletePopUpStatus} theme={notes.theme} />
      }
    </Paper>
  )
}

export default History;



function DeletePopUp({ index, deletePopUpStatus, theme }) {

  const dispatch = useDispatch();
  return (
    <div className={theme === "light" ? "delete-pop delete-pop-light" : "delete-pop delete-pop-dark"}
      onClick={(e) => { deletePopUpStatus(false); }}>
      <Card
        sx={
          {
            width: { xs: "95%", md: "90%", lg: "50%" },

            py: 5,

            boxShadow: 0,
            backgroundColor: theme === "light" ? "#F5F5F5" : "#111618",
            borderRadius: "20px",
            position: "relative",
            zIndex: "4"
          }
        }
        onClick={(e) => { e.stopPropagation() }}
      >
        <CardContent
          sx={
            {

              display: "grid",
              placeItems: "center"
            }
          }>
          <Typography
            sx={
              {
                color: theme === "light" ? "#292F36" : "#F4E3B2",
                textTransform: "uppercase",
                fontSize: { xs: 15, md: 20 },
                fontWeight: 600
              }
            }>
            This action will delete this item forever
          </Typography>
        </CardContent>
        <CardActions
          sx={
            {
              display: "flex",
              justifyContent: "center",
              alignItems: "center"

            }
          }
        >
          <Button
            onClick={() => { deletePopUpStatus(false); dispatch(deleteForever(index)) }}

            sx={
              {
                background: "red",
                  color: "black",
                px:2,
                py:1,
                
                fontWeight:700,
               
                ":hover": {
                  background:"#DE0D02"
                  
                }
              }
            }
            endIcon={<DeleteIcon />}
          >
            delete
          </Button>
          <Button
            onClick={() => { deletePopUpStatus(false); }}
            sx={
              {
                backgroundColor:"rgb(0, 231, 0)",
                color:"black",
                fontWeight:700,
                px:2,
                py:1,
                ":hover":{
                  backgroundColor:"rgb(2, 182, 2)"
                }
              }
            }
            endIcon={<BlockIcon/>}
          >
            cancel
          </Button>
        </CardActions>

      </Card>
    </div>
  )
}