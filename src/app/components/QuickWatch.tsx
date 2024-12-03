import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface QuickWatchProps {
  channels: any[];
  onPlayChannel: (channel: any) => void;
}

const QuickWatch: React.FC<QuickWatchProps> = ({ channels, onPlayChannel }) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 4, align: 'start' });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-[var(--heading-text-color)]">Quick Watch</h2>
      <div className="mt-4 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {channels.map((channel) => (
              <div key={channel.id} className="flex-[0_0_25%] min-w-0 px-2">
                <div className="p-2 text-center channels_image group">
                  <Image
                    src={channel.image}
                    alt={channel.channel_name}
                    width={100}
                    height={100}
                    className="rounded-lg mb-2 mx-auto"
                    style={{
                      objectFit: 'cover',
                      width: '50px',
                      height: '50px',
                    }}
                  />
                  <p className="font-medium text-sm truncate text-white">{channel.channel_name}</p>
                  <Button
                    size="sm"
                    onClick={() => onPlayChannel(channel)}
                    className="acc_btn btn mt-2 bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Play
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          size="icon"
          variant="outline"
          className="btn absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-transparent text-white hover:bg-transparent hover:text-white"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="btn absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-transparent text-white hover:bg-transparent hover:text-white"
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      </div>
    </>
  );
};

export default QuickWatch;