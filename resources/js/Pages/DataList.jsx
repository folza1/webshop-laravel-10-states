import React from 'react';

function DataList({ data }) {
    return (
        <ul>
            {data.map((item) => (
                <li key={item.id}>
                    {item.name} - {item.age} years old
                </li>
            ))}
        </ul>
    );
}

export default DataList;
