export const generateQueries = arr => {
    let queries = '';

    arr.forEach(element => {
        const query = `&${element.name.toLowerCase()}=${element.value}`;

        queries += query;
    });

    return queries;
};
