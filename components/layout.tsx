import Header from './header';
import Footer from './footer';
import React, { FC, ReactNode } from 'react';

type ILayout = {
  children: ReactNode;
};
const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
