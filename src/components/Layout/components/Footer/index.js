import styles from './footer.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-bottom')}>
                <p>Dự án trích xuất hoá đơn thuốc tự động "MED-SCAN"</p>
                <p class="mb-0">Địa chỉ: Trường CNTT & TT, Đại học Cần Thơ</p>
                <p class="mt-0">Điện thoại: 0869 617 630. Email:baob1910618@student.ctu.edu.vn</p>
            </div>
        </div>
    );
}

export default Footer;
