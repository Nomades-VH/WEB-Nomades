import React, {useEffect, useState} from "react";
import BandService from "../../../services/band";
import KibonDonjakService from "../../../services/kibon_donjak";
import KickService from "../../../services/kick";
import PoomsaeService from "../../../services/poomsae";
import BandForm from "../../../components/Band/Form";
import FormEdit from "../../../components/commons/Forms/FormEdit";
import { useLocation, useParams } from "react-router-dom";

export default function EditBand() {
    const {id} = useParams();
    const location = useLocation();
    const [band, setBand] = useState(location.state?.band || null)

    return (
        <BandForm band={band} setBand={setBand} id={id} BandService={BandService} />
    )
}