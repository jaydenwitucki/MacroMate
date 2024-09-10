
import React from 'react';
import './AboutMacroMate.css';
import foodimg from './imgs/foodimg.jpeg';
import foodimg2 from './imgs/foodimg2.jpeg';
import health from './imgs/healthy.jpg'

const AboutMacroBuddy = () => {
  return (
    <div className="about-macro-buddy">
      <div className="image-container">
        <div className="image">
          <img src={health} alt="Food Image 1" />
        </div>
      </div>
      <div className="believe-section">
        <h2>What We Stand For</h2>
        <p>
            At the core of our mission is the belief that balanced nutrition has the power to transform lives. 
            We are committed to making macro tracking easy and accessible, helping you achieve your health 
            and fitness goals. We believe that everyone should have the knowledge and tools to make informed 
            dietary choices.
            <br/>
            <br/>
            Our goal is to provide you with the guidance and support needed to adopt a healthier lifestyle. 
            By building a community of individuals who share a passion for wellness, we strive to create a 
            sense of balance, vitality, and well-being in every aspect of your life.
        </p>
    </div>

    </div>
  );
};

export default AboutMacroBuddy;
