import styles from "./styles.module.scss"

export default function Select({ label, options, value, onChange }) {
    return (
        <>
            <label className={styles.container}>
                {label}
                <div className={styles.inputWrapper}>
                    <select value={value} onChange={onChange}>
                        <option selected>Selecione a opção</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </label>
        </>

    )
}