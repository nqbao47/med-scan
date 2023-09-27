import classNames from 'classnames/bind';
import styles from './MedItem.module.scss';

const cx = classNames.bind(styles);

function MedItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://www.dhgpharma.com.vn/images/stories/virtuemart/product/Hapacol%20650.png"
                alt="hapacol"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Hapacol</span>
                </h4>
                <span className={cx('mandates')}>Giảm đau</span>
            </div>
        </div>
    );
}

export default MedItem;
