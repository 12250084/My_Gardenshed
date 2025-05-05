const displayAUDCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-AU', {
        style: "currency",
        currency: 'AUD',
        minimumFractionDigits: 2
    });

    return formatter.format(num);
};

export default displayAUDCurrency;
