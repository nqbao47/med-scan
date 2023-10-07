import { useEffect, useState } from 'react';
import { fetchMedicines } from '../../api/api';
import classNames from 'classnames/bind';
import style from './MedScan.module.scss';

const cx = classNames.bind(style);

function MedScan() {
    const [medicines, setMedicines] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        console.log('handleImageChange is actived');
    };

    const handleExtracted = () => {};

    return (
        <div>
            {/* Giao diện tải lên hình ảnh */}
            <h2>Tải lên hình ảnh</h2>
            <div className={cx('wrapper')}>
                <div className="left-extracted">
                    {imagePreview && (
                        <img className={cx('image-preview')} src={imagePreview} alt="Hình ảnh được chọn" />
                    )}
                </div>
                <div className="divider"></div> {/* Đường kẻ dọc */}
                <div className="right-extracted">
                    <p>Tên thuốc: Paracetamol</p>
                    <p>Chỉ định: Giảm đau</p>
                    <p>Vỉ: 10 viên</p>
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
            </div>
        </div>
    );
}

export default MedScan;
