export function getDate(date) {
    const newDate = new Date(Date.parse(date));

    return newDate.getFullYear() + '/' + newDate.getMonth() + '/' + newDate.getDay();
}