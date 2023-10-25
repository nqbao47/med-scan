import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// import Button from '../../../Button';
import styles from './Header.module.scss';
import images from '../../../../assets/images';
import { Wrapper as PopperWrapper } from '../../../Popper';
import MedItem from '../../../MedItem';
import { searchMedicine } from '../../../../api/api';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // Thêm state để lưu trữ giá trị từ ô nhập liệu
    const tippyInstance = useRef(null); // Tham chiếu đến Tippy

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    const handleSearch = async () => {
        try {
            setSearchResult([]);
            openTippy();

            // Gọi hàm searchMedicine với giá trị từ ô nhập liệu (searchQuery)
            const responseText = await searchMedicine(searchQuery);

            // Giải quyết kết quả JSON thành một đối tượng JavaScript
            const response = JSON.parse(responseText);
            console.log(response);

            // Xử lý dữ liệu trả về từ server
            setSearchResult(response);
        } catch (error) {
            console.log('Lỗi khi tìm kiếm thuốc', error);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResult([]);
        closeTippy();
        console.log('handleClearSearch is actived');
    };

    // Hàm để mở Tippy
    const openTippy = () => {
        if (tippyInstance.current) {
            tippyInstance.current.show();
        }
    };

    // Hàm để đóng Tippy
    const closeTippy = () => {
        if (tippyInstance.current) {
            tippyInstance.current.hide();
        }
    };

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
                                {searchResult && Array.isArray(searchResult) && searchResult.length > 0 ? (
                                    searchResult
                                        .slice(0, 8)
                                        .map((result, index) => (
                                            <MedItem key={index} data={result} onClick={closeTippy} />
                                        ))
                                ) : (
                                    <p>No results found</p>
                                )}
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input
                            placeholder="Search your medicines"
                            spellCheck={false}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị searchQuery khi người dùng nhập
                        />
                        <button className={cx('clear')} onClick={handleClearSearch}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

                        <button onClick={handleSearch} className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Tippy>
                <div className={cx('actions')}>
                    <a href="https://www.facebook.com/kudoshinichi.shinichi.37/">Liên hệ</a>
                    <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSBmXHnmrqbkbCngBjhKSttPhVZFlBlnXqVHsTQWvrRpsBQPrrpTxmCCglzWxVpGtmCkGGjz">
                        Đóng góp
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
