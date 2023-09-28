import React, {createContext, useContext, useState} from 'react';

export const FormContext = createContext();

export function useFormContext() {
    return useContext(FormContext);
}

export function FormProvider({children}) {
    const [formData, setFormData] = useState({});

    const updateFormData = (newData) =>  {
        setFormData({...formData, ...newData})
    }

    return <FormContext.Provider value={[formData, updateFormData]}>
        {children}
    </FormContext.Provider>
}

