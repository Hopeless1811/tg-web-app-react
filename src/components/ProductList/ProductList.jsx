import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', img: "https://sun9-87.userapi.com/impg/JKQEo5WosRHjSGdF2AzgpHQktMhLYMsKjDTBIg/pEvQoaha1NE.jpg?size=800x600&quality=96&sign=d0a5c4c79ac0f255a7df4c6d91d079d7&type=album",title: 'Постельное бельё', price: 5000, description: 'Более 15 цветов на разный вкус'},
    {id: '2', img: "https://sun9-68.userapi.com/impg/k87SE2y83CQbQ3kucjhSX3AcL31aZdUmm5mFKA/Qwd-kzarG8M.jpg?size=768x1024&quality=96&sign=76a549104f09bb5ba6d47f4a2831b23c&type=album",title: 'Халат банный', price: 12000, description: 'Очень быстро сохнет.'},
    {id: '3', img: "https://sun9-49.userapi.com/impg/0mlv-qEF2ZUYT1LtAMjjIjca6tIGO4tktpL_hA/pYX4g-VPILw.jpg?size=800x600&quality=96&sign=df10b092533a7332419a19ae4917ea0f&type=album",title: 'Полотенца', price: 5000, description: 'Хорошо пропускают воздух'}
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://91.105.198.171:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;