import FormCreate from "../../components/commons/Forms/FormCreate";
import InputText from "../../components/commons/inputs/InputText";
import React, {useEffect, useState} from "react";
import BandService from "../../services/band";
import styles from "./styles.module.scss";
import Select from "../../components/commons/inputs/Select";
import Button from "../../components/commons/Button";
import KibonDonjakService from "../../services/kibon_donjak";
import KickService from "../../services/kick";
import PomsaeService from "../../services/poomsae";

export default function CreateBand() {

    const [gub, setGub] = useState('');
    const [name, setName] = useState('');
    const [meaning, setMeaning] = useState('');
    const [theory, setTheory] = useState('');
    const [breakdown, setBreakdown] = useState('');
    const [stretching, setStretching] = useState('');
    const [getKicks, setGetKicks] = useState([]);
    const [getKibonDonjaks, setGetKibonDonjaks] = useState([]);
    const [kibonDonjaks, setKibonDonjaks] = useState([]);
    const [poomsaes, setPoomsaes] = useState([]);
    const [kicks, setKicks] = useState([]);
    const [getPoomsaes, setGetPoomsaes] = useState([]);
    const [selectsKibons, setSelectsKibons] = useState([]);
    const [selectsKicks, setSelectsKicks] = useState([]);
    const [selectsPoomsaes, setSelectsPoomsaes] = useState([]);
    const [preloadData, setPreloadData] = useState({});

    const loadKibonDonjaks = async () => {
        try {
            const result = await KibonDonjakService.get();
            if (result) {
                setGetKibonDonjaks(result);
            } else {
                setGetKibonDonjaks([])
            }
        } catch (error) {
            setGetKibonDonjaks([])
        }
    }

    const loadKicks = async () => {
        try {
            const result = await KickService.get();
            if (result) {
                setGetKicks(result)
            } else {
                setGetKibonDonjaks([])
            }
        } catch (error) {
            setGetKicks([])
        }
    }

    const loadPomsaes = async () => {
        try {
            const result = await PomsaeService.get();
            if (result) {
                setGetPoomsaes(result)
            } else {
                setGetPoomsaes([])
            }
        } catch (error) {
            setGetPoomsaes([])
        }
    }

    useEffect(() => {
        loadKibonDonjaks();
        loadKicks();
        loadPomsaes()
        setPreloadData(JSON.parse(localStorage.getItem('Criar-Faixa')))
    }, []);

    useEffect(() => {
        if (preloadData) {
            const { gub, name, meaning, theory, breakdown, stretching, poomsaes, kicks, kibonDonjaks } = preloadData;
            setGub(gub);
            setName(name);
            setMeaning(meaning);
            setTheory(theory);
            setBreakdown(breakdown);
            setStretching(stretching);
            setPoomsaes(poomsaes);
            setKicks(kicks);
            setKibonDonjaks(kibonDonjaks);
        }
    }, [preloadData]);

    useEffect(() => {
        if (poomsaes && poomsaes.length > 0 && getPoomsaes && getPoomsaes.length > 0) {
            poomsaes.slice(1).forEach(poomsaeId => {
                console.log("ADICIONEI")
                addSelect(selectsPoomsaes, getPoomsaes, setSelectsPoomsaes, setPoomsaes, poomsaeId);
            });
        }
    }, []);


    const addSelect = (listSelects, items, setListSelects, onChangeItem, itemId = null) => {
        setListSelects(listSelects.concat(
            <div className={styles.label} key={listSelects.length}>
                <Select
                    onChange={(e) => onChangeItem(prevState => [...prevState, e.target.value])}
                    options={items?.map(item => ({
                        label: item.name,
                        value: item.id,
                        selected: itemId === item.id
                    }))}
                />
            </div>
        ))
    }

    const removeSelect = (selectsList, setSelectsList, itemsList, setItemsList) => {
        const newItemsList = itemsList.slice(0, -1)
        const newSelectsList = selectsList.slice(0, -1)
        setSelectsList(newSelectsList);
        setItemsList(newItemsList)
    };

    const defaultInputs = async () => {
        setGub('')
        setName('');
        setMeaning('');
        setTheory('');
        setBreakdown('');
        setStretching('');
        setSelectsPoomsaes([]);
        setSelectsKibons([]);
        setSelectsKicks([]);
    }

    return (
        <FormCreate data={{
            gub,
            name,
            meaning,
            theory,
            breakdown,
            stretching,
            poomsaes,
            kibonDonjaks,
            kicks
        }}
                    titlePage={"Criar Faixa"} messageSuccess={"Continuar criando faixa?"}
                    messageError={"Erro ao criar faixa."} serviceCreate={BandService.create}
                    defaultInputs={defaultInputs}
                    redirectTo={"/apostilas"}
        >
            <section className={styles.inputs}>
                <InputText
                    type="text"
                    placeholder="Gub (Somente número)"
                    required={true}
                    label={"Gub da Faixa"}
                    value={gub}
                    onChange={(e) => setGub(e.target.value)}
                />
                <InputText
                    type="text"
                    placeholder="Nome"
                    required={true}
                    label={"Nome da Faixa"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputText
                    type="text"
                    placeholder="Quebramento"
                    required={true}
                    label={"Quebramento da Faixa"}
                    value={breakdown}
                    onChange={(e) => setBreakdown(e.target.value)}
                />
            </section>
            <section className={styles.inputs}>
                <div className={styles.selects}>
                    <div className={styles.label}>
                        <Select label={"Poomsaes"} onChange={(e) => setPoomsaes([e.target.value])}
                                options={getPoomsaes?.map((poomsae) => ({
                                    label: poomsae.name,
                                    value: poomsae.id,
                                    selected: preloadData?.poomsaes ? poomsae.id === preloadData.poomsaes[0] : false
                                }))}>
                        </Select>
                    </div>
                    {selectsPoomsaes?.map((select) => (
                        select
                    ))}
                    <div className={styles.buttons}>
                        <Button type={'button'}
                                onClick={() => addSelect(selectsPoomsaes, getPoomsaes, setSelectsPoomsaes, setPoomsaes)}>Adicionar</Button>
                        <Button type={'button'} className={styles.remove}
                                onClick={() => removeSelect(selectsPoomsaes, setSelectsPoomsaes, poomsaes, setPoomsaes)}>Remover</Button>
                    </div>
                </div>

                <div className={styles.selects}>
                    <div className={styles.label}>
                        <Select label={"Kibon Donjaks"} onChange={(e) => setKibonDonjaks([e.target.value])}
                                options={getKibonDonjaks?.map((kibonDonjak) => ({
                                    label: kibonDonjak.name,
                                    value: kibonDonjak.id,
                                    selected: false
                                }))}></Select>
                    </div>
                    {
                        selectsKibons.map((select, index) => (
                            <div key={index} className={styles.selects}>
                                {select}
                            </div>
                        ))
                    }
                    <div className={styles.buttons}>
                        <Button type={'button'} onClick={() => {
                            addSelect(selectsKibons, getKibonDonjaks, setSelectsKibons, setKibonDonjaks)
                            console.log(kibonDonjaks)
                        }}>Adicionar</Button>
                        <Button type={'button'} className={styles.remove}
                                onClick={() => removeSelect(selectsKibons, setSelectsKibons, kibonDonjaks, setKibonDonjaks)}>Remover</Button>
                    </div>

                </div>
                <div className={styles.selects}>
                    <div className={styles.label}>
                        <Select label={"Chutes"} onChange={(e) => setKicks([e.target.value])}
                                options={getKicks?.map((kick) => ({
                                    label: kick.name,
                                    value: kick.id
                                }))}></Select>
                    </div>
                    {
                        selectsKicks.map((select, index) => (
                            <div key={index} className={styles.selects}>
                                {select}
                            </div>
                        ))
                    }
                    <div className={styles.buttons}>
                        <Button type={'button'}
                                onClick={() => addSelect(selectsKicks, getKicks, setSelectsKicks, setKicks)}>Adicionar</Button>
                        <Button type={'button'} className={styles.remove}
                                onClick={() => removeSelect(selectsKicks, setSelectsKicks, kicks, setKicks)}>Remover</Button>
                    </div>
                </div>
            </section>
            <section className={styles.containerTextArea}>
                <label>
                    <h5>Teoria</h5>
                    <textarea
                        rows={2}
                        placeholder="Descreva a Teoria da Faixa"
                        required={true}
                        value={theory}
                        onChange={(e) => setTheory(e.target.value)}
                    />
                </label>
                <label>
                    <h5>Significado</h5>
                    <textarea
                        rows={2}
                        placeholder="Qual o Significado da Faixa"
                        required={true}
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                    />
                </label>
                <label>
                    <h5>Flexibilidade</h5>
                    <textarea
                        rows={2}
                        placeholder="Quais os Movimentos de Flexibilidade"
                        required={true}
                        value={stretching}
                        onChange={(e) => setStretching(e.target.value)}
                    />
                </label>
            </section>
        </FormCreate>
    )
}