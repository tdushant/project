import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChannelCardProps {
  channel: {
    id: string;
    image: string;
    channel_name: string;
    add_language: string;
    stream_url: string;
  };
  isPlaying: boolean;
  onPlay: (channel: any) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({ channel, isPlaying, onPlay }) => {
  const router = useRouter();

  const handlePlay = () => {
    onPlay(channel);
    router.push(`/${encodeURIComponent(channel.channel_name)}`);
  };

  return (
    <div className="flex items-center mb-4 p-2 hover:bg-[var(--secondary-color)] hover:text-white rounded-lg cursor-pointer channels_image group">
      <Image src={channel.image} alt={channel.channel_name} width={50} height={50} className="mr-4" />
      <div className="flex-grow">
        <h3 className="font-semibold text-white">{channel.channel_name}</h3>
        <p className="text-sm text-[var(--paragraph-text-color)]">{channel.add_language}</p>
      </div>
      {isPlaying ? (
        <Button
          size="sm"
          disabled
          className="btn bg-[var(--primary-color)] text-white"
        >
          <PlayCircle className="h-5 w-5 mr-1" />
          Now Playing
        </Button>
      ) : (
        <Button
          size="sm"
          onClick={handlePlay}
          className="btn bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <PlayCircle className="h-5 w-5 mr-1" />
          Play
        </Button>
      )}
    </div>
  );
};

export default ChannelCard;