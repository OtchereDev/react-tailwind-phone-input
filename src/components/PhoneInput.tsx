import { useState } from "react";
import Country from "../utils/countries";
import { LazySvg } from "./LazySvg";
import { CountryCode } from "libphonenumber-js";

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

export default function PhoneInput({
  name,
  onInputChange,
  buttonClassName,
  inputClassName,
  containerClassName,
  disabled,
  searchPlaceholder,
  allowedCountries,
  excludeCountries,
  defaultCountry,
}: IPhoneNumber) {
  const [isOpen, setIsOpen] = useState(false);

  const countries = new Country(allowedCountries ?? [], excludeCountries ?? []);
  const [search, setSearch] = useState("");
  const [selectedIso2, setSelectedIso2] = useState(defaultCountry ?? "ca");
  const [phone, setPhone] = useState("");

  const toggleOpen = () => {
    setIsOpen((iso) => !iso);
  };

  return (
    <div className="w-full max-w-[400px] relative">
      <div
        className={`border rounded-lg group items-center gap-2 focus-within:ring-2 ${
          countries.validatePhoneNumber(selectedIso2, phone)
            ? "focus-within:ring-blue-600"
            : "focus-within:ring-red-600"
        } overflow-hidden flex ${containerClassName}`}
      >
        <button
          onClick={toggleOpen}
          disabled={disabled}
          className={`flex py-3 px-2 border-r gap-1 ${buttonClassName}`}
        >
          <LazySvg name={selectedIso2} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M11.47 4.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1-1.06 1.06L12 6.31 8.78 9.53a.75.75 0 0 1-1.06-1.06l3.75-3.75Zm-3.75 9.75a.75.75 0 0 1 1.06 0L12 17.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0l-3.75-3.75a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex-1 flex items-center gap-2">
          <p className="text-gray-500">
            +{countries.getSelectedCountryCode(selectedIso2)}
          </p>
          <input
            placeholder={countries.getPlaceholderFormat(selectedIso2)}
            type="text"
            className={`flex-1 outline-none  py-3 pr-4 ${inputClassName}`}
            value={phone}
            onChange={(e) => {
              const result = countries.formatUserInput(
                selectedIso2,
                e.target.value
              );
              setPhone(result);

              if (onInputChange) {
                onInputChange({
                  phoneNumber: result,
                  intlPhoneNumber: `+${countries.getSelectedCountryCode(
                    selectedIso2
                  )}${result}`,
                  isValid: countries.validatePhoneNumber(selectedIso2, phone),
                });
              }
            }}
            onFocus={() => {
              setIsOpen(false);
            }}
            name={name}
            disabled={disabled}
          />
        </div>
      </div>
      {isOpen && (
        <div className="absolute max-h-[200px] z-20 flex flex-col overflow-hidden w-full bg-white border top-full left-0 mt-2 rounded-lg">
          <div className="flex py-3 px-4 gap-3 border-b items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              placeholder={searchPlaceholder ?? "Search for Country"}
              type="text"
              className="flex-1 outline-none text-gray-900"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="no-scrollbar overflow-scroll flex-1">
            {countries.getCountries(search).map((country) => (
              <div
                key={country[1]}
                className=" flex py-3 px-4 gap-3  items-center cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setSelectedIso2(country[1]);
                  setSearch("");
                  toggleOpen();
                }}
              >
                <LazySvg name={country[1]} />

                <p
                  className="text-lg"
                  dangerouslySetInnerHTML={{
                    __html: countries.modifySearch(
                      `${country[0]} (+${country[2]})`,
                      search
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
