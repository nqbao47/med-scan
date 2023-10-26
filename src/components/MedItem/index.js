import classNames from 'classnames/bind';
import styles from './MedItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MedItem({ data, onClick }) {
    const { id, name } = data; // Lấy trường name từ obj data

    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <Link to={`/search/${id}`}>{name}</Link>
                </h4>
            </div>
        </div>
    );
}

export default MedItem;
