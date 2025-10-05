import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/LandingPage/NavBar';

const MainLayout = (props) => {
  return (
    <>
     <NavBar id = {props.id} username = {props.username} setUserId = {props.setUserId}></NavBar>
      <Outlet /> 
    </>
  );
};

export default MainLayout;
