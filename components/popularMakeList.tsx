import React from 'react';
import useSWR from 'swr';
import styles from '../styles/Panel.module.css';
const PopularMakeList = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    'https://api.staging.myautochek.com/v1/inventory/make?popular=true',
    fetcher
  );

  return (
    <div className={styles.panel}>
      <p className={styles.description}>Car Brands</p>
      {data &&
        data.makeList.map((item: any, key: number) => {
          return (
            <ul style={{ listStyle: 'none' }} key={item.id}>
              <li>
                <input type='checkbox' />

                <span> {item.name}</span>
              </li>
            </ul>
          );
        })}
      <p className={styles.description}>Price</p>
      <ul style={{ listStyle: 'none' }}>
        <li>
          <span> Under N1m</span>
        </li>
        <li>
          {' '}
          <span> N1m - N3m</span>
        </li>
        <li>
          {' '}
          <span> N3m - N5m</span>
        </li>
        <li>
          <span> N5m - N10m</span>
        </li>
        <li>
          <span> Over N10m </span>
        </li>
      </ul>

      <p className={styles.description}>Discounts</p>
      <ul style={{ listStyle: 'none' }}>
        <li>
          <input type='checkbox' />
          <span> 5% or More</span>
        </li>
        <li>
          <input type='checkbox' />
          <span> 10% or More</span>
        </li>
        <li>
          <input type='checkbox' />
          <span> 20% or More</span>
        </li>
        <li>
          <input type='checkbox' />
          <span> 30% or More</span>
        </li>
      </ul>

      <p className={styles.description}>Type</p>
      <ul style={{ listStyle: 'none' }}>
        <li>
          <input type='checkbox' />
          <span> New</span>
        </li>
        <li>
          <input type='checkbox' />
          <span> Foreign Used</span>
        </li>
      </ul>

      <p className={styles.description}>Year of Manufacture</p>
      <ul style={{ listStyle: 'none' }}>
        <li>
          <input type='checkbox' />
          <span> 2018 - 2022</span>
        </li>
        <li>
          <input type='checkbox' />
          <span> 2015 - 2018</span>
        </li>
        <li>
          <input type='checkbox' />
          <span> 2012 - 2015</span>
        </li>
        <li>
          <input type='checkbox' />
          <span> 2010 - 2012</span>
        </li>
        <li>
          <input type='checkbox' />
          <span> 2005 - 2010</span>
        </li>
        <li>
          <input type='checkbox' />
          <span> 2000 - 2005</span>
        </li>
      </ul>
    </div>
  );
};

export default PopularMakeList;
