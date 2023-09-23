import React, { useMemo,useEffect } from 'react';

import styled from 'styled-components';
import { useChat } from '../context/ChatProvider';
import useChatActions from '../hooks/useChatActions';
import useDebounce from '../hooks/useDebounce';
import { Description } from '../styled/Description';
import { filteredSession, selectFilteredSession, selectFilteredSessionLoad } from '@/features/driveTest/filterSessionSlice.js';
import { useDispatch, useSelector  } from "react-redux";
 import {selectUser } from '@/features/auth';
 import userService from '@/services/user.service';
 import { formatDistanceToNow } from 'date-fns';

const now = new Date();


const RoomListContainer = styled.div`
    --space: 1em;
    --horizontal-space: 2vw;
    
    display: flex;
    flex-direction: column;
    width: 26%;
    height: 100%;
    padding-top: var(--vertical-padding);
    overflow: auto;
    border-top-left-radius: 45px;
    border-bottom-left-radius: 45px;
    background: var( --blue-gradient);
    color: #fff;
    
    & h3 {
        font-size: 1.2em;
        font-weight: 500;
        padding: 0.9em var(--horizontal-space);
    }

    @media (max-width: 820px) {
        position: absolute;
        opacity: ${ props => props.open ? '1' : '0'};
        pointer-events: ${ props => props.open ? 'null' : 'none'};
        right: 0;
        width: 100%;
        border-radius: 0;
        z-index: 1;
    }
`;

const RoomItem = styled.li`
    display: flex;
    gap: 1vw;
    width: 100%;
    flex: 1;
    padding: var(--space) var(--horizontal-space);
    list-style: none;
    background: ${ props => props.active ?  'var(--blue-active-color)' : 'transparent'};
    cursor: pointer;
    transition: all .05s;

    &:hover {
        background: var(--blue-active-color);
    }

    & img {
        height: 3vw;
        width: 3vw;
        border-radius: 20px;
        object-fit: cover;
    }

    & div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    & span {
        font-weight: 500;
        font-size: 0.8em;
    }
`;



const RoomList = ({ query, isNavOpen, setIsNavOpen }) => {
    const user= useSelector(selectUser);
  const dispatch = useDispatch();

  const filteredsessions= useSelector(selectFilteredSession);

  const filteredsessionsLoading= useSelector(selectFilteredSessionLoad);
useEffect(()=>{
  userService.getuserGroupNumber(user?.id).then(value=>{
          dispatch(filteredSession({group_id: value.data[0].groups__id, technician_id: null})).then((response) =>console.log("this is responding",response));
  
    });
},[]);  
const [roomsDt,setRoomsDt]=React.useState([]);
    useEffect(()=>{
        if (filteredsessions){
            let _=[]
        _=JSON.parse(JSON.stringify(filteredsessions))
        _.map((room)=>{
            room.name=room.technicien.username + " in "+room.title;
            room.description=room.dtTeam.name +', started since '+ formatDistanceToNow( new Date(room.startDate).getTime());
            room.src= 'https://assets.website-files.com/581c85345d7e0501760aa7db/5b17ab5cc6215ef0331908fd_Creative%20Ways%20to%20Build%20Community%20at%20Your%20Gym.jpg';
            if(room.avatar==""){
                room.src= 'http://localhost:8000'+"/static/default.jpg";
            }else{
            room.src= 'http://localhost:8000'+room.avatar.avatar;}
        })
        setRoomsDt(_);
        console.log("state",_);
    };
    },[filteredsessionsLoading])
    const debouncedSearch = useDebounce(query, 350);
    const { joinRoom } = useChatActions();
    const { currentRoom, setCurrentRoom, userName } = useChat();

    
    const filteredRooms = useMemo(() => {
        const filter = roomsDt.filter(room => {
            const includesCaseInsensitive  = {
                name: room.name.toLowerCase(),
                description: room.description.toLowerCase()
            };
    
            const { name, description } = includesCaseInsensitive;
    
            return name.includes(debouncedSearch.toLowerCase()) || description.includes(debouncedSearch.toLowerCase());
        });

        return filter;
    }, [debouncedSearch]);

    const handleRoomClick = (roomID) => {
        if(currentRoom?.id === roomID) {
            return;
        }
        const selectedRoom = roomsDt.find(room => room.id === roomID);
        setCurrentRoom(selectedRoom);
        console.log("ehehhehe",selectedRoom.id);
        joinRoom({ roomID, userName });

        setIsNavOpen(false);
    }
    

    return (
        <RoomListContainer open={ isNavOpen }>
            <h3>Rooms</h3>

            <ul>
                {  
                    filteredRooms.map(room=>{
                        const { id, name, src, description} = room;
                        return (
                        <RoomItem active={ currentRoom?.id === id } key={ id } onClick={ () => handleRoomClick(id) }>
                            <img alt='room-img' src={ src } />

                            <div>
                                <span>{ name }</span>
                                <Description color='rgba(254,254,254,0.5)' size='0.7em'>{ description }</Description>
                            </div>
                        </RoomItem>
                    );})}
                    {

                 
                }
            </ul>
        </RoomListContainer>
    );
};

export default RoomList;