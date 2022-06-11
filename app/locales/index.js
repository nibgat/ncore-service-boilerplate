import tr from "./variants/tr.json";
import en from "./variants/en.json";

const locales = {
    en,
    tr
};

const localize = lang => {
    return locales[lang];
};

export const localizeWithParams = (key, lang, params) => {
    let returnString = locales[lang][key];
    params.forEach((item, index) => {
        const pattern = `\\$\\{${index}\\}`;
        const regex = new RegExp(pattern, "g");
        returnString = returnString.replace(regex, item);
    });
    return returnString;
};

export default localize;
