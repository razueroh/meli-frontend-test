/* Price helpers */

const getCurrency = (currency) => (currency === 'ARS' ? '$' : 'U$S');

const formatAmount = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const getDecimals = (decimals) => (decimals ? `0${decimals.toString(10)}`.slice(-2) : undefined);

export { getCurrency, formatAmount, getDecimals };
