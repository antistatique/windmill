const pluralize = (count: number, singular: string, plural: string = singular + 's') => {
    return count === 1 ? singular : plural;
}

export default pluralize;