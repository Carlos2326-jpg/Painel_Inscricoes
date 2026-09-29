const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** 15 → "R$ 15,00" */
export const formatCurrency = (value) => currency.format(value);
