export function getProductNames(downloads) {
    let result = [];
    downloads.forEach(element => {
        if (!result.includes(element.product)) {
            result.push(element.product);
        }
    });
    return result;
}

export function changeDownloads(downloads) {
    downloads.map(element => {
        element.isActive = true;
        element.isShowTooltip = false;
        element.released = new Date(element.released);
    });
    return downloads;
}