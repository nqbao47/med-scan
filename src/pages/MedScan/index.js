import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './MedScan.module.scss';
import { extractMedicines } from '../../api/api';

const cx = classNames.bind(style);

function MedScan() {
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [medicineNames, setMedicineNames] = useState([]);
    // New state variable for loading
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedImagePreview = localStorage.getItem('imagePreview');
        const savedMedicineNames = JSON.parse(localStorage.getItem('medicineNames'));

        if (savedImagePreview) {
            setImagePreview(savedImagePreview);
        }

        if (savedMedicineNames) {
            setMedicineNames(savedMedicineNames);
        }
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                localStorage.setItem('imagePreview', reader.result);
            };
            reader.readAsDataURL(file);
        }
        console.log('handleImageChange is actived');
    };

    const handleExtracted = async () => {
        setMessage('');

        if (selectedImage) {
            try {
                // Set loading to true when starting the API call
                setLoading(true);

                // Gửi hình ảnh lên server và chờ phản hồi từ server
                const response = await extractMedicines(selectedImage);

                // Kiểm tra xem phản hồi có thuộc tính labeled_texts hay không
                if (response && response.labeled_texts) {
                    const medicineInfo = response.labeled_texts;

                    if (Array.isArray(medicineInfo)) {
                        setMedicineNames(medicineInfo);
                        localStorage.setItem('medicineNames', JSON.stringify(medicineInfo));
                        setMessage('Done');
                    } else {
                        setMessage('Không có thông tin thuốc được tìm thấy');
                    }
                } else {
                    setMessage('Dữ liệu phản hồi không hợp lệ');
                }
            } catch (error) {
                setMessage('Lỗi khi gửi hình ảnh lên server: ' + error.message);
            } finally {
                // Set loading to false when the API call completes (whether success or error)
                setLoading(false);
            }
        } else {
            setMessage('Vui lòng chọn một hình ảnh trước khi gửi lên server.');
        }
    };

    return (
        <div>
            <br></br>
            {/* Giao diện tải lên hình ảnh */}
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>TẢI LÊN HOÁ ĐƠN CỦA BẠN TẠI ĐÂY </h2>
            <div className={cx('wrapper')}>
                <div className="left-extracted">
                    {imagePreview && (
                        <img className={cx('image-preview')} src={imagePreview} alt="Hình ảnh được chọn" />
                    )}
                </div>
                <div className="divider"></div> {/* Đường kẻ dọc */}
                {/* Hiển thị medicineName */}
                <div className={cx('right-extracted')}>
                    <ul>
                        {medicineNames
                            .filter((item) => item.label === 'medicine_name')
                            .map((medicineName, index) => {
                                // Assuming the text format is consistent
                                const regexResult = /(\d+\/)?\s*([\w\s]+)\s*\(([\w\s\d?]+)([^)]+)\)/.exec(
                                    medicineName.text,
                                );

                                if (regexResult) {
                                    // Extracted information
                                    // const number = regexResult[1] || ''; // e.g., "191/" or ""
                                    const medicine = regexResult[2]; // e.g., "Clopidogrel"
                                    const details = regexResult[3]; // e.g., "RIDLOR 75mg 1991"

                                    return (
                                        <li key={index}>
                                            <p>
                                                <a href="#">
                                                    {medicine} ({details})
                                                </a>
                                            </p>
                                        </li>
                                    );
                                } else {
                                    // Display the original text if the format doesn't match the expected pattern
                                    return (
                                        <li key={index}>
                                            <p>{medicineName.text}</p>
                                        </li>
                                    );
                                }
                            })}
                    </ul>
                    {/* <ul>
                        {medicineNames
                            .filter((item) => item.label === 'medicine_name')
                            .map((medicineName, index) => (
                                <p key={index}>
                                    <p>{medicineName.text}</p>
                                </p>
                            ))}
                    </ul> */}
                </div>
            </div>

            {/* Thao tác tải lên hình ảnh */}
            <div className={cx('action')}>
                <label className={cx('custom-input')}>
                    Tải ảnh
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </label>
                <label className={cx('extract-button')}>
                    Trích xuất hoá đơn
                    {/* Disable the button when loading */}
                    <button onClick={handleExtracted} disabled={loading}>
                        {/* Show spinner if loading */}
                    </button>
                </label>
                {loading ? <div style={{ margin: '10px' }} className={cx('spinner')}></div> : null}
                {/* Display the message */}
                {message && <div>{message}</div>}
            </div>
        </div>
    );
}

export default MedScan;
