import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '../../../../config';
import Menu, { MenuItem } from './Menu';
import { GuideIcon, MedScanIcon, OtherIcon } from '../../../Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Hướng dẫn" to={config.routes.guide} icon={<GuideIcon />} />
                <MenuItem title="Quét hoá đơn thuốc" to={config.routes.medscan} icon={<MedScanIcon />} />
                <MenuItem title="Khác" to={config.routes.others} icon={<OtherIcon />} />
            </Menu>
        </aside>
    );
}

export default Sidebar;
