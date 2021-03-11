import React, {useState, useEffect} from 'react';
import "../../css/chat.css";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Box from '@material-ui/core/Box';
import axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import ScrollableFeed from 'react-scrollable-feed'
import Moment from 'react-moment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import  socketIOClient  from "socket.io-client";

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
    display: 'flex',
},
icon: {
    color: '#5961f9ad',
},
send:{
    display: 'flex',
    flexBasis: '10%',
    borderRadius: '33px',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '15px',
    marginLeft : '10px',
    height: '52px',
    cursor: 'pointer',
},
border:{
    width: '100%',
    borderColor: '#e1e0e1',
    margin: '0',
},
});
const URL = "http://localhost:3001";
const socket = socketIOClient(URL);
function Chat (){
    const history = useHistory();
    const classes = useStyles();
    const[to, setTo] = useState();
    const [msg, setMsg] = useState();
    const [me, setMe] = useState();
    const [chat, setChat] = useState();
    const [matched, setMatch] = useState();
    const [tousername, setTousername] = useState();
    const [profile, setProfile] = useState();
    const [classStatus, setclassStatus] = useState(0)
    const handleChange = (e) => setMsg(
		e.target.value,
    )
    function insetMsg(from, to) {
        document.getElementById('outlined-basic').value = '';
        if (msg?.trim() === '')
        {
            
        }
        else {
        const insertmsg = () => {
            axios.post('http://localhost:3001/insertmsg', {msgfrom : from, msgto : to, msgcontent: msg, msgtime : new Date(), to_username: tousername})
            .then((response) => {
                if (response.data.sendMsg === 'done')
                {
                    console.log('msg is done');
                    let newValue = {content: msg,
                        from: from,
                        msgtime: new Date(),
                        to: to,
                        vu: 0,
                        to_username: tousername,
                    }
                    let push = chat?.concat(newValue);
                    setChat(push);
                    setMsg('');
                    socket.emit('send_message', newValue);
                }
                else if (response.data.sendMsg === 'reload')
                {
                    window.location.href = "/chat";
                }
            });
        }
        setTimeout(insertmsg, 1000);
        return (
            clearTimeout()
        )
    }
    }
    function viewfreinds (){
        setclassStatus(0);
    }
    function getmsg (firstuser, lastuser, username, profilePic)
    {
        axios.post('http://localhost:3001/getmsg', {firstuser: firstuser, lastuser:lastuser})
        .then((response) => {
            if(response.data)
            {
                setChat(response.data);
                setTo(lastuser);
                setTousername(username);
                setclassStatus(1)
                setProfile(profilePic);
            }
            else if(response.data.status === false)
            {
                setTo(lastuser);
                setTousername(username);
            }
        });
    }
    useEffect(() => {
        const getInfos = () => {
            axios.get("http://localhost:3001/getData", { headers: { "x-auth-token": localStorage.getItem("token") } }).then((res) => {
                if (res.data === "U failed to authenticate" || res.data === "we need a token") {
                    localStorage.removeItem("token");
                    history.push("/login");
                } else {
                        setMe(res.data[0]?.id)
                    }
                });
            
            axios.get("http://localhost:3001/getmatcheduser", { headers: { "x-auth-token": localStorage.getItem("token") } }).then((res) => {
                if (res.data === "U failed to authenticate" || res.data === "we need a token") {
                    localStorage.removeItem("token");
                    history.push("/login");
                } else {
                    setMatch(res.data);
              }
            }); 
        }
        setTimeout(getInfos, 500);
        return (
            clearTimeout()
        )
    }
    // eslint-disable-next-line
    , []);
    
    socket.on('new_message', function(data){
        if (data?.to === me && data?.from === to)
        {
            setChat(chat?.concat(data));
        }
        else
        {
        }
    });
    const lasTtime = chat?.[chat?.length - 1];
    return(
        <div className="center-chat">
            <div className="chat">
                <div className={`messages ${(classStatus === 1) ? 'inactive' : 'active'}`}>
                    <div className="title">
                        <h3><Link to='/chat'>Messages</Link></h3>
                        <div className={classes.chat}>
                        </div>
                    </div>
                    <div>
                        <h4>All Conversation</h4>
                    </div>
                    <div className="personal">
                    {
                        matched?.map((listmatched, index) => (
                            <div key={index}>
                                <Box borderBottom={1} className={classes.border} />
                                <div className="users_chat" id={listmatched.id} onClick={() => getmsg(me, listmatched.id, listmatched.username, listmatched.profilePic)}>
                                    <div className="profile_img">
                                        <img
                                        alt=""
                                        src={"http://localhost:3001/images/" + listmatched?.profilePic}
                                        />
                                        <div>
                                             <h4>{listmatched.firstname} {listmatched.lastname}</h4>
                                             <p>@{listmatched.username}</p>
                                            {listmatched.id === to  && lasTtime?.content.length > 0 ? 
                                            <div className="lastseen">
                                                <h3 className={lasTtime?.vu === 1 ? 'lastmg' : ''}>{me === lasTtime?.from ? 'You : ' : ''}{lasTtime?.content.length < 7 ? lasTtime?.content : lasTtime?.content.substr(0,7) + '...'}</h3>
                                                    <Moment className='lastmg' fromNow>{lasTtime?.msgtime}</Moment>
                                            </div>
                                            :
                                            ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                            <Box borderBottom={1} className={classes.border} />
                    </div>
                    </div>
                <div className={`conversation ${(classStatus === 1) ? 'active' : 'inactive'}`}>
                    {tousername != null ?
                    <div className="chatDiv">
                        <ArrowBackIcon className="backbutton" onClick={() => viewfreinds()}></ArrowBackIcon>
                        <img
                        className="chatprofileImg"
                        alt=''
                        src={"http://localhost:3001/images/" + profile}
                        />
                    <h3><Link className='username' to={`/profile/${tousername}`}>@{tousername}</Link></h3>
                    </div> : ''
                    }
                    <div className="conver">
                        <ScrollableFeed className="te">
                            {
                            chat?.map((chatmsg, index) => (
                                <div className={chatmsg?.from === me ? 'me' : '' } key={index}>
                                {
                                    (chatmsg?.from === me)  ?  <div ><p>{chatmsg?.content}</p></div> :
                                    <div className="you">
                                        <img
                                            alt=""
                                            src={"http://localhost:3001/images/" + profile}
                                        />
                                        <div><p>{chatmsg?.content}</p></div>
                                    </div>
                                }
                                </div>
                            ))}
                        </ScrollableFeed>
                    </div>
                    {to != null ?
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
                                 <div className={classes.send}
                                onClick={() => insetMsg(me, to)}
                                    >
                                <FontAwesomeIcon 
                                icon={faPaperPlane}
                                size="2x"
                                className={classes.icon}
                                />
                                </div>
                            </form>
                    </div> : ''
                    }
                </div>
            </div>
        </div>
    );
}
export default Chat