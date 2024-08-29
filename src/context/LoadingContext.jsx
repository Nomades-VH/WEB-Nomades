import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const LoadingContext = createContext();

// Provedor de contexto
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);