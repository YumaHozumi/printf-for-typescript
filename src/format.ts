type FormatArg = string | number | BigInt;

export class Format {
    static printf(format: string, ...args: FormatArg[]): string {
        let index = 0;
        return format.replace(/%([-+ 0#]*)(\d*|\*)?(\.(\d*|\*))?([hlLjzt])?([diuoxXfFeEgGaAcspn%])/g, (match, flags, width, _, precision, length, type) => {
            const arg = args[index++];

        if (type === 'd' || type === 'i' || type === 'u' || type === 'o' || type === 'x' || type === 'X') {
            if (typeof arg !== 'number' && typeof arg !== 'bigint') {
            throw new Error(`Invalid argument type for format specifier '${type}'. Expected 'number' or 'bigint', but got '${typeof arg}'.`);
            }
        } else if (type === 'f' || type === 'F' || type === 'e' || type === 'E' || type === 'g' || type === 'G' || type === 'a' || type === 'A') {
            if (typeof arg !== 'number') {
            throw new Error(`Invalid argument type for format specifier '${type}'. Expected 'number', but got '${typeof arg}'.`);
            }
        } else if (type === 'c' || type === 's') {
            if (typeof arg !== 'string') {
            throw new Error(`Invalid argument type for format specifier '${type}'. Expected 'string', but got '${typeof arg}'.`);
            }
        } else if (type === 'p') {
            if (typeof arg !== 'object') {
            throw new Error(`Invalid argument type for format specifier '${type}'. Expected 'object', but got '${typeof arg}'.`);
            }
        } else if (type === 'n') {
            throw new Error(`The 'n' format specifier is not supported.`);
        }

        let formatted: string;

        switch (type) {
            case 'd':
            case 'i':
              if (!Number.isInteger(arg) || typeof arg !== 'number') {
                throw new Error(`Invalid argument type for format specifier '${type}'. Expected 'integer', but got '${typeof arg}'.`);
              }
              if (arg !== Math.floor(arg)) {
                throw new Error(`Invalid argument value for format specifier '${type}'. Expected an integer, but got '${arg}'.`);
              }
              formatted = arg.toString();
              break;
            case 'u':
            formatted = (typeof arg === 'bigint' ? BigInt.asUintN(64, arg) : Number(arg) >>> 0).toString();
            break;
            case 'o':
            formatted = (typeof arg === 'bigint' ? arg : Number(arg) >>> 0).toString(8);
            break;
            case 'x':
            formatted = (typeof arg === 'bigint' ? arg : Number(arg) >>> 0).toString(16).toLowerCase();
            break;
            case 'X':
            formatted = (typeof arg === 'bigint' ? arg : Number(arg) >>> 0).toString(16).toUpperCase();
            break;
            case 'f':
            case 'F':
                if (typeof arg !== 'number') {
                throw new Error(`Invalid argument type for format specifier '${type}'. Expected 'number', but got '${typeof arg}'.`);
                }
                formatted = arg.toFixed(Number(precision) || 6);
                break;
        
            case 'e':
            case 'E':
                if (typeof arg !== 'number') {
                throw new Error(`Invalid argument type for format specifier '${type}'. Expected 'number', but got '${typeof arg}'.`);
                }
                formatted = arg.toExponential(Number(precision) || 6);
                break;
            case 'g':
            case 'G':
                if (typeof arg !== 'number') {
                throw new Error(`Invalid argument type for format specifier '${type}'. Expected 'number', but got '${typeof arg}'.`);
                }
                formatted = arg.toPrecision(Number(precision) || 6);
                break;
            case 'a':
            case 'A':
            throw new Error(`The 'a' and 'A' format specifiers are not supported.`);
            case 'c':
            formatted = String.fromCharCode(parseInt(String(arg), 10));
            break;
            case 's':
            formatted = String(arg);
            break;
            case 'p':
            if (typeof arg === 'object' && arg instanceof Object && typeof arg.valueOf() === 'number') {
                formatted = `0x${arg.valueOf().toString(16)}`;
            } else {
                throw new Error(`Invalid argument type for format specifier '${type}'. Expected an object with a numeric valueOf() result.`);
            }
            break;
            case '%':
            formatted = '%';
            break;
            default:
            formatted = '';
        }

        return flags.includes('0') ? formatted.padStart(parseInt(width), '0') : formatted.padStart(parseInt(width), ' ');

    });
  }

  static sprintf(format: string, ...args: FormatArg[]): string {
    return this.printf(format, ...args);
  }
}

