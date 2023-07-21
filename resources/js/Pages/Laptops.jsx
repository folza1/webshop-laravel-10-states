import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Welcome from '@/Pages/Welcome.jsx';

export default function Laptops({ auth, laptops }) {
    const [sortType, setSortType] = useState('');

    const handleSort = (type) => {
        setSortType(type);
    };

    const sortedLaptops = [...laptops].sort((a, b) => {
        switch (sortType) {
            case 'abc':
                return a.title.localeCompare(b.title);
            case 'abcReverse':
                return b.title.localeCompare(a.title);
            case 'priceAsc':
                return a.price - b.price;
            case 'priceDesc':
                return b.price - a.price;
            default:
                return 0;
        }
    });

    return (
        <Welcome auth={auth} children2={<><h1>AAAA</h1></>}>
            <Head>
                <title>Laptops</title>
            </Head>
            <div>
                <button onClick={() => handleSort('abc')}>ABC szerint</button>
                <button onClick={() => handleSort('abcReverse')}>ABC vissza</button>
                <button onClick={() => handleSort('priceAsc')}>Ár szerint növekvő</button>
                <button onClick={() => handleSort('priceDesc')}>Ár szerint csökkenő</button>
            </div>
            {sortedLaptops.map((item, index) => (
                <div key={index}>{item.title}//{item.price}$</div>
            ))}
        </Welcome>
    );
}

