import React, { FC } from 'react';
import styles from '../styles/Card.module.css';

import Link from 'next/link';
import { formatMoney } from '../utils';

interface ICard {
  src: string;
  price: number;
  name: string;
  carId: string;
}
const Card: FC<ICard> = ({ src, price, name, carId }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cover}>
        <img src={src} loading='lazy' alt={name} />
      </div>

      <h3>{name}</h3>
      <p>{formatMoney(price)}</p>
      <Link href={`/car/${carId}`}>
        
        <button className={styles.button}>View Car</button>
      </Link>
    </div>
  );
};

export default Card;
