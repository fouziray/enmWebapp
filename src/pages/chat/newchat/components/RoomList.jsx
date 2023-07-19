import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useChat } from '../context/ChatProvider';
import useChatActions from '../hooks/useChatActions';
import useDebounce from '../hooks/useDebounce';
import { Description } from '../styled/Description';

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


// Static rooms in the chat
const rooms = [
    {
        id: 1,
        name: 'Dog Lovers 🐶',
        src: 'https://www.willmarlakesarea.com/wp-content/uploads/2019/11/December-Blog-Dog-Friendly-Community-dog-park.jpg',
        description: 'A community for dog lovers to share information, photos, experiences, and support each other.'
    },

    {
        id: 2,
        name: 'Developers 💻',
        src: 'https://www.redlasso.com/wp-content/uploads/2020/03/Visual-Studio-Code-Vs-Community.jpg',
        description: 'Community for developers, we help each other.'
    },
    
    {
        id: 3,
        name: 'Foodies 🍕',
        src: 'https://miro.medium.com/max/1400/0*PjchgA6hmUjQcF6g.png',
        description: 'A community of people who have a passion for food and love to explore new culinary experiences.'
    },

    {
        id: 4,
        name: 'Bookworms 📚',
        src: 'https://bookwormreads.co/og_img.png',
        description: 'Those who love to read and immerse themselves in books, and often discuss and share their favorite stories with others'
    },

    {
        id: 5,
        name: 'Movie Buffs 🎬',
        src: 'https://www.parkgrandkensington.co.uk/blog/wp-content/uploads/2019/10/watching-cinema-1280x720.jpg',
        description: 'A group of individuals who love to engage in outdoor activities such as hiking, camping, and rock climbing'
    },

    {
        id: 6,
        name: 'DIYers 🙌',
        src: 'https://d9e8c7w7.stackpathcdn.com/wp-content/uploads/2020/04/DIY-During-Lockdown.jpg',
        description: ' People who like to take on home improvement and craft projects, and enjoy working with their hands to create something new and unique'
    },

    {
        id: 7,
        name: 'Fitness Enthusiasts 💪🏽',
        src: 'https://assets.website-files.com/581c85345d7e0501760aa7db/5b17ab5cc6215ef0331908fd_Creative%20Ways%20to%20Build%20Community%20at%20Your%20Gym.jpg',
        description: 'Individuals who have a love for films and enjoy watching and discussing different genres, styles, and storylines.'
    }
];

const RoomList = ({ query, isNavOpen, setIsNavOpen }) => {
    const debouncedSearch = useDebounce(query, 350);
    const { joinRoom } = useChatActions();
    const { currentRoom, setCurrentRoom, userName } = useChat();


    const filteredRooms = useMemo(() => {
        const filter = rooms.filter(room => {
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

        const selectedRoom = rooms.find(room => room.id === roomID);
        setCurrentRoom(selectedRoom);

        joinRoom({ roomID, userName });

        setIsNavOpen(false);
    }
    

    return (
        <RoomListContainer open={ isNavOpen }>
            <h3>Rooms</h3>

            <ul>
                {   
                    
                    filteredRooms.map(room => {
                        const { id, name, src, description} = room;

                        return (
                            <RoomItem active={ currentRoom?.id === id } key={ id } onClick={ () => handleRoomClick(id) }>
                                <img alt='room-img' src={ src } />

                                <div>
                                    <span>{ name }</span>
                                    <Description color='rgba(254,254,254,0.5)' size='0.7em'>{ description }</Description>
                                </div>
                            </RoomItem>
                        );
                    })
                }
            </ul>
        </RoomListContainer>
    );
};

export default RoomList;