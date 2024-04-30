import parsePhoneNumber, {
  CountryCode,
  getExampleNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import { AsYouType } from "libphonenumber-js";

import data from "./data";

export default class Country {
  private countries = data;

  constructor(allowedCountries?: string[], excludeCountries?: string[]) {
    if (allowedCountries?.length) {
      this.countries = data.filter((country) =>
        allowedCountries.includes((country[2] as string)?.toUpperCase())
      );
    }

    if (excludeCountries?.length) {
      this.countries = data.filter(
        (country) =>
          !excludeCountries.includes((country[2] as string)?.toUpperCase())
      );
    }
  }

  getCountries(filter?: string): string[][] {
    return (this.countries as string[][])
      .filter((country) =>
        (country[0].toLowerCase() as string).includes(
          filter?.length ? filter?.toLowerCase() : country[0].toLowerCase()
        )
      )
      .map((country) => [country[0], country[2], country[3]]);
  }

  getSelectedCountryCode(selectedIso: string): string {
    return (
      (this.countries.find(
        (country) => (country[2] as string) == selectedIso
      )?.[3] as string) ?? ""
    );
  }

  modifySearch(result: string, query: string) {
    var re = new RegExp(
      query
        .split("")
        .map(function (x) {
          return x.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        })
        .join("[-\\s.]*"),
      "ig"
    );
    return result.replace(re, "<b>$&</b>");
  }

  getPlaceholderFormat(country: string) {
    const value = getExampleNumber(
      country.toUpperCase() as CountryCode,
      examples
    );
    return parsePhoneNumber(value?.number as string)?.formatNational();
  }

  formatUserInput(country: string, input: string) {
    return new AsYouType(country.toUpperCase() as CountryCode).input(input);
  }

  validatePhoneNumber(country: string, input: string) {
    return input.length < 5
      ? true
      : isValidPhoneNumber(input, country.toUpperCase() as CountryCode);
  }
}
