import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/LandingPage/NavBar';

const MainLayout = (props) => {
  return (
    <>
     <NavBar id = {props.id} username = {props.username} setUserId = {props.setUserId}></NavBar>
      <Outlet /> {/* renders the matched child route */}
    </>
  );
};

export default MainLayout;
