export default class Country {
    private countries;
    constructor(allowedCountries?: string[], excludeCountries?: string[]);
    getCountries(filter?: string): string[][];
    getSelectedCountryCode(selectedIso: string): string;
    modifySearch(result: string, query: string): string;
    getPlaceholderFormat(country: string): string | undefined;
    formatUserInput(country: string, input: string): string;
    validatePhoneNumber(country: string, input: string): boolean;
}
