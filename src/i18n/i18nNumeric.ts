const numberFormats = [
    "indian", "anglo", "european"
]
export function getNumberFormats(): string[] { return numberFormats };
export function formatNumber(_n: number | BigInt, format: string = "anglo", useSeperators: boolean = true): string {
    
    let [integer, decimal] = _n.toString().split(".");
    let integerFormatted = integer;
    let digitSeperator = ",";
    let decimalSeparator = ".";
    const l = integer.length;
    
    if (useSeperators) {
        
        switch (format) {
            case "indian" : 
                if (l < 3) break; 
                integerFormatted = "";
                for (let i = 0; i < l; i ++) {
                    integerFormatted += integer[l-i-1];
                    if (i < 2) continue;
                    if ((i) % 2 == 0 && i !== integer.length -1) {
                        integerFormatted += digitSeperator;
                    }
                } 
                integerFormatted = integerFormatted.split("").reverse().join("");
                break;
            case "european":
                digitSeperator = ".";
                decimalSeparator = ","
            case "anglo":
            default:
                integerFormatted = "";
                for (let i = 0; i < l; i ++) {
                    integerFormatted += integer[l-i-1];
                    if ((i-2) % 3 == 0 && i !== integer.length -1) {
                        integerFormatted += digitSeperator;
                    }
                } 
                integerFormatted = integerFormatted.split("").reverse().join("");
                break;
        }
    }

    if (decimal) {
        return integerFormatted + decimalSeparator + decimal;
    }
    return integerFormatted;
}

const unitsTemperature = [
    "celsius", "fahrenheit", "kelvin"
]
export function getUnitsTemperature(): string[] { return unitsTemperature };
export function formatTemperature(tempCelcius: number, format: string = "celsius", includeUnits: boolean = true): string {
    let unitString = "";
    let temperature = tempCelcius;
    switch (format) {
        case "fahrenheit": 
            temperature = Math.round((temperature * 9 / 5) - 32);
            unitString = "˚F";
            break;
        case "kelvin":
            temperature += 273;
            unitString = " K";
            break;
        case "celsius": 
        default:
            unitString = "˚C";
            break;
    }

    if (includeUnits) return temperature.toString() + unitString;
    return temperature.toString();
}