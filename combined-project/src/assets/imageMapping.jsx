import image1 from './image1.jpg';
import image2 from './image2.jpg';
import image3 from './image3.jpg';
import image4 from './image4.jpg';
import image5 from './image5.jpg';
import image6 from './image6.jpg';
import image7 from './image7.jpg';
import image8 from './image8.jpg';
import image9 from './image9.jpg';
import image10 from './image10.jpg';
import image11 from './image11.jpg';
import image12 from './image12.jpg';

// Inline SVG placeholder (no external image needed)
const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";

export const imageMap = {
  'image1.jpg': image1,
  'image2.jpg': image2,
  'image3.jpg': image3,
  'image4.jpg': image4,
  'image5.jpg': image5,
  'image6.jpg': image6,
  'image7.jpg': image7,
  'image8.jpg': image8,
  'image9.jpg': image9,
  'image10.jpg': image10,
  'image11.jpg': image11,
  'image12.jpg': image12,
};

export function getImageUrl(filename) {
  if (!filename) return placeholder;
  const baseName = filename.split('/').pop();
  return imageMap[baseName] || placeholder;
}