import React from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, Paper, Typography } from '@mui/material'
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import { remove, markAsDone, markAsUnDone } from "../store/noteSlice";
import { DeleteOutline } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';


const Note = ({ notes, index, theme }) => {
  
    const selector = useSelector(state => state.notes)
    const dispatch = useDispatch()

    function handleDone(index) {
        if (notes.done) {
            dispatch(markAsUnDone(index))
        }
        else {
            dispatch(markAsDone(index))
        }
    }
    return (
        <AnimatePresence>
            <Card variant='outlined' sx={
                {
                    minHeight: "100px",
                    position: "relative",
                    backgroundColor: theme === "light" ? "#E5E7F0" : "#1E1E1F",
                   

                }
            }
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 1, delay: `0.${index}` } }}

                key={index}
            >
                <CardHeader title={notes.title}
                    sx={
                        {
                            textTransform: "uppercase",
                            opacity: notes.done ? "0.2" : "1",
                            textDecoration: notes.done ? "line-through" : "",
                            

                        }
                    }
                    titleTypographyProps={{
                        fontSize:{xs:19,md:20,lg:23},
                        fontWeight:600,
                        // border:"2px solid red",
                        width:"77%"
                      }}
                    >

                </CardHeader>
                <CardContent

                >
                    <Typography
                        sx={
                            {
                                opacity: notes.done ? "0.2" : "1",
                                textDecoration: notes.done ? "line-through" : "",
                                fontWeight: 400,
                                textTransform: "capitalize",
                                fontSize:{xs:18,md:19,lg:19}
                            }
                        }>
                        {notes.taskName}
                    </Typography>
                    <Typography
                        sx={
                            {
                                paddingTop: "10px",
                                fontSize:14,
                                textTransform:"capitalize",
                                color:theme==="light"?"":"#F2BB05",
                                
                            }
                        }>
                        {notes.date.date} {notes.date.month} {notes.date.year}, {notes.date.day}
                    </Typography>
                </CardContent>

                {/* card actions */}


                <CardActions>

                    <FormControlLabel
                        sx={
                            {
                                position: "absolute",
                                top: "10px",
                                right: "-5px",

                                textTransform: "capitalize",



                            }
                        }
                        control={
                            <Checkbox
                                defaultChecked={false}
                                checked={notes.done ? true : false}
                                onClick={() => handleDone(index)}
                                sx={{
                                    '& .MuiSvgIcon-root': { fontSize: 25 },
                                    color: theme === "light" ? "#715AFF" : "#F5C529",
                                    '&.Mui-checked': {
                                        color: theme === "light" ? "#715AFF" : "#F5C529",
                                    },
                                }}
                            />
                        }

                    />

                </CardActions>
                <CardActions sx={{ display: "flex", justifyContent: "flex-end",paddingBlock:"10px" }}>
                    <Button
                        sx={
                            {
                                backgroundColor: theme === "light" ? "#715AFF" : "#F5C529",
                                color: theme === "light" ? "ghostwhite" : "black",
                                borderRadius: "5px",
                                paddingInline:"15px",
                                ":hover": {
                                    backgroundColor: "red"
                                }
                            }
                        }
                        onClick={() => dispatch(remove(index))}
                        endIcon={<DeleteOutline />}
                    >delete</Button>

                </CardActions>


                <div className={notes.isNew?"new-label":"old-label"} >
                    {notes.isNew?"new":"old"}
                </div>        
            </Card>
        </AnimatePresence>

    )

}

export default Note