import { CountryCode } from 'libphonenumber-js';

interface IPhoneNumber {
    name?: string;
    inputClassName?: string;
    buttonClassName?: string;
    containerClassName?: string;
    onInputChange?: (data: {
        phoneNumber: string;
        intlPhoneNumber: string;
        isValid: boolean;
    }) => void;
    allowedCountries?: CountryCode[];
    excludeCountries?: CountryCode[];
    searchPlaceholder?: string;
    disabled?: boolean;
    defaultCountry?: CountryCode;
}
export declare function PhoneInput({ name, onInputChange, buttonClassName, inputClassName, containerClassName, disabled, searchPlaceholder, allowedCountries, excludeCountries, defaultCountry, }: IPhoneNumber): import("react/jsx-runtime").JSX.Element;
export {};
