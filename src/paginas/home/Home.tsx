import React from 'react';
import './Home.css';
import homeLogo from '../../assets/img/boston-city.jpg'

function Home(){
    return (
        <>
            <h1 className='titulo'>Home</h1>
            <img src={homeLogo} className='img' alt="old city" />           
        </>
    );
}

export default Home;

