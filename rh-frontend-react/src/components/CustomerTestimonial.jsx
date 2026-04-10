import React from 'react';

const CustomerTestimonial = () => {
  const testimonials = [
    {
      id: 1,
      desc: "RoofHero transformed our 1920s Bondi bungalow in two days. Zero hassles and a stunning new Colorbond roof.",
      author: "Emily W., Bondi"
    },
    {
      id: 2,
      desc: "RoofHero transformed our 1920s Bondi bungalow in two days. Zero hassles and a stunning new Colorbond roof.",
      author: "Emily W., Bondi"
    },
    {
      id: 3,
      desc: "RoofHero transformed our 1920s Bondi bungalow in two days. Zero hassles and a stunning new Colorbond roof.",
      author: "Emily W., Bondi"
    }
  ];

  return (
    <section className='ct-section'>
      <div className='ct-container'>
        <div className='ct-header'>
          <h1>Customer Testimonial</h1>
          <p>Read what our happy clients have to say about their experience.</p>
        </div>
        
        <div className='ct-grid'>
          {testimonials.map((item) => (
            <div className='ct-card' key={item.id}>
              <p className='ct-card-desc'>{item.desc}</p>
              <p className='ct-card-author'>{item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonial;