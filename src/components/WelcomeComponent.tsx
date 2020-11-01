import React, { SetStateAction, useState, Dispatch } from 'react';
import './WelcomeComponent.css';
import {Form, Input, Button} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';

interface P {
    setName: Dispatch<SetStateAction<string | undefined>>
}

export const WelcomeComponent = ({setName}: P) => {
    const [nameValue, setNameValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNameValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setName(nameValue);
    }

    return (
        <div className='welcome'>
            <h2> Hello friend, tell me your name... </h2>
            <Form onSubmitCapture={handleSubmit}>
                <Form.Item>
                    <Input value={nameValue} onChange={handleChange} placeholder='Your name here'></Input>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Let's go <ArrowRightOutlined /></Button>
                </Form.Item>
            </Form>
        </div>
    )
};