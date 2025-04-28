import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../redux/jobSlice";

export default function CategoryCarousel() {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer", // Fixed typo "Desginer" to "Designer"
    "Full Stack Developer",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Search job handler to dispatch the search query and navigate
  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query)); // Dispatching search query to Redux
    navigate("/browse"); // Navigate to browse page
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20 text-[teal]">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 hover:bg-teal"
            >
              <Button
                onClick={() => searchJobHandler(cat)} // Pass category as query
                className="rounded-full cursor-pointer hover:bg-[teal] hover:text-white"
                variant="outline"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>
    </div>
  );
}
