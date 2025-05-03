import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from "crypto-js";

export const base_url = 'https://api.macrotech.com.ng/api/v1';

export const showSuccessMessage = (message) => {
    toast.success(message);
    return null
}

export const showErrorMessage = (message) => {
    toast.error(message);
    return null
}

export const retrieveFromLocalStorage = (keys) => {
    const data = {};
    keys.forEach((key) => {
        const persistedState = localStorage.getItem(key);
        if (persistedState) {
        try {
            const bytes = CryptoJS.AES.decrypt(persistedState, APP_SECRET_KEY);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            data[key] = persistedState ? JSON.parse(decryptedData) : null;
            if (typeof data[key] === "string") {
                data[key] = JSON.parse(data[key]);
            }
        } catch (error) {
            console.error(`Error parsing JSON for key "${key}":`, error);
            data[key] = null;
        }
    }
    else {
        data[key] = null;
    }
    });
    return data;
}


export const APP_SECRET_KEY = "cl1930474849@#@$@@^@^"