import FormCreate from "../../components/commons/Forms/FormCreate";
import React, {useEffect, useState} from "react";
import BandService from "../../services/band";
import KibonDonjakService from "../../services/kibon_donjak";
import KickService from "../../services/kick";
import PoomsaeService from "../../services/poomsae";
import BandForm from "../../components/Band/Form";

export default function CreateBand() {

    const [gub, setGub] = useState('');
    const [name, setName] = useState('');
    const [meaning, setMeaning] = useState('');
    const [theory, setTheory] = useState('');
    const [breakdown, setBreakdown] = useState('');
    const [stretching, setStretching] = useState('');
    const [kibonDonjaks, setKibonDonjaks] = useState([]);
    const [poomsaes, setPoomsaes] = useState([]);
    const [kicks, setKicks] = useState([]);
    
    const [preloadData, setPreloadData] = useState({});

    useEffect(() => {
        setPreloadData(JSON.parse(localStorage.getItem('Criar-Faixa')))
    }, [])

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

    const defaultInputs = async () => {
        setGub('')
        setName('');
        setMeaning('');
        setTheory('');
        setBreakdown('');
        setStretching('');
        setPoomsaes([])
        setKibonDonjaks([])
        setKicks([])
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
            <BandForm preloadPoomsaes={poomsaes} preloadGub={gub} preloadBreakdown={breakdown} preloadKibonDonjaks={kibonDonjaks} preloadKicks={kicks} preloadMeaning={meaning} preloadName={name} preloadStretching={stretching} preloadTheory={theory} setGub={setGub} setName={setName} setMeaning={setMeaning} setTheory={setTheory} setBreakdown={setBreakdown} setStretching={setStretching} setKibonDonjaks={setKibonDonjaks} setPoomsaes={setPoomsaes} setKicks={setKicks} KibonDonjakService={KibonDonjakService} PoomsaeService={PoomsaeService} KickService={KickService} preloadData={preloadData}/>
        </FormCreate>
    )
}