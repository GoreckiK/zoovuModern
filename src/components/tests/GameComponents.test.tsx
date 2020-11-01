import * as React from 'react';
import { mount } from "enzyme";
import { GameComponent, HeaderComponent, DropCardComponent } from "../GameComponent";
import { CardComponent } from '../CardsAreaComponent';

describe('GameComponents', () => {
    describe('#GameComponent', () => {
        it('should render HeaderComponent', () => {
            const component = mount(<GameComponent name='Krzysiek'/>)
            
            const headerComponent = component.find(HeaderComponent);
    
            expect(headerComponent).toBeTruthy();
        });
    })

    describe('#CardComponent', () => {
        it('should start counter on drag start', () => {
            const setCounterInProgress = jest.fn();
            const component = mount(<CardComponent
                imgSrc=''
                cardID=''
                setCounterInProgress={setCounterInProgress}
                counter={0}
                imgIndex={0}
            />)
            
            component.simulate('dragStart', {dataTransfer: {setData: jest.fn()}})
    
            expect(setCounterInProgress).toBeCalled();
        });
        
        it('should set data to data transfer', () => {
            const setCounterInProgress = jest.fn();
            const setData = jest.fn();
            const component = mount(<CardComponent
                imgSrc=''
                cardID='cardID'
                setCounterInProgress={setCounterInProgress}
                counter={0}
                imgIndex={0}
            />)
            const dataToTransfer = JSON.stringify({draggedCardID: 'cardID', cardImgIndex: 0})
    
            component.simulate('dragStart', {dataTransfer: {setData: setData}})
    
            expect(setData).toBeCalledWith('card', dataToTransfer);
        });
    })
    
    describe('#DropCardComponent', () => {
        it('should setCorrectPlacementMap', () => {
            const setCorrectPlacementMap = jest.fn();
            const component = mount(<DropCardComponent
                imgIndex={0}
                setCounter={jest.fn()}
                setCorrectPlacementMap={setCorrectPlacementMap}
            />);

            component.simulate('drop', {
                dataTransfer: {
                    getData: () => '{"draggedCardID":"cardID","cardImgIndex":0}'
                },
                target: {
                    appendChild: jest.fn()
                }
            })

            expect(setCorrectPlacementMap).toBeCalled();
        });
        
        it('should increase counter by 10 when indexes do not met', () => {
            const setCounter = jest.fn();
            const component = mount(<DropCardComponent
                imgIndex={0}
                setCounter={setCounter}
                setCorrectPlacementMap={jest.fn()}
            />);

            component.simulate('drop', {
                dataTransfer: {
                    getData: () => '{"draggedCardID":"cardID","cardImgIndex":3}'
                },
                target: {
                    appendChild: jest.fn()
                }
            })

            expect(setCounter).toBeCalled();
        });
    })
});