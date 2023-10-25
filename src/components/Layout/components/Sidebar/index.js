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
                <MenuItem title="GUIDE LINE" to={config.routes.guide} icon={<GuideIcon />} />
                <MenuItem title="Scan your Invoice" to={config.routes.medscan} icon={<MedScanIcon />} />
                <MenuItem title="Search Page" to={config.routes.search} icon={<MedScanIcon />} />
                <MenuItem title="Orther" to={config.routes.others} icon={<OtherIcon />} />
            </Menu>
        </aside>
    );
}

export default Sidebar;
