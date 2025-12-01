import card1 from "../assets/cards/card1.png";
import card2 from "../assets/cards/card2.png";
import card3 from "../assets/cards/card3.png";

export default function RandomImages() {
  // Define exact positions for each image
  const images = [
    { src: card1, top: "0%", left: "5%" },
    { src: card2, top: "10%", left: "65%" },
    { src: card3, top: "50%", left: "20%" },
  ];

  return (
    <div className="">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt=""
          className="absolute z-0 transition-transform duration-300 hover:scale-110 hover:rotate-3"
          style={{ top: image.top, left: image.left }}
        />
      ))}
    </div>
  );
}
