import { TbSearch } from 'react-icons/tb';
import styles from './styles.module.scss';
import { useRef } from 'react';

export default function InputSearch({ label, placeholder, value, onChange, onSubmit, onBlur, ...props }) {
    const inputRef = useRef(null);

    const withPreventDefaultGetValue = (callback) => {
        return (e) => {
            e.preventDefault();
            callback(inputRef.current.value);
        };
    };

    return (
        <>
            <label className={styles.container}>
                <h5>{label}</h5>
                <form className={styles.inputWrapper} onSubmit={withPreventDefaultGetValue(onSubmit)}>
                    <input
                        type='search'
                        placeholder={placeholder}
                        value={value}
                        ref={inputRef}
                        onChange={onChange}
                        onBlur={onBlur}
                        {...props}
                    />
                    <button className={styles.button}>
                        <TbSearch className={styles.icon} />
                    </button>
                </form>
            </label>
        </>
    );
}

InputSearch.defaultProps = {
    placeholder: '',
    onChange: null,
    onBlur: null,
};