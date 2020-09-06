/* Price helpers */

const getCurrency = (currency) => (currency === 'ARS' ? '$' : 'U$S');

const formatAmount = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export { getCurrency, formatAmount };
