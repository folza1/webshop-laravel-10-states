import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Welcome from '@/Pages/Welcome.jsx';

export default function Smartphones({ auth, smartphones }) {
    const [sortType, setSortType] = useState('');

    const handleSort = (type) => {
        setSortType(type);
    };

    const sortedSmartphones = [...smartphones].sort((a, b) => {
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
                <title>Smartphones</title>
            </Head>
            <div>
                <button onClick={() => handleSort('abc')}>ABC szerint</button>
                <button onClick={() => handleSort('abcReverse')}>ABC vissza</button>
                <button onClick={() => handleSort('priceAsc')}>Ár szerint növekvő</button>
                <button onClick={() => handleSort('priceDesc')}>Ár szerint csökkenő</button>
            </div>
            {sortedSmartphones.map((item, index) => (
                <div key={index}>{item.title}//{item.price}$</div>
            ))}
        </Welcome>
    );
}

