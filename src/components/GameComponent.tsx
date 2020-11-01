import React, {useState, useEffect, useMemo} from 'react';
import './GameComponent.css';
import z from '../media/zoovu-z.svg';
import o from '../media/zoovu-o.svg';
import v from '../media/zoovu-v.svg';
import u from '../media/zoovu-u.svg';
import { CardsAreaComponent } from './CardsAreaComponent';
import { ClockCircleOutlined } from '@ant-design/icons';

interface PGameComponent {
    name: string
}

export interface ICardProps {
    imgSrc: string,
    imgIndex: number
}

interface ICorrectPlacement {
    [key: number]: boolean
}

export const GameComponent = ({name}: PGameComponent) => {
    const [gameCards] = useState<ICardProps[]>([
        {imgSrc: z, imgIndex: 0},
        {imgSrc: o, imgIndex: 1},
        {imgSrc: o, imgIndex: 2},
        {imgSrc: v, imgIndex: 3},
        {imgSrc: u, imgIndex: 4}
    ]);
    const [counter, setCounter] = useState<number>(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
    const [counterInProgress, setCounterInProgress] = useState(false);
    const [newGame, setNewGame] = useState(false);
    const [correctPlacementMap, setCorrectPlacementMap] = useState<ICorrectPlacement>({})

    useEffect(() => {
        if (counterInProgress) {
            const intervalId = setInterval(() => {
                setCounter((prevState) => prevState + 1);
            }, 1000);
            setIntervalId(intervalId);
        } 
        if (!counterInProgress && intervalId) clearInterval(intervalId);
    }, [counterInProgress]);

    useEffect(() => {
        if (newGame === true) {
            setCounter(0);
            const dragZoneNode = document.getElementById('drag-zone');
            document.getElementById('drop-zone')?.childNodes.forEach(child => {
                child.lastChild && dragZoneNode?.appendChild(child.lastChild)
            });
            setCorrectPlacementMap({})
            setNewGame(false);
        }
    }, [newGame])

    const shuffleCardsCallback = useMemo(() => {
        const cards = [...gameCards];
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }, [gameCards])

    return (
        <div className='game'>
            <HeaderComponent name={name} time={counter}/>
            <CardsAreaComponent
                cards={shuffleCardsCallback} 
                setCounterInProgress={setCounterInProgress}
                counter={counter}
                correctPlacementLength={Object.values(correctPlacementMap).length}
                setNewGame={setNewGame}
            />
            <h3>... and drop them to make the logo great again!</h3>
            <div className='drop-zone' id='drop-zone'>
                {gameCards.map((card, index) => 
                    <DropCardComponent 
                        imgIndex={card.imgIndex} 
                        key={`drop-${card.imgIndex}-${index}`} 
                        setCounter={setCounter}
                        setCorrectPlacementMap={setCorrectPlacementMap}
                    />
                )}
            </div>
        </div>
    )
}

interface IHeaderProps {
    name: string,
    time: number
}

export const HeaderComponent = ({name, time}: IHeaderProps) => {
    return (
        <div className='header'>
            <div className='header-side left'>
                <h2>Good luck, {name}</h2>
                <h3>Pick up the right cards</h3>
            </div>
            <div className='header-side right'>
                <h2><ClockCircleOutlined style={{color: '#34eb83'}}/> Your score: {time} seconds</h2>
                <h3>The faster the better!</h3>
            </div>
        </div>
    )
}

interface IDropCard {
    imgIndex: number,
    setCounter: React.Dispatch<React.SetStateAction<number>>,
    setCorrectPlacementMap: React.Dispatch<React.SetStateAction<ICorrectPlacement>>
}

export const DropCardComponent = ({imgIndex, setCounter, setCorrectPlacementMap}: IDropCard) => {
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const {draggedCardID, cardImgIndex} = JSON.parse(e.dataTransfer.getData('card'));
        if (cardImgIndex === imgIndex || cardImgIndex === 1 && imgIndex === 2 || cardImgIndex === 2 && imgIndex === 1) {
            setCorrectPlacementMap(prevState => {
                if (prevState[cardImgIndex]) {
                    return {...prevState}
                } else {
                    const stateCopy = {...prevState};
                    stateCopy[cardImgIndex] = true;
                    return stateCopy;
                }
            });
            (e.target as any).appendChild(document.getElementById(draggedCardID))
        } else {
            setCounter((prevState: number) => prevState + 10);
            (e.target as any).appendChild(document.getElementById(draggedCardID))
        }
    };

    const cardStyle = {
        width: '205px',
        height: '205px',
        borderRadius: '5%',
        border: '1px dashed blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px'
    };

    return (
        <div 
            style={cardStyle} 
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
        />
    )
}