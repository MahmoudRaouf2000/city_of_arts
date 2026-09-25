export type EventItem = {
  id: 'swanLake' | 'summerConcert' | 'antarAbla' | 'contrabass' | 'cinderella' | 'piano';
  date: string;
  time: string;
  image: string;
  imagePosition?: string;
};

export const events: EventItem[] = [
  { id: 'swanLake', date: '2026-08-01T20:00:00+02:00', time: '20:00', image: '/media/ballet.jpg', imagePosition: 'center 28%' },
  { id: 'summerConcert', date: '2026-08-05T20:30:00+02:00', time: '20:30', image: '/media/main-hall.png' },
  { id: 'antarAbla', date: '2026-08-10T20:00:00+02:00', time: '20:00', image: '/media/gomhouria.png' },
  { id: 'contrabass', date: '2026-08-15T19:30:00+02:00', time: '19:30', image: '/media/small-hall.png' },
  { id: 'cinderella', date: '2026-08-20T20:00:00+02:00', time: '20:00', image: '/media/ice.png' },
  { id: 'piano', date: '2026-08-25T19:30:00+02:00', time: '19:30', image: '/media/alex.jpg' }
];
