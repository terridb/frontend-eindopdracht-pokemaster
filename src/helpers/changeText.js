import removeAccents from "remove-accents";

export function changeTextToSimple(text) {
    return removeAccents(text).toLowerCase();
}

export function capitalizeFirstLetter(text) {
    if (text === undefined) {
        return "Error";
    }
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

export function writeCleanText(text) {
    if (text === undefined) {
        return "Failed to load description";
    }
    return text
        .replaceAll("\f", " ")
        .split(".")
        .map(sentence => sentence.trim().charAt(0).toUpperCase() + sentence.trim().slice(1).toLowerCase())
        .join(". ");
}

export function decreaseUnit(value) {
    return (value / 10).toFixed(1);
}