import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
    const [typingTimeout, setTypingTimeout] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 0);
    }, []);

    const handleSearch = async () => {
        try {
            setSearchResult([]);

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
        console.log('handleClearSearch is actived');
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchQuery(inputValue);

        // Clear trước khi đặt timeout mới (người dùng đang tiếp tục nhập)
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Đặt timeout mới để gọi API sau 2 giây kể từ lần cuối cùng người dùng nhập
        const newTimeout = setTimeout(() => {
            handleSearch();
        }, 1000);

        setTypingTimeout(newTimeout);
    };

    const handlePaste = (e) => {
        // Xóa timeout hiện tại (nếu có) khi người dùng paste
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Đặt timeout mới để gọi API sau 2 giây kể từ lần cuối cùng người dùng paste
        const newTimeout = setTimeout(() => {
            handleSearch();
        }, 2000);

        setTypingTimeout(newTimeout);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img style={{ marginLeft: '15px' }} src={images.logo} alt="med-scan"></img>
                </div>
                <Tippy
                    interactive
                    visible={searchResult.length > 0}
                    onClickOutside={() => {
                        // This function will be called when a click occurs outside the Tippy content
                        setSearchResult([]); // Close the Tippy by clearing the search results
                    }}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Loại Thuốc:</h4>
                                {searchResult && Array.isArray(searchResult) && searchResult.length > 0 ? (
                                    searchResult
                                        .slice(0, 8)
                                        .map((result, index) => <MedItem key={index} data={result} />)
                                ) : (
                                    <p>No results found</p>
                                )}
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input
                            placeholder="Nhập tên thuốc bạn cần tìm..."
                            spellCheck={false}
                            value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật giá trị searchQuery khi người dùng nhập
                            onChange={handleInputChange}
                            onPaste={handlePaste}
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
                    <a className={cx('link')} href="https://www.facebook.com/kudoshinichi.shinichi.37/">
                        Liên hệ
                    </a>
                    <a
                        className={cx('link')}
                        href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSBmXHnmrqbkbCngBjhKSttPhVZFlBlnXqVHsTQWvrRpsBQPrrpTxmCCglzWxVpGtmCkGGjz"
                    >
                        Đóng góp
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
