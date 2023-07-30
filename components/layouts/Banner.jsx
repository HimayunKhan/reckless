import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={2000}
      >
        <div>
          <Image
            priority
            src="/banner_images/sliderImg_1.png"
            width={800}
            height={400}
            alt="sliderImg"
          />
        </div>
        <div>
          <Image
            priority
            src="/banner_images/sliderImg_2.png"
            width={400}
            height={400}
            alt="sliderImg"
          />
        </div>
        <div>
          <Image
            priority
            src="/banner_images/sliderImg_3.png"
            width={400}
            height={400}
            alt="sliderImg"
          />
        </div>
		<div>
          <Image
            priority
            src="/banner_images/sliderImg_4.png"
            width={400}
            height={400}
            alt="sliderImg"
          />
        </div>
      </Carousel>
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20"></div>
    </div>
  );
};

export default Banner;
