'use client';

import { useParams } from 'next/navigation';
import TVApp from '../components/tv-app';

export default function ChannelPage() {
  const params = useParams();
  const channelName = params.channel as string;

  return <TVApp initialChannel={decodeURIComponent(channelName)} />;
}