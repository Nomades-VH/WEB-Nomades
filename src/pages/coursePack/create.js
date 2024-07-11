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
    const [selectsKibons, setSelectsKibons] = useState([]);
    const [selectsKicks, setSelectsKicks] = useState([]);
    const [selectsPoomsaes, setSelectsPoomsaes] = useState([]);
    

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
            <BandForm selectsKibons={selectsKibons} setSelectsKibons={setSelectsKibons} setSelectsKicks={setSelectsKicks} setSelectsPoomsaes={setSelectsPoomsaes} selectsKicks={selectsKicks} selectsPoomsaes={selectsPoomsaes} gub={gub} name={name} meaning={meaning} theory={theory} breakdown={breakdown} stretching={stretching} kibonDonjaks={kibonDonjaks} poomsaes={poomsaes} kicks={kicks} setGub={setGub} setName={setName} setMeaning={setMeaning} setTheory={setTheory} setBreakdown={setBreakdown} setStretching={setStretching} setKibonDonjaks={setKibonDonjaks} setPoomsaes={setPoomsaes} setKicks={setKicks} KibonDonjakService={KibonDonjakService} PoomsaeService={PoomsaeService} KickService={KickService}/>
        </FormCreate>
    )
}