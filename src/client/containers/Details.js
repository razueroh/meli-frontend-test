import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItem } from '../api/meli';
import Product from '../components/Product';
import { formatAmount, getCurrency, getDecimals } from '../utils/price';
import getCondition from '../utils/condition';

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const {
        data: { item },
      } = await getItem(id);

      if (item) {
        setProduct({
          title: item.title,
          currency: getCurrency(item.price.currency),
          amount: formatAmount(item.price.amount),
          decimals: getDecimals(item.price.decimals),
          picture: item.picture,
          condition: getCondition(item.condition),
          soldQuantity: item.sold_quantity,
          description: item.description,
        });
      }
    };
    getProduct();
  }, []);

  return product ? (
    <Product
      title={product.title}
      currency={product.currency}
      price={product.amount}
      decimals={product.decimals}
      picture={product.picture}
      condition={product.condition}
      soldQuantity={product.soldQuantity}
      description={product.description}
    />
  ) : null;
};

export default Details;
