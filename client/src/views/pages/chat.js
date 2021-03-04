import React, {useState, useEffect} from 'react';
import "../../css/chat.css";
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';
import Profile from "../../photos/test.jpeg";
import Box from '@material-ui/core/Box';
import axios from 'axios';


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
    const classes = useStyles();
    const [msg, setMsg] = useState();
    const [chat, setChat] = useState();
    const handleChange = (e) => setMsg(
		e.target.value
    )
    function insetMsg(from, to) {
        axios.post('http://localhost:3001/insertmsg', {msgfrom : from, msgto : to, msgcontent: msg})
        .then((response) => {
            if (response.data.sendMsg === 'done')
            {
                console.log('msg is done');
            }
            else
            {
                console.log(response.data.err);
            }
        });
    }
    useEffect(() => {
            axios.get("http://localhost:3001/getmsg", { headers: { "x-auth-token": localStorage.getItem("token") } }).then((res) => {
            if (res.data === "U failed to authenticate" || res.data === "we need a token") {
                localStorage.removeItem("token");
            } else {
                setChat(res.data);
      }
    });
    }, []);
    console.log(chat);
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
                    {
                            chat?.map(chatmsg => (
                                <>
                                {
                                    (chatmsg.from === 101)  ?  <div className="me"><p>{chatmsg.content}</p></div> :
                                    <div className="you">
                                        <img
                                            alt=""
                                            src={Profile}
                                        />
                                        <div><p>{chatmsg.content}</p></div>
                                    </div>
                                }
                            </>
                        ))}
                    </div>
                    <div>
                            <form className={classes.form} noValidate autoComplete="off">
                                <TextField
                                className={classes.area}
                                id="outlined-basic" 
                                label="Message"
                                onChange={handleChange}
                                multiline
                                rows={1}
                                variant="outlined"
                                placeholder="Type your message"
                                InputProps={{
                                    className: classes.input
                                }}
                                />
                            </form>
                            <div className={classes.send}
                                onClick={() => insetMsg(101, 180)}
                            >
                                <SendIcon 
                                className={classes.icon}
                                />
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Chat