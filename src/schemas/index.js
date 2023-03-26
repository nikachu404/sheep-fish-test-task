import * as yup from 'yup';

export const basicSchema = yup.object().shape({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  price: yup.number('Please enter valid price').integer('Please enter valid price').min(1, 'Should be more than 0').required('Required'),
  thumbnail: yup.string().required('Required'),
  rating: yup.number('Please enter valid rating').min(1, 'Rating should be from 1 to 5').max(5, 'Rating should be from 1 to 5').required('Required'),
  stock: yup.number('Please enter valid rating').required('Required'),
  category: yup.string().required('Required')
});
