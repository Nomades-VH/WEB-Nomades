import styles from "./styles.module.scss"
import ReactSelect from 'react-select'
import makeAnimated from 'react-select/animated'

export default function Select({ label, options, onChange, placeholder='Selecione a opção', defaultValue, isUnique=false}) {
    const animatedComponents = makeAnimated();
    
    const selectStyles = {
        multiValueContainer: (base) => ({
          ...base,
          display: 'flex',
          overflowX: 'auto',
          flexWrap: 'nowrap',
          height: '100%',
        }),
        multiValue: (base) => ({
            ...base,
            width: "100%"
          }),
        multiValueRemove: (base) => ({
            width: '20px',
            alignSelf: 'center'
        }),
        valueContainer: (base) => ({
          ...base,
          display: 'flex',
          overflowY: 'auto',
          overflowX: 'auto',
          fontSize: '10px',
          width: 'auto',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }),
        indicatorsContainer: (base) => ({
            ...base,
            display: 'flex',
            flexDirection: 'row'
        })
    }

    return (
        <>
            <label className={styles.container}>
                <h5>{label}</h5>
                <ReactSelect
                    defaultInputValue={defaultValue}
                    value={defaultValue}
                    onChange={onChange}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti={!isUnique}
                    options={options}
                    placeholder={placeholder}
                    noOptionsMessage={() => "Nenhuma opção disponível"} 
                    styles={selectStyles}

                />
            </label>
        </>

    )
}