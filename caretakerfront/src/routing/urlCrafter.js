const makingURL = (name, sell, pricemin, pricemax, tag) => {
    let noPatchedURL = '';

    if (name.toString() !== '') {
        noPatchedURL += '&name='+name;
    } 
    if (sell.toString() !== '') {
        noPatchedURL += '&venta='+sell;
    }
    if ((pricemin > 0) && (pricemax > 0)) {
        noPatchedURL += '&price='+pricemin+'-'+pricemax ;
    }
    if (tag.toString() !== '') {
        noPatchedURL += '&tag='+tag;
    }
return '?'+noPatchedURL.slice(1);
}

export default makingURL;