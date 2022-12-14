import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import "./styles/main.css";
import logoImg from "./assets/logo.svg";
import { CreateAdModal } from "./components/CreateAdModal";
import axios from "axios";
/* Slider with Keen Slider */
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
interface Game {
   id: string;
   title: string;
   bannerUrl: string;
   _count: {
      ads: number;
   };
}

function App() {
   const [games, setGames] = useState<Game[]>([]);
   const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
      slides: {
         perView: 6,
         spacing: 10,
      },
      breakpoints: {
         "(min-width: 320px)": {
            slides: {
               perView: 2,
               spacing: 10,
            },
         },
         "(min-width: 768px)": {
            slides: {
               perView: 4,
               spacing: 10,
            },
         },
         "(min-width: 1024px)": {
            slides: {
               perView: 6,
               spacing: 10,
            },
         },
      },
   });

   useEffect(() => {
      axios("http://localhost:3333/games").then((response) =>
         setGames(response.data)
      );
   }, []);

   return (
      <div className="max-w-[1344px] mx-auto flex-col flex items-center my-20 sm:px-4">
         <img src={logoImg} alt="logo" className="sm:w-44 md:w-60 lg:w-80" />
         <h1 className="lg:text-6xl text-white font-black mt-20 sm:text-4xl md:text-5xl">
            Seu{" "}
            <span className="bg-nlw-gradiente text-transparent bg-clip-text">
               duo
            </span>{" "}
            está aqui.
         </h1>

         {games.length > 0 && (
            <div ref={sliderRef} className="keen-slider mt-16">
               {games.map((game, key) => (
                  <GameBanner
                     key={game.id}
                     bannerUrl={game.bannerUrl}
                     title={game.title}
                     adsCount={game._count.ads}
                     index={key + 1}
                  />
               ))}
            </div>
         )}

         <Dialog.Root>
            <CreateAdBanner />
            <CreateAdModal />
         </Dialog.Root>
      </div>
   );
}

export default App;
