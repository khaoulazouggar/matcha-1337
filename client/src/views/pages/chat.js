import React  from 'react';
import "../../css/chat.css";
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';
import Profile from "../../photos/test.jpeg";
import Box from '@material-ui/core/Box';


const useStyles = makeStyles({
chat: {
    '& > *': {
        margin: '30px 0 0 17px',
      },
 },
 area:
 {
    width: '90%',
    marginLeft: '12px',
 },
 input: {
    borderRadius: '40px',
},
form: {
    flexBasis: '125%',
},
icon: {
    color: '#5961f9ad',
},
send:{
    background: '#B4B6CB',
    display: 'flex',
    flexBasis: '10%',
    borderRadius: '33px',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '15px',
    height: '52px',
    cursor: 'pointer',
},
border:{
    width: '100%',
    borderColor: '#e1e0e1',
    margin: '0',
},
});
function Chat (){
    function  handleClick () {
}
    const classes = useStyles();
    return(
        <div className="center-chat">
            <div className="chat">
                <div className="messages">
                    <div className="title">
                        <h3>Messages</h3>
                        <div className={classes.chat}>
                            <Badge badgeContent={20} color="error">
                            </Badge>
                        </div>
                    </div>
                    <div>
                        <h4>All Conversation</h4>
                    </div>
                    <div className="personal">
                    <Box borderBottom={1} className={classes.border} />
                        <div className="users_chat">
                            <div className="profile_img">
                                <img
                                alt=""
                                src={Profile}
                                />
                                <div>
                                    <h4>Rihana</h4>
                                    <p>Salam cava dad ...</p>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                    </div>
                <div className="conversation">
                    <h3>Conversation</h3>
                    <div className="conver">
                    </div>
                    <div>
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField
                                className={classes.area}
                                id="outlined-basic" 
                                label="Message"
                                multiline
                                rows={1}
                                variant="outlined" 
                                placeholder="Type your message"
                                InputProps={{
                                    className: classes.input
                                }}
                                />
                            </form>
                            <div className={classes.send}>
                                <SendIcon 
                                className={classes.icon}
                                onClick={handleClick}
                                />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Chat