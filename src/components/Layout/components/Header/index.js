import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../Button';
import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { Wrapper as PopperWrapper } from '../../../Popper';
import MedItem from '../../../MedItem';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="med-scan"></img>
                </div>
                <Tippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Loại Thuốc:</h4>
                                <MedItem />
                                <MedItem />
                                <MedItem />
                                <MedItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search your medicines" spellCheck={false} />
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('actions')}>
                    <a>Sharing</a>
                    <a>Contact</a>
                    <a>More</a>
                </div>
            </div>
        </header>
    );
}

export default Header;
