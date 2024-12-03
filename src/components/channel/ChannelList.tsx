import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChannelCard from './ChannelCard';

interface ChannelListProps {
  channels: any[];
  currentChannel: string;
  onPlayChannel: (channel: any) => void;
  selectedCategory: string;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  currentChannel,
  onPlayChannel,
  selectedCategory,
}) => {
  return (
    <div className="w-full md:w-2/6 p-4">
      <h2 className="text-2xl font-bold mb-4 text-[var(--heading-text-color)]">
        {selectedCategory === 'all' ? 'All Channels' : `${selectedCategory} Channels`}
      </h2>
      <ScrollArea className="h-[calc(100vh-180px)]">
        {channels.map((channel) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            isPlaying={currentChannel === channel.channel_name}
            onPlay={onPlayChannel}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChannelList;