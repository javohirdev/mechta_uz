export function flattenMessages(nestedMessages, prefix = '') {
    return Object.keys(nestedMessages).reduce((message, key) => {
        const value = nestedMessages[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;
        if(typeof value === 'string')
            message[prefixedKey] = value;
        else
            Object.assign(message, flattenMessages(value, prefixedKey));
        return message
    },{})
}