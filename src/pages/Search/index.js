import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMedicineDetails } from '../../api/api'; // Import API function

import style from './Search.module.scss';

const cx = classNames.bind(style);

function Search() {
    const { id } = useParams(); // Lấy tham số truyền từ đường dẫn (tên thuốc)

    const [medicineDetails, setMedicineDetails] = useState([]);
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

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

    useEffect(() => {
        const handleScroll = () => {
            // Kiểm tra vị trí cuộn của trang và hiển thị/ẩn nút tương ứng
            if (window.scrollY > 200) {
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        };

        // Lắng nghe sự kiện cuộn trang
        window.addEventListener('scroll', handleScroll);

        // Cleanup effect
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        // Cuộn trang về đầu
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            {showScrollTopButton && (
                <button onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                    Quay lại đầu trang
                </button>
            )}
            <br></br>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>THÔNG TIN THUỐC</h2>
            {medicineDetails ? (
                <div>
                    <h2 style={{ color: 'green', textAlign: 'center' }}>{medicineDetails.name}</h2>
                    <div dangerouslySetInnerHTML={createMarkup(medicineDetails.longDescription)} />
                </div>
            ) : (
                <p>Không tìm thấy thông tin cho ID "{id}"</p>
            )}
        </div>
    );
}

export default Search;
