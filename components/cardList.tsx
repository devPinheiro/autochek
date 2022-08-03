import React, { useMemo } from 'react';
import { chunk } from 'lodash';
import styles from '../styles/Card.module.css';
import Card from './card';

const CardList = ({ cards, cols }: any) => {
  const chucks = useMemo(() => {
    return chunk(cards, cols);
  }, [cards, cols]);

  return (
    <React.Fragment>
      {chucks.map((items: any, i) => {
        return (
          <div key={i} className={styles.cardList}>
            <div className={styles.grid}>
              {items.map((item: any) => {
                return (
                  <Card
                    key={item.id}
                    src={item.imageUrl}
                    name={item.title}
                    price={item.marketplacePrice}
                    carId={item.id}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CardList;
