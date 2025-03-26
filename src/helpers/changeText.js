import removeAccents from "remove-accents"

export function changeTextToSimple(text) {
    return removeAccents(text).toLowerCase()
}

export function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export function writePokedexNumber(number) {
    if (number < 10) {
        return "000" + number;
    } else if (number < 100) {
        return "00" + number;
    } else if (number < 1000) {
        return "0" + number;
    } else {
        return number;
    }
}