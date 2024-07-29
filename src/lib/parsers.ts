export enum InputType {
    JSON = 'JSON',
    CSV = 'CSV',
    TEXT = 'TEXT'
}

const parserJSON = (input: string) => {
    return JSON.parse(input);
};

const parserCSV = (input: string, options: { separator: string }) => {
    input.split('\n').map(line => line.trim().split(options.separator));
};

export const parse = (input: string, type: InputType, options?: any) => {
    switch (type) {
        case InputType.JSON:
            return parserJSON(input);
        case InputType.CSV:
            return parserCSV(input, options);
        default:
            return input;
    }
};
