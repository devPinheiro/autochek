import React, { useEffect, useState } from 'react';
import styles from '../../styles/Car.module.css';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { formatMoney } from '../../utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const API = `https://api.staging.myautochek.com/v1/inventory/car/`;

export async function getServerSideProps() {
  const api = await fetcher(API);
  return {
    props: {
      fallback: {
        [API]: api,
      },
    },
  };
}

const CarDetails = () => {
  const router = useRouter();
  const { carId } = router.query;
  const [car, setCar] = useState({
    carName: '',
    ccMeasurement: '',
    city: '',
    country: '',
    createdAt: '',
    damageMedia: [],
    depositReceived: false,
    engineType: '',
    exteriorColor: '',
    features: [],
    financingSettings: {},
    fuelType: '',
    hasFinancing: true,
    hasThreeDImage: false,
    hasWarranty: false,
    id: '',
    imageUrl: '',
    installment: 711989,
    insured: false,
    interiorColor: '',
    isFeatured: null,
    loanValue: null,
    marketplaceOldPrice: null,
    marketplacePrice: null,
    marketplaceVisible: true,
    marketplaceVisibleDate: '',
    inspectorDetails: {
      totalInspection: '',
      workshopName: '',
      inspectedMakes: [
        {
          count: 0,
          imageUrl: '',
          name: '',
        },
      ],
    },
    mileage: null,
    mileageUnit: '',
    model: {},
    modelFeatures: [],
    ownerType: '',
    sellingCondition: '',
    sold: false,
    state: '',
    transmission: '',
    updatedAt: '',
    vin: '',
    websiteUrl: '',
    year: null,
  });

  const { data, error } = useSWR(
    `https://api.staging.myautochek.com/v1/inventory/car/${carId}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setCar(data);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.carDetailsContainer}>
          <div className={styles.imageContainer}>
            <img src={car.imageUrl} />
          </div>
          <section>
            <p className={styles.title}>{car.carName}</p>
            <div className={styles.description}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='16'
                fill='none'
                viewBox='0 0 18 16'>
                <g
                  stroke='#7C7E88'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.054'
                  clipPath='url(#guageClip0)'>
                  <path d='M8.72 3a8.164 8.164 0 00-3.01.597 7.9 7.9 0 00-2.543 1.657A7.538 7.538 0 001.479 7.72a7.29 7.29 0 00-.576 2.896V12c0 .265.11.52.305.707.195.188.46.293.737.293h13.55c.276 0 .54-.105.736-.293a.98.98 0 00.305-.707v-1.387c.016-2.004-.799-3.932-2.265-5.36C12.805 3.826 10.808 3.015 8.72 3z'></path>
                  <path d='M6.633 13v-.5c0-.53.22-1.04.61-1.414a2.13 2.13 0 011.474-.586c.553 0 1.083.21 1.474.586.391.375.61.883.61 1.414v.5M10.283 6l-1.564 4.5M3.769 10a.27.27 0 00-.145.042.253.253 0 00-.096.112.24.24 0 00.056.273.265.265 0 00.284.054.26.26 0 00.117-.092.243.243 0 00-.032-.316.266.266 0 00-.184-.073zM4.808 7.5a.269.269 0 00-.145.042.253.253 0 00-.096.112.24.24 0 00.056.273.271.271 0 00.284.054.259.259 0 00.117-.092.243.243 0 00-.032-.316.266.266 0 00-.184-.073zM13.667 10a.27.27 0 00-.145.042.252.252 0 00-.096.112.24.24 0 00.057.273.265.265 0 00.284.054.26.26 0 00.117-.092.243.243 0 00-.033-.316.266.266 0 00-.184-.073zM12.624 7.5a.269.269 0 00-.145.042.253.253 0 00-.096.112.24.24 0 00.057.273.271.271 0 00.284.054.258.258 0 00.117-.092.242.242 0 00-.033-.316.266.266 0 00-.184-.073zM6.894 5.5a.269.269 0 00-.145.042.253.253 0 00-.096.112.24.24 0 00.056.273.271.271 0 00.284.054.259.259 0 00.117-.092.243.243 0 00-.032-.316.266.266 0 00-.184-.073z'></path>
                </g>
                <defs>
                  <clipPath id='guageClip0'>
                    <path
                      fill='#fff'
                      d='M0 0H16.676V16H0z'
                      transform='translate(.379)'></path>
                  </clipPath>
                </defs>
              </svg>

              <span>{car.mileage} miles</span>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='16'
                fill='none'
                viewBox='0 0 18 16'>
                <g
                  stroke='#7C7E88'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.054'
                  clipPath='url(#locationClip0)'>
                  <path d='M8.544 6.5c1.152 0 2.085-.896 2.085-2 0-1.105-.933-2-2.085-2-1.15 0-2.084.895-2.084 2 0 1.104.933 2 2.084 2z'></path>
                  <path d='M8.544.5a4.26 4.26 0 012.948 1.171A3.92 3.92 0 0112.713 4.5c0 1.781-2.71 5.24-3.76 6.514a.518.518 0 01-.409.19.54.54 0 01-.409-.19C7.085 9.74 4.375 6.28 4.375 4.5c0-1.061.44-2.078 1.222-2.829A4.26 4.26 0 018.544.5v0zM3.855 9.332c-1.285.545-2.084 1.314-2.084 2.165 0 1.656 3.032 3 6.774 3h.521M13.24 9.336c1.282.545 2.079 1.313 2.079 2.162 0 1.157-1.48 2.162-3.648 2.662'></path>
                  <path d='M8.023 15.5l1.043-1-1.043-1'></path>
                </g>
                <defs>
                  <clipPath id='locationClip0'>
                    <path
                      fill='#fff'
                      d='M0 0H16.676V16H0z'
                      transform='translate(.379)'></path>
                  </clipPath>
                </defs>
              </svg>
              <span>
                {car.city}, {car.state}, {car.country}
              </span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='16'
                fill='none'
                viewBox='0 0 18 16'>
                <g
                  stroke='#7C7E88'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.05'
                  clipPath='url(#insuranceClip0)'>
                  <path d='M12.884 1h2.606c.276 0 .542.105.737.293a.98.98 0 01.305.707v8a4.9 4.9 0 01-1.526 3.536A5.325 5.325 0 0111.32 15H6.11a5.325 5.325 0 01-3.685-1.464A4.9 4.9 0 01.898 10V2c0-.265.11-.52.306-.707.195-.188.46-.293.737-.293h2.605M6.11 8.5h1.042M10.281 8.5h1.043M5.07 10.5v1M12.363 10.5v1'></path>
                  <path d='M13.231 7.748L12.363 6.5l-.805-2.316c-.069-.2-.202-.372-.38-.495a1.072 1.072 0 00-.609-.189H6.86c-.218 0-.432.066-.609.189s-.31.296-.38.495L5.068 6.5 4.2 7.748a.971.971 0 00-.176.555v1.2c0 .265.11.52.306.707.195.187.46.293.737.293h7.295c.277 0 .542-.106.737-.293a.98.98 0 00.306-.707v-1.2a.97.97 0 00-.173-.555v0zM5.07 6.5h7.296'></path>
                </g>
                <defs>
                  <clipPath id='insuranceClip0'>
                    <path
                      fill='#fff'
                      d='M0 0H16.676V16H0z'
                      transform='translate(.379)'></path>
                  </clipPath>
                </defs>
              </svg>
              <span>
                {car.sellingCondition === 'foreign'
                  ? 'Foreign Used'
                  : car.sellingCondition}
              </span>
            </div>
            <div className={styles.description}>
              <span className={styles.title}>
                {formatMoney(car.marketplaceOldPrice)}
              </span>
            </div>
          </section>
        </div>

        <div className={styles.carDetailsContainer}>
          <h4 className={styles.sectionTitle}>Vehicle Description</h4>

          <div className={styles.descriptionItem}>
            <p>Engine Type</p>
            <span>{car.engineType}</span>
          </div>
          <div className={styles.descriptionItem}>
            <p>Transmission</p>
            <span>{car.transmission}</span>
          </div>
          <div className={styles.descriptionItem}>
            <p>Fuel Type</p>
            <span>{car.fuelType}</span>
          </div>
          <div className={styles.descriptionItem}>
            <p>Interior Color</p>
            <span>{car.interiorColor}</span>
          </div>
          <div className={styles.descriptionItem}>
            <p>Exterior Color</p>
            <span>{car.exteriorColor}</span>
          </div>

          <div className={styles.descriptionItem}>
            <p>VIN</p>
            <span>{car.vin}</span>
          </div>
          <div className={styles.descriptionItem}>
            <p>Vehicle ID</p>
            <span>{car.id}</span>
          </div>
        </div>
      </div>
      <div className={styles.aside}>
        {car.inspectorDetails && (
          <div className={styles.carDetailsContainer}>
            <h4 className={styles.sectionTitle}>Inspected By</h4>
            <div className={styles.inspected}>
              <div className={styles.placeholderCircle}>
                <span>
                  {car.inspectorDetails &&
                    car.inspectorDetails.workshopName &&
                    car.inspectorDetails.workshopName
                      .split(' ')
                      .map((char) => char.toString().charAt(0))
                      .join('')}{' '}
                </span>
              </div>
              <div>
                <p className={styles.title}>
                  {car.inspectorDetails.workshopName}
                </p>
                <span>
                  Total Inspection: {car.inspectorDetails.totalInspection}
                </span>
              </div>
            </div>

            <h4 className={styles.sectionTitle}>Top Brands Inspected</h4>
            <div className={styles.inspectedMakes}>
              {car.inspectorDetails.inspectedMakes.map((item, i) => (
                <div className={styles.inspectedMakesItem} key={i}>
                  <img src={item.imageUrl} alt={item.name} width={40} />
                  <p>{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
