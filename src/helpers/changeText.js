import removeAccents from "remove-accents"

export function changeTextToSimple(text){
    return removeAccents(text).toLowerCase()
}