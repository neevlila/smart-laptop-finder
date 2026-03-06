import laptop1 from './laptop-1.png';
import laptop2 from './laptop-2.png';
import laptop3 from './laptop-3.png';
import laptop4 from './laptop-4.png';
import laptop5 from './laptop-5.png';
import laptop6 from './laptop-6.png';

// Map laptop IDs to images (cycling through 6 images for all laptops)
export const laptopImages: Record<string, string> = {
  // Budget segment
  "acer-nitro-v15-2025": laptop5,
  "lenovo-ideapad-gaming-3-2025": laptop3,
  "msi-thin-gf63-2025": laptop2,
  "lenovo-loq-15-2025": laptop3,
  "hp-victus-15-2025": laptop4,
  // Mid-range
  "asus-tuf-a15-2025": laptop1,
  "msi-katana-15-2025": laptop3,
  "msi-cyborg-15-2025": laptop1,
  "gigabyte-g5-kf5-2025": laptop5,
  "hp-victus-16-2025": laptop4,
  "dell-g15-5530-2025": laptop5,
  "msi-bravo-15-2025": laptop3,
  // Premium mid-range
  "lenovo-legion-5-2025": laptop3,
  "asus-tuf-a16-2025": laptop1,
  "dell-g16-7630-2025": laptop5,
  "hp-omen-16-2025": laptop4,
  "acer-predator-helios-neo-16-2025": laptop6,
  "asus-vivobook-pro-15-oled-2025": laptop2,
  // Premium
  "asus-rog-strix-g16-2025": laptop1,
  "lenovo-legion-pro-5-2025": laptop3,
  "asus-rog-zephyrus-g14-2025": laptop2,
  "lenovo-legion-slim-5-2025": laptop4,
  "asus-rog-flow-x13-2025": laptop2,
  "msi-raider-ge78-hx-2025": laptop6,
  "razer-blade-15-2025": laptop4,
  "gigabyte-aorus-16x-2025": laptop1,
};

export const getLaptopImage = (id: string): string => {
  return laptopImages[id] || laptop1;
};
