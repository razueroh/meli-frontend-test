import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItem } from '../api/meli';
import Product from '../components/Product';
import { formatAmount, getCurrency, getDecimals } from '../utils/price';
import getCondition from '../utils/condition';
import Message from '../components/Message';
import Loading from '../components/Loading';

const component = {
  loading: () => <Loading />,
  error: (error) => <Message error={error} />,
  success: (product) => <Product product={product} />,
};

const getState = ({ state, data }) => component[state](data);

const Details = () => {
  const { id } = useParams();
  const [currentState, setCurrentState] = useState({ state: 'loading' });

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setCurrentState({ state: 'loading' });
        const { item } = await getItem(id);
        if (item) {
          const product = {
            title: item.title,
            currency: getCurrency(item.price.currency),
            amount: formatAmount(item.price.amount),
            decimals: getDecimals(item.price.decimals),
            picture: item.picture,
            condition: getCondition(item.condition),
            soldQuantity: item.sold_quantity,
            description: item.description,
          };

          setCurrentState({ state: 'success', data: product });
        }
      } catch (err) {
        console.log(err);
        setCurrentState({ state: 'error', data: err });
      }
    };

    getProductDetails(id);
  }, []);

  return getState(currentState);
};

export default Details;
