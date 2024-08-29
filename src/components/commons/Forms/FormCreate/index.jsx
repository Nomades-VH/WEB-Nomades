
import React, {useEffect, useState} from "react";
import CrudForm from "../CrudForm";


function FormCreate({children, data, titlePage, messageError, messageSuccess, serviceCreate, defaultInputs, redirectTo}) {
    return (
        <CrudForm 
            data={data} 
            titlePage={titlePage} 
            messageError={messageError} 
            messageSuccess={messageSuccess} 
            crudService={serviceCreate} 
            defaultInputs={defaultInputs} 
            redirectTo={redirectTo} 
        >{children}</CrudForm>
    )
}

export default FormCreate;