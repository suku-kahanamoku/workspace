/**
 * odpovídá českému telefonnímu číslu v národním či mezinárodním formátu (tj. s předvolbou +420);
 * předpokládá, že bude devíticiferné číslo napsáno bez mezer nebo bude mezera následovat vždy
 * po skupině tří číslic (tj. jediný správný zápis devíticiferného telefonního čísla);
 * devíticifernému číslu může (ale nemusí) předcházet +420
 * napr. (+420)123456789 nebo (+420) 123 456 789
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_CZECH_PHONE_NUMBER(value: string): boolean {
    return /^(\+420|00420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/.test(value);
}

/**
 * telefonní číslo se musí skládat ze sekvence minimálně devíti znaků,
 * kterými smějí být číslice 0–9, kulaté závorky, lomítko, tečka, pomlčka a mezera;
 * této sekvenci může (ale nemusí) předcházet znak +
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_PHONE_NUMBER(value: string): boolean {
    return /^[+]?[()/0-9. -]{9,}$/.test(value);
}
