import { useEffect, useState } from "react";
import InputText from "../../commons/inputs/InputText"
import Select from "../../commons/inputs/Select"
import styles from "./styles.module.scss"
import FormEdit from "../../commons/Forms/FormEdit";

export default function BandForm({band, id, BandService}) {
    const [gub, setGub] = useState('');
    const [name, setName] = useState('');
    const [meaning, setMeaning] = useState('');
    const [theory, setTheory] = useState('');
    const [breakdown, setBreakdown] = useState('');
    const [stretching, setStretching] = useState('');
    const [kibonDonjaks, setKibonDonjaks] = useState([]);
    const [poomsaes, setPoomsaes] = useState([]);
    const [kicks, setKicks] = useState([]);

    const loadBand = (band) => {
        setGub(band.gub);
        setName(band.name);
        setMeaning(band.meaning);
        setTheory(band.theory);
        setBreakdown(band.breakdown);
        setStretching(band.stretching);
        setPoomsaes(band.poomsaes?.map((poomsae) => poomsae.id));
        setKicks(band.kicks?.map((kick) => kick.id))
        setKibonDonjaks(band.kibon_donjaks?.map((kibonDonjak) => kibonDonjak.id))
    }

    useEffect(() => {
        if (!band) {
            BandService.get_by_id(id).then((response) => {
                loadBand(response)
            })
        } else {
            loadBand(band)
        }
    }, [id])

    const defaultInputs = async () => {
        setGub('')
        setName('');
        setMeaning('');
        setTheory('');
        setBreakdown('');
        setStretching('');
        setKibonDonjaks([]);
        setPoomsaes([]);
        setKicks([]);
    }
    
    return (
        <FormEdit data={{
            id,
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
                    titlePage={"Editar Faixa"} messageSuccess={"Faixa editada com sucesso"}
                    messageError={"Erro ao editar faixa."} serviceEdit={BandService.update}
                    defaultInputs={defaultInputs}
                    redirectTo={"/apostilas"}
        >
            <label>
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
                        <div className={styles.divSelects}>
                            <Select label={"Poomsaes"} 
                            defaultValue={poomsaes}
                            onChange={(e) => {
                                const listPoomsaes = [];
                                e?.map((poomsae) => {
                                    listPoomsaes.push(poomsae.value)
                                })
                                setPoomsaes(listPoomsaes)
                            }}
                                    options={poomsaes?.map((poomsae) => ({
                                        label: poomsae.name,
                                        value: poomsae.id
                                    }))}>
                            </Select>
                        </div>

                    <div className={styles.divSelects}>
                            <Select label={"Kibon Donjaks"}
                            defaultValue={kibonDonjaks}
                            onChange={(e) => {
                                const listKibonDonjaks = [];
                                e?.map((kibonDonjak) => {
                                    listKibonDonjaks.push(kibonDonjak.value)
                                })
                                setKibonDonjaks(listKibonDonjaks)
                            }}
                                    options={kibonDonjaks?.map((kibonDonjak) => ({
                                        label: kibonDonjak.name,
                                        value: kibonDonjak.id
                                    }))} />
                    </div>
                    <div className={styles.divSelects}>
                            <Select label={"Chutes"} 
                            defaultValue={kicks}
                            onChange={(e) => {
                                const listKicks = [];
                                e?.map((kick) => {
                                    listKicks.push(kick.value)
                                })
                                setKicks(listKicks)
                            }}
                                    options={kicks?.map((kick) => ({
                                        label: kick.name,
                                        value: kick.id
                                    }))} />
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
            </label>
        </FormEdit>
    )
}