export const sanitizeData = (data) => {
    return data.map(row => {
        const sanitizedRow = {};
        for (const key in row) {
            sanitizedRow[key.trim()] = row[key]; // Trim each key
        }
        return sanitizedRow;
    });
};


export const filterDataByKeyValue = (data, key, value) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.log("Invalid or empty data provided.");
        return [];
    }

    console.log(`Filtering data for rows where ${key} is '${value}'`);
    console.log(`Type of value: ${typeof value}`);

    
    const filteredData = data.filter(row => {
        if (key === 'year') {
            // Check if row.date is present and valid
            if (row.date) {
                const rowYear = new Date(row.date).getFullYear();
                //console.log(`Row date: ${row.date}, extracted year: ${rowYear}`);
                return rowYear === parseInt(value, 10); // Ensure we compare numbers
            } else {
                console.log("Row does not have a valid date:", row);
                return false;
            }
        } else {
            // Regular filtering for other fields
            return row[key] === value;
        }
    });

    console.log("Filtered data:", filteredData);
    return filteredData;
};