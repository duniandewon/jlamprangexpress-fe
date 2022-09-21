export default (amount, locals, currency) =>
  new Intl.NumberFormat(locals, { style: "currency", currency }).format(amount);
