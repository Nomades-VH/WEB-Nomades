
import React, {useEffect, useState} from "react";
import CrudForm from "../CrudForm";


function FormCreate({children, data, titlePage, messageError, messageSuccess, serviceCreate, defaultInputs, redirectTo}) {
    return (
        <CrudForm 
            children={children} 
            data={data} 
            titlePage={titlePage} 
            messageError={messageError} 
            messageSuccess={messageSuccess} 
            crudService={serviceCreate} 
            defaultInputs={defaultInputs} 
            redirectTo={redirectTo} 
        />
    )
}

export default FormCreate;