'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CourseCard from './CourseCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ProgrammesSlider.css';

export default function ProgrammesSlider({ programmes }) {
  return (
    <div className="programmes-slider-wrapper">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={32}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="programmes-swiper"
      >
        {programmes.map((prog, index) => (
          <SwiperSlide key={index}>
            <CourseCard {...prog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
