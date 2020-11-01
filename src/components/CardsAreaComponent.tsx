import { ICardProps } from "./GameComponent";
import React, { useState, useRef, useEffect } from "react";
import './CardsAreaComponent.css';

interface P {
    cards: ICardProps[],
    setCounterInProgress: React.Dispatch<React.SetStateAction<boolean>>,
    counter: number,
    correctPlacementLength: number,
    setNewGame: React.Dispatch<React.SetStateAction<boolean>>
}

export const CardsAreaComponent = ({cards, setCounterInProgress, counter, correctPlacementLength, setNewGame}: P) => {
    const cardsAreaRef = useRef<HTMLDivElement>(null);
    const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (cardsAreaRef.current?.childElementCount === 0 && correctPlacementLength === 5) {
            setCounterInProgress(false);
            setShouldShowModal(true);

            setTimeout(() => {
                setNewGame(true);
                setShouldShowModal(false);
            }, 10000);
        }
    }, [cardsAreaRef.current?.childElementCount, correctPlacementLength])

    return (
        <div className='top-zone'>
            <div className='card-zone' ref={cardsAreaRef} id='drag-zone'>
                {cards.map((card, index) => <CardComponent 
                    key={`drag-${card.imgIndex}-${index}`} 
                    cardID={`drag-${card.imgIndex}-${index}`} 
                    imgSrc={card.imgSrc} 
                    imgIndex={card.imgIndex}
                    setCounterInProgress={setCounterInProgress}
                    counter={counter}
                    />
                )}
            </div>
            {shouldShowModal && <ModalComponent counter={counter}/>} 
        </div>
        
    );
}

interface ICardComponentProps extends ICardProps{
    setCounterInProgress: React.Dispatch<React.SetStateAction<boolean>>,
    cardID: string,
    imgIndex: number,
    counter: number
}

export const CardComponent = ({imgSrc, setCounterInProgress, cardID, imgIndex, counter}: ICardComponentProps) => {
    const cardStyle = {
        width: '200px',
        height: '200px',
        borderRadius: '5%',
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        marginRight: '10px'
    };
    
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        if (counter === 0) {
            setCounterInProgress(true);
        }
        const dataToTransfer = {draggedCardID: cardID, cardImgIndex: imgIndex}
        e.dataTransfer.setData('card', JSON.stringify(dataToTransfer))
    };

    return (
        <div
            id={cardID}
            style={cardStyle}
            draggable={true}
            onDragStart={handleDragStart}
        />
    )
}

const ModalComponent = ({counter}: {counter: number}) => {
    return (
        <div className='summary-modal'>
            Your score is: {counter} seconds
        </div>
    )
};