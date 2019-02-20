export const required = value => value ? undefined : 'Required'
export const xml = value => value.type === 'text/xml' ? undefined : 'File must be in XML format'