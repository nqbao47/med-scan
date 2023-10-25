import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMedicineDetails } from '../../api/api'; // Import API function

function Search() {
    const { id } = useParams(); // Lấy tham số truyền từ đường dẫn (tên thuốc)

    const [medicineDetails, setMedicineDetails] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Gọi API tìm kiếm
                const response = await getMedicineDetails(id);

                // Xử lý dữ liệu trả về từ API
                setMedicineDetails(response);
                console.log(response);
            } catch (error) {
                console.log('Lỗi khi tìm kiếm thuốc', error);
            }
        }

        fetchData();
    }, [id]);

    // Hàm để parse chuỗi HTML thành JSX
    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
        <div>
            <h1>Thông tin thuốc:</h1>
            {medicineDetails ? (
                <div>
                    <h2>{medicineDetails.name}</h2>
                    <div dangerouslySetInnerHTML={createMarkup(medicineDetails.longDescription)} />
                </div>
            ) : (
                <p>Không tìm thấy thông tin cho ID "{id}"</p>
            )}
        </div>
    );
}

export default Search;
