import {GenderFemale, GenderMale} from "@phosphor-icons/react";

export function getIdFromUrl(url) {
    const sentences = url.split("/");
    return sentences[sentences.length - 2];
}

export function makeWeaknessArray(typeOne, typeTwo) {
    const typeOneWeaknesses = typeOne?.damage_relations?.double_damage_from.map(type => type.name) || [];
    const typeTwoWeaknesses = typeTwo?.damage_relations?.double_damage_from.map(type => type.name) || [];

    const typeOneResistances = typeOne?.damage_relations?.half_damage_from.map(type => type.name) || [];
    const typeTwoResistances = typeTwo?.damage_relations?.half_damage_from.map(type => type.name) || [];

    const typeOneImmunities = typeOne?.damage_relations?.no_damage_from.map(type => type.name) || [];
    const typeTwoImmunities = typeTwo?.damage_relations?.no_damage_from.map(type => type.name) || [];

    const allWeaknesses = [...new Set([...typeOneWeaknesses, ...typeTwoWeaknesses])];
    return allWeaknesses.filter(type =>
        !typeOneResistances.includes(type) &&
        !typeTwoResistances.includes(type) &&
        !typeOneImmunities.includes(type) &&
        !typeTwoImmunities.includes(type)
    );
}

export function getGenderIcons(genderValue) {
    if (genderValue === 0) return <GenderMale size={30} color={"#5E5E5E"}/>;
    if (genderValue === 8) return <GenderFemale size={30} color={"#5E5E5E"}/>;
    if (genderValue === -1) return <p>Genderless</p>;
    if (genderValue > 0 && genderValue < 8) {
        return (
            <>
                <GenderFemale size={30} color={"#5E5E5E"}/>
                <GenderMale size={30} color={"#5E5E5E"}/>
            </>
        );
    }
}

export function decreaseUnit(value) {
    return (value/10).toFixed(1);
}
