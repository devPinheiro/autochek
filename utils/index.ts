type ICurrency = {
  NGN: string;
  N: string;
};
const currencies: ICurrency = {
  NGN: '₦',
  N: 'N',
};

export const formatMoney = (
  number: any,
  currency = 'NGN',
  decimals = 2,
  dec_point = '.',
  thousands_sep = ','
) => {
  if (number === null) {
    return currency;
  }
  const value = parseInt(number);
  if (isNaN(value)) {
    return '';
  }
  //return new Intl.NumberFormat('en-US', {style: 'currency', currency: cur}).format(value).replace('NGN', '₦');
  var exponent = '',
    numberstr = number.toString(),
    eindex = numberstr.indexOf('e'),
    temp,
    sign,
    integer,
    fractional,
    i,
    z;
  if (eindex > -1) {
    exponent = numberstr.substring(eindex);
    number = parseFloat(numberstr.substring(0, eindex));
  }
  temp = Math.pow(10, decimals);
  number = Math.round(number * temp) / temp;
  sign = number < 0 ? '-' : '';
  integer = (
    number > 0 ? Math.floor(number) : Math.abs(Math.ceil(number))
  ).toString();
  fractional = number.toString().substring(integer.length + sign.length);
  fractional =
    decimals > 0 || fractional.length > 1
      ? dec_point + fractional.substring(1)
      : '';
  if (decimals > 0) {
    for (i = fractional.length - 1, z = decimals; i < z; ++i) {
      fractional += '0';
    }
  }
  //@ts-ignore
  thousands_sep =
    thousands_sep !== dec_point || fractional.length === 0
      ? thousands_sep
      : null;
  if (thousands_sep !== '') {
    for (i = integer.length - 3; i > 0; i -= 3) {
      integer = integer.substring(0, i) + thousands_sep + integer.substring(i);
    }
  }

  return (
    (currency === 'disable' ? '' : (currency) + '') +
    sign +
    integer +
    fractional +
    exponent
  );
};
