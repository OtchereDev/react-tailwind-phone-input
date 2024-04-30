import * as react_jsx_runtime from 'react/jsx-runtime';
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
declare function PhoneInput({ name, onInputChange, buttonClassName, inputClassName, containerClassName, disabled, searchPlaceholder, allowedCountries, excludeCountries, defaultCountry, }: IPhoneNumber): react_jsx_runtime.JSX.Element;

declare namespace PhoneInput$1 {
  export { PhoneInput as default };
}

export { PhoneInput$1 as PhoneInput };
