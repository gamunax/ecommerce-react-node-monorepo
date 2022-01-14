import React from 'react';
import Menu from './Menu';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}: any) => (
  <div>
    <Menu />
    <div className="bg-light p-5">
      <h1>{title}</h1>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
