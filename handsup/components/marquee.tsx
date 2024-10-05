import { cn } from "@/lib/utils";
import Marquee from "@/app/components/magicui/marquee";

const reviews = [
  {
    name: "Help Paul and his family for their legal expenses",
    img: "/paul.jpeg",
  },
  {
    name: "Help Max Honor Michele, David, and Brooke",
    img: "/Family.webp",
  },
  {
    name: "Bolivia Burns. Act now to fund water trucks",
    img: "/BoliviaFire.webp",
  },
  {
    name: "Finance Gaza civilians evacuations",
    img: "/gaza.avif",
  },
  {
    name: "Help Jayden pay his tuition fees for Harvard",
    img: "Harvard.jpeg",
  },
];

const ReviewCard = ({
  img,
  name,
}: {
  img: string;
  name: string;
}) => {
  return (
    <div className="mx-4 w-90 h-88 flex flex-col items-center">
      <div className="w-full h-72 overflow-hidden rounded-lg">
        <img className="w-full h-full object-cover" src={img} alt={name} />
      </div>
      <h1 className="mt-2 text-xl font-bold text-black text-center">{name}</h1>
    </div>
  );
};

export default function Marc() {
  return (
    <div className="relative w-full overflow-hidden bg-white">
      <Marquee pauseOnHover className="py-8 [--duration:40s]">
        {reviews.map((review) => (
          <ReviewCard img={review.img} name={review.name} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}
