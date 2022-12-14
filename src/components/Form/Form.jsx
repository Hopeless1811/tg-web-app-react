import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [name,setName] = useState('');
    const [number,setNumber] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            name,
            number
        }
        tg.sendData(JSON.stringify(data));
    },[name,number])

    useEffect(() => {
        tg.onEvent('mainButtonClicked',onSendData)
        return () => {
            tg.offEvent('mainButtonClicked',onSendData)
        }
    },[onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text:'Отправить данные'
        })
    })

    useEffect(() => {
        if(!name || !number){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
    },[name,number])

    const onChangeName = (e) =>{
        setName(e.target.value);
    }

    const onChangeNumber = (e) =>{
        setNumber(e.target.value);
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder="Имя"
                value={name}
                onChange={onChangeName}
            />
            <input
                className={'input'}
                type="text"
                placeholder="Номер"
                value={number}
                onChange={onChangeNumber}
            />
        </div>
    );
};

export default Form;