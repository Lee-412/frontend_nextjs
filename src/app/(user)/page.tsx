import Image from "next/image";
import styles from "./page.module.scss";
import ImageSlider from "@/component/slider/slider";
import { Container, PaletteMode } from "@mui/material";
import { UserContext } from "@/component/userContext/userContext";
import React from "react";

export default function Home() {
  const slider = [
    {
      id: 1,
      author: 'John Doe',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      category: 'Technology',
      img: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg',
      title: 'Slide 1',
      data: 'new1'
    },
    {
      id: 2,
      author: 'Jane Doe',
      content: 'Nulla euismod urna sapien, a pulvinar nisi volutpat sed.',
      category: 'Nature',
      img: 'https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-2.jpg',
      title: 'Slide 2',
      data: 'new2'
    },
    {
      id: 3,
      author: 'Jane Doe',
      content: 'Nulla euismod urna sapien, a pulvinar nisi volutpat sed.',
      category: 'Nature',
      img: 'https://images2.thanhnien.vn/528068263637045248/2024/1/25/e093e9cfc9027d6a142358d24d2ee350-65a11ac2af785880-17061562929701875684912.jpg',
      title: 'Slide 3',
      data: 'new2'
    },
    {
      id: 4,
      author: 'Jane Doe',
      content: 'Nulla euismod urna sapien, a pulvinar nisi volutpat sed.',
      category: 'Nature',
      img: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg',
      title: 'Slide 3',
      data: 'new2'
    },

    {
      id: 5,
      author: 'Jane Doe',
      content: 'Nulla euismod urna sapien, a pulvinar nisi volutpat sed.',
      category: 'Nature',
      img: '    https://file3.qdnd.vn/data/images/0/2023/05/03/vuhuyen/khanhphan.jpg?dpi=150&quality=100&w=870',
      title: 'Slide 3',
      data: 'new2'
    },
  ];

  // const { user } = React.useContext(UserContext);
  // console.log(user);

  return (
    <>

      <Container>
        <ImageSlider sliderData={slider} />
        <ImageSlider sliderData={slider} />
        <ImageSlider sliderData={slider} />
        <ImageSlider sliderData={slider} />
        <ImageSlider sliderData={slider} />
        <ImageSlider sliderData={slider} />
      </Container>

    </>

  );
}
