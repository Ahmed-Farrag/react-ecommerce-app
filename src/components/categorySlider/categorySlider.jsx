import React, { useEffect, useState } from "react";
// import styles from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {

  const [categories, setCategories] = useState([])

  async function getCategories(){
 let {data} = await  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
 setCategories(data.data)
 
  }
  useEffect(()=>{
    getCategories()
  }, [])

  const settings={
    dots: true,
    Infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  }


  return <><Slider {...settings}>
  {
    categories.map((category)=>   <div key={category._id}>
       <img className="w-100" height={200} src={category.image} alt="" />
    <h2 className="h6 pt-2">{category.name}</h2>
    </div>
    )
  }
</Slider></>;
}
