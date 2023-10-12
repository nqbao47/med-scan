import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './MedScan.module.scss';
import { uploadImage } from '../../api/api';

const cx = classNames.bind(style);

function MedScan() {
    const [message, setMessage] = useState('');
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

    const handleExtracted = async () => {
        if (selectedImage) {
            try {
                // Gửi hình ảnh lên server và chờ phản hồi từ server cho responese
                const response = await uploadImage(selectedImage);

                // Xử lý dữ liệu trả về từ server (nếu cần)
                setMessage('Hình ảnh đã được xử lý thành công.');

                // Tiếp theo, bạn có thể thực hiện bất kỳ xử lý nào khác sau khi đã gửi hình ảnh lên server
            } catch (error) {
                setMessage('Lỗi khi gửi hình ảnh lên server: ' + error.message);
            }
        } else {
            setMessage('Vui lòng chọn một hình ảnh trước khi gửi lên server.');
        }
    };

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
