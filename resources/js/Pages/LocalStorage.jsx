import { useState, useEffect } from 'react';
import DataList from "@/Pages/DataList.jsx";

// Custom hook létrehozása a LocalStorage kezelésére
function useLocalStorage(key, initialValue) {
    const [state, setState] = useState(() => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default function ExampleComponent() {
    const [data, setData] = useLocalStorage('myData', []);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newData = {
            id: Date.now(),
            name: formData.name,
            age: formData.age,
        };

        setData((prevData) => [...prevData, newData]);

        setFormData({
            name: '',
            age: '',
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
                <button type="submit">Add Data</button>
            </form>
            <DataList data={data} />
        </div>
    );
}
