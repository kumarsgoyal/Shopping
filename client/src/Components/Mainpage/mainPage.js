import React from 'react';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import Content from './content.js';
import Footer from './footer.js';
import HomeNavbar from './navbar.js';
const MainPage = () => (
    <div className="container-fluid">
        <HomeNavbar />
        <Content />
        <Footer />
    </div>
);

export default MainPage;
