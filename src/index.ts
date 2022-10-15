class LandLineAlgerianPhoneNumber {
    readonly #number: string;

    constructor(number: string) {
        this.#number = number;
    }

    get number (): string {
        return this.#number
    }

    valueof(): string {
        return this.#number
    }

    toString(): string {
        return this.#number
    }

    get [Symbol.toStringTag]() {
        return 'LandlineAlgerianPhoneNumber';
    }
}

class MobileAlgerianPhoneNumber {
    readonly #number: string;

    constructor(number: string) {
        this.#number = number;
    }

    get number (): string {
        return this.#number
    }

    valueof(): string {
        return this.#number
    }

    toString(): string {
        return this.#number
    }

    get [Symbol.toStringTag]() {
        return 'MobileAlgerianPhoneNumber';
    }
}

export type AlgerianPhoneNumber = LandLineAlgerianPhoneNumber | MobileAlgerianPhoneNumber;

const isNonEmptyString = (s: string) => typeof s === 'string' && s.length > 0;

const normalize = (s: string): string =>  s.replace(/\s|-+/g, '');

export namespace AlgerianPhoneNumber {
    export const fromString = (phoneNumber: string): AlgerianPhoneNumber => {
        if (!isNonEmptyString(phoneNumber)) {
            throw new Error('Phone number can not be empty')
        }
        const normalized = normalize(phoneNumber);
        
        if (mobileNumberPattern.test(normalized)) {
            return new MobileAlgerianPhoneNumber(normalized);
        }

        if (landlineNumberPattern.test(normalized)) {
            return new MobileAlgerianPhoneNumber(normalized);
        }
        
        throw new Error(`${phoneNumber} is not a valid Algerian phone number`);
    }

    export const isAlgerianPhoneNumber = (number: unknown) => {
        const objType = Object.prototype.toString.call(number);
        return objType === '[object MobileAlgerianPhoneNumber]' || objType === '[object LandlineAlgerianPhoneNumber]';  
    };

    export const equals = (number: AlgerianPhoneNumber, other: AlgerianPhoneNumber) => {
        if (isAlgerianPhoneNumber(number) && isAlgerianPhoneNumber(other)) {
            return number.valueof() === other.valueof();
        }
        return false;
    }

    const isLandline = (number: AlgerianPhoneNumber) => {
        if (isAlgerianPhoneNumber(number)) {
            return number instanceof LandLineAlgerianPhoneNumber
        }
    }

    const isMobile = (number: AlgerianPhoneNumber) => {
        if (isAlgerianPhoneNumber(number)) {
            return number instanceof MobileAlgerianPhoneNumber
        }
    }
}

const mobileNumberPattern = /^(00213|\+213|0)(7)[0-9]{8}/;
const landlineNumberPattern = /^(00213|\+213|0)(49|27|29|32|33|34|25|26|37|43|46|21|23|36|48|39|38|31|45|35|41|24)[0-9]{6}/;