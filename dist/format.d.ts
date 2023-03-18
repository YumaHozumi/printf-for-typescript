type FormatArg = string | number | BigInt;
export declare class Format {
    static printf(format: string, ...args: FormatArg[]): string;
    static sprintf(format: string, ...args: FormatArg[]): string;
}
export {};
