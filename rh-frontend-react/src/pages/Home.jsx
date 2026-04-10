import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Book from '../components/Book';
import Quotes from '../components/Quotes';
import Solutions from '../components/Solutions';
import Introduction from '../components/Introduction';
import Questions from '../components/Questions';
import Footer from '../components/Footer';
import '../Styles/Home.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Book />
      <Quotes />
      <Solutions />
      <Introduction />
      <Questions />
      <Footer />
    </div>
  );
};

export default Home;