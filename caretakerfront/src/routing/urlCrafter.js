const makingURL = (name, sell, pricemin, pricemax, state) => {
    let noPatchedURL = '';

    if (name.toString() !== '') {
        noPatchedURL += '&name='+name;
    } 
    if (sell.toString() !== '') {
        noPatchedURL += '&sell='+sell;
    }
    if ((pricemin > 0) && (pricemax > 0)) {
        noPatchedURL += '&price='+pricemin+'-'+pricemax ;
    }
    if (state.toString() !== '') {
        noPatchedURL += '&state='+state;
    } 

return '?'+noPatchedURL.slice(1);
}

export default makingURL;