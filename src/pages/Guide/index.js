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
            <br></br>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
                TẠI SAO BẠN NÊN SỬ DỤNG HỆ THỐNG TRÍCH XUẤT HOÁ ĐƠN ?
            </h2>
            {guideds.map((guided, index) => (
                <div key={index}>
                    <h3>{guided.title}</h3>
                    <p>{guided.description}</p>
                    <br></br>
                </div>
            ))}
        </div>
    );
}

export default Guide;
