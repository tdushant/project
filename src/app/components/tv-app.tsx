'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { User, Menu, X } from 'lucide-react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import logoImg from "../../../public/logo.svg";
import axios from 'axios';
import VideoPlayer from './VideoPlayer';
import QuickWatch from './QuickWatch';
import ChannelList from '@/components/channel/ChannelList';
import { useRouter } from 'next/navigation';

interface TVAppProps {
  initialChannel?: string;
}

export default function TVApp({ initialChannel }: TVAppProps) {
  const router = useRouter();
  const [currentVideo, setCurrentVideo] = useState('');
  const [currentChannel, setCurrentChannel] = useState(initialChannel || '');
  const [selectedChannelCategory, setSelectedChannelCategory] = useState('Hindi');
  const [quick_watch, setquick_watch] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [AllChannels, SetAllChannels] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const API_BASE_URL = 'https://api-houston.khabriya.in/api/v3';
  const API_AUTH_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFmZGQ3YjMzLWY2ZGItNDNlOC05NmM0LTFkNDMyYjc2NDI4NCIsIm1hY19hZGRyZXNzIjoibWFjX2FkZHJlc3MiLCJpYXQiOjE3MzE5NDE0NTF9.RrgsywJ4zNcTfER0Kd48bQZWCQoKO3GOmqYF0PBhPfyc1MOoXwTXVSQzYV1k-60Ch3sD8lWMXFOtC9rFIzOKSFD8hpzoQSzG07FpOLdtgYASuD49pBCk-1EsEOAArX3dWoumHe0C52Uw-NvABdDM1lLIMcQZxsh1DTA1SxMZUfGuPX5oMmdXdFKqyRX0LX8Xa_aDfvA7dhvyPsdqxyMXn_ieeJK9BzzW5NJYKW68gwpOAF6yjzJI-lDYQHKBeqsXSXEpL_vaESdLnZT-gBgvzuC6GgoMCwO8YVu99X7OWc-dDYvS35JJ9Oq0WePm-WBbRHe61iUD4UmsFZS4SCO_3A';

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const ListQuickChannels = useCallback(async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/quick-channels`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${API_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      setquick_watch(response.data.data);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  }, []);

  const ChannelCategories = useCallback(async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/languages`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${API_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  }, []);

  const fetchAllChannels = useCallback(async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/channels`,
        {
          "language": selectedChannelCategory
        },
        {
          headers: {
            'Authorization': `Bearer ${API_AUTH_TOKEN}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      SetAllChannels(response.data.data);
      if (!currentChannel && response.data.data.length > 0) {
        const firstChannel = response.data.data[0];
        setCurrentVideo(firstChannel.stream_url);
        setCurrentChannel(firstChannel.channel_name);
        router.push(`/${encodeURIComponent(firstChannel.channel_name)}`);
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  }, [selectedChannelCategory, currentChannel, router]);

  useEffect(() => {
    ListQuickChannels();
    ChannelCategories();
  }, [ListQuickChannels, ChannelCategories]);

  useEffect(() => {
    fetchAllChannels();
  }, [fetchAllChannels, selectedChannelCategory]);

  const handleChannelCategoryChange = useCallback((category: string) => {
    setSelectedChannelCategory(category);
    setIsMenuOpen(false);
  }, []);

  const playChannel = useCallback((channel: any) => {
    setCurrentVideo(channel.stream_url);
    setCurrentChannel(channel.channel_name);
    router.push(`/${encodeURIComponent(channel.channel_name)}`);
  }, [router]);

  return (
    <div className="md:mx-6 mx-2">
      <header className="flex justify-between items-center p-4 text-white header">
        <div className="flex items-center">
          <Image src={logoImg} alt="TV App Logo" width={100} height={40} />
        </div>
        <Button variant="outline" className="acc_btn btn bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] hover:text-white hidden md:flex">
          <User className="mr-2 h-4 w-4" />
          My Account
        </Button>
        <Button
          variant="outline"
          className="md:hidden bg-white text-black"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      <div className={`${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-full w-3/4 bg-[var(--primary-color)] bg-opacity-80 p-4 transition-transform duration-300 ease-in-out md:hidden z-50`}>
        <div className="flex justify-end">
          <Button onClick={toggleMenu} variant="outline" className="text-white">
            <X className="h-6 w-6 text-black bg-white" />
          </Button>
        </div>

        {Categories.map((category) => (
          <span
            key={category.id}
            onClick={() => handleChannelCategoryChange(category.insert_language)}
            className={`block text-white text-lg mt-3 cursor-pointer px-4 py-2 rounded-md transition-colors duration-300 ${
              selectedChannelCategory === category.insert_language
                ? 'bg-[var(--primary-color)] text-white'
                : 'hover:bg-[var(--secondary-color)] text-[var(--primary-color)]'
            }`}
          >
            {category.insert_language}
          </span>
        ))}
      </div>

      <div className="p-4 flex flex-wrap gap-2 justify-center items-center hidden md:flex">
        {Categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedChannelCategory === category ? 'default' : 'outline'}
            onClick={() => handleChannelCategoryChange(category.insert_language)}
            className={`btn ${
              selectedChannelCategory === category.insert_language
                ? 'bg-[var(--primary-color)] text-white'
                : 'text-text-white bg-transparent'
            }`}
          >
            {category.insert_language}
          </Button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-4/6 p-4">
          <div className="flex-grow">
            <VideoPlayer
              currentVideo={currentVideo}
              adTagUrl="https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
            />
          </div>

          <QuickWatch
            channels={quick_watch}
            onPlayChannel={playChannel}
          />
        </div>

        <ChannelList
          channels={AllChannels}
          currentChannel={currentChannel}
          onPlayChannel={playChannel}
          selectedCategory={selectedChannelCategory}
        />
      </div>
    </div>
  );
}