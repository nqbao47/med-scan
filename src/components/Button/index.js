import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, onClick, children }) {
    let Comp = 'Button'; //Comp = Component

    const classes = cx('wrapper');

    return (
        <Comp classNames={classes}>
            <span>{children}</span>
        </Comp>
    );
}

export default Button;

/* 
 to: truyen link noi bo
 href: truyen link ben ngoai
 onClick: xu ly xu kien
*/
