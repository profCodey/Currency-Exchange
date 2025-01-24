import * as yup from 'yup';

export const updateCurrencySchema = yup.object().shape({
  code: yup.string(),
  name: yup.string(),
  symbol: yup.string(),
  is_source_currency: yup.boolean(),
  is_destination_currency: yup.boolean(),
  is_active: yup.boolean(),
});
