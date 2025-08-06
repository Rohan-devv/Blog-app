import { createContext, useState } from "react";


export const GlobalContext = createContext(null);

const [formData, setFormData] = useState({
    title: '',
    description: '',
});

export default function GlobalState({ children }) {
    return (
        <GlobalContext.Provider value={{ formData, setFormData }}>
            {children}</GlobalContext.Provider>
    );
}