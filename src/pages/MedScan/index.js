import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './MedScan.module.scss';
import { uploadImage } from '../../api/api';

const cx = classNames.bind(style);

function MedScan() {
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [medicineNames, setMedicineNames] = useState([]);

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
        if (selectedImage) {
            try {
                // Gửi hình ảnh lên server và chờ phản hồi từ server
                const response = await uploadImage(selectedImage);
                const medicineInfo = response.medicine_info;

                if (Array.isArray(medicineInfo)) {
                    setMedicineNames(medicineInfo);
                    localStorage.setItem('medicineNames', JSON.stringify(medicineInfo));
                    setMessage('Done');
                } else {
                    setMessage('Không có thông tin thuốc được tìm thấy');
                }
            } catch (error) {
                setMessage('Lỗi khi gửi hình ảnh lên server: ' + error.message);
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
                        {medicineNames.map((medicineName, index) => (
                            <li key={index}>{medicineName.Medicine_Name}</li>
                        ))}
                    </ul>
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
                    <button onClick={handleExtracted}></button>
                </label>
                {message && <div>{message}</div>}
            </div>
        </div>
    );
}

export default MedScan;
