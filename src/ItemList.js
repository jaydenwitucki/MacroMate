import React from 'react';
import DummyItems from './DummyItems';

const ItemList = () => {
    return (
        <div>
            <h2>Item List</h2>
            {DummyItems.map(item => (
                <Item key={item.id} title={item.title} description={item.description} imageUrl={item.imageUrl} />
            ))}
        </div>
    );
};

const Item = ({ title, description, imageUrl }) => (
    <div className="item">
        <img src={imageUrl} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);

export default ItemList;
