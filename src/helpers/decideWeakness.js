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