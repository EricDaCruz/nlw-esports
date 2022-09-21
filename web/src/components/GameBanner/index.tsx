interface GameBannerProps {
   bannerUrl: string;
   title: string;
   adsCount: number;
   index: number;
}

//relative rounded-lg overflow-hidden

export function GameBanner({
   bannerUrl,
   title,
   adsCount,
   index,
}: GameBannerProps) {
 
   return (
      <a href="" className={`keen-slider__slide number-slide${index} rounded-lg`}>
         <img src={bannerUrl} />
         <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0">
            <strong className="font-bold text-white block">{title}</strong>
            <span className="text-zinc-300 block">{adsCount} anúncio(s)</span>
         </div>
      </a>
   );
}
