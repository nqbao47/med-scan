import { useEffect, useState } from 'react';
import { fetchGuidedLine } from '../../api/api';

function Guide() {
    const [guideds, setGuideds] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await fetchGuidedLine();
            setGuideds(result);
        } catch (error) {
            console.log('Lỗi fetching data từ Backend', error);
        }
    };

    return (
        <div>
            <h2>Chào mừng bạn!</h2>
            {guideds.map((guided, index) => (
                <div key={index}>
                    <h3>{guided.title}</h3>
                    <p>{guided.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Guide;
