/**
 * Rozhrani definujici jake atributy by mel mit formField objekt
 *
 * @export
 * @interface IFormField
 */
export interface IFormField {

    /**
     * Nazev
     *
     * @type {string}
     * @memberof IFormField
     */
    name: string;

    /**
     * Typ (text, textarea, select, radio, ...)
     *
     * @type {string}
     * @memberof IFormField
     */
    type: string;

    /**
     * Label
     *
     * @type {string}
     * @memberof IFormField
     */
    label: string;

    /**
     * Placeholder
     *
     * @type {string}
     * @memberof IFormField
     */
    placeholder: string;

    /**
     * Povinny
     *
     * @type {boolean}
     * @memberof IFormField
     */
    required: boolean;

    /**
     * Poradi
     *
     * @type {string}
     * @memberof IFormField
     */
    position: string;

    /**
     * Maximalni pocet pismen
     *
     * @type {number}
     * @memberof IFormField
     */
    maxlength?: number;

    /**
     * Minimalni pocet pismen
     *
     * @type {number}
     * @memberof IFormField
     */
    minlength?: number;

    /**
     * Maximalni pocet cisel
     * Pro number field
     *
     * @type {number}
     * @memberof IFormField
     */
    max?: number;

    /**
     * Minimalni pocet cisel
     * Pro number field
     *
     * @type {number}
     * @memberof IFormField
     */
    min?: number;

    /**
     * Defaultni hodnota
     *
     * @type {*}
     * @memberof IFormField
     */
    value?: any;

    /**
     * Validace
     *
     * @type {*}
     * @memberof IFormField
     */
    validation?: any;

    /**
     * Priznak zda hodnoty budou v poli
     *
     * @type {boolean}
     * @memberof IFormField
     */
    multiple?: boolean;

    /**
     * Disabled
     *
     * @type {boolean}
     * @memberof IFormField
     */
    disabled?: boolean;

    /**
     * Readonly
     *
     * @type {boolean}
     * @memberof IFormField
     */
    readonly?: boolean;

    /**
     * Ignorovane fieldy se neodesilaji na backend
     *
     * @type {boolean}
     * @memberof IFormField
     */
    ignore?: boolean;

    /**
     * Google naseptavac
     *
     * @type {*}
     * @memberof IFormField
     */
    autocomplete?: any;

    /**
     * Seznam listu (<option></option>)
     * Pro select, search, radio fieldy
     *
     * @type {any[]}
     * @memberof IFormField
     */
    options?: any[];

    /**
     * Vybrany option
     *
     * @type {*}
     * @memberof IFormField
     */
    option: any;

    /**
     * Zpusob jakym se bude nacitat option (<option></option>)
     * Pro select, search, radio fieldy
     *
     * @type {*}
     * @memberof IFormField
     */
    restOptions?: any;

    /**
     * Zpusob, jakym se bude dynamicky upravovat jine fieldy na zaklade nastaveni
     *
     * @type {any[]}
     * @memberof IFormField
     */
    definition?: any[];

    /**
     * Cela cesta stromem vcetne nazvu
     *
     * @type {string}
     * @memberof IFormField
     */
    path?: string;

    /**
     * Nebude zobrazovat v selectu prazdny option
     *
     * @type {boolean}
     * @memberof IFormField
     */
    emptyHidden: boolean;

    minDate: string;
    maxDate: string;
}

/**
 * Interface pro definition field
 * Definition field upravuje jine fieldy na zaklade nastaveni
 *
 * @export
 * @interface IDefinitionField
 */
export interface IDefinitionField {

    /**
     * Hodnota pro match
     * napr. 18
     *
     * @type {(string | string[])}
     * @memberof IDefinitionField
     */
    value: string | string[];

    /**
     * Operation pro match
     * napr. $gte
     *
     * @type {string}
     * @memberof IDefinitionField
     */
    operation: string;

    /**
     * Setter meni hodnoty, atributy, ... zadanych fieldu
     *
     * @type {ISetter}
     * @memberof IDefinitionField
     */
    set?: ISetter;

    /**
     * Remover maze hodnoty, atributy, ... ze zadanych fieldu
     *
     * @type {ISetter}
     * @memberof IDefinitionField
     */
    remove?: ISetter;

    /**
     * Loader meni endpointy zadanych fieldu
     *
     * @type {ISetter}
     * @memberof IDefinitionField
     */
    reload?: ISetter;

    /**
     * Adder pridava, resp. klonuje cilovy field do zadane skupiny
     *
     * @type {ISetter}
     * @memberof IDefinitionField
     */
    add?: ISetter;
}

/**
 * Setter interface
 * Rika, co bude upraveno, v jakou hodnotu
 *
 * @export
 * @interface ISetter
 */
export interface ISetter {

    /**
     * Co se bude menit, upravovat
     * napr. type, value, ...
     *
     * @type {string}
     * @memberof ISetter
     */
    type?: string;

    /**
     * V jakou hodnotu se bude menit
     * napr. 18, ${formControl.value}, ...
     *
     * @type {*}
     * @memberof ISetter
     */
    value?: any;
}
