import laptop1 from './laptop-1.png';
import laptop2 from './laptop-2.png';
import laptop3 from './laptop-3.png';
import laptop4 from './laptop-4.png';
import laptop5 from './laptop-5.png';
import laptop6 from './laptop-6.png';

// Map laptop IDs to images (cycling through 6 images for 18 laptops)
export const laptopImages: Record<string, string> = {
  "asus-tuf-a15": laptop1,
  "lenovo-legion-5": laptop3,
  "acer-nitro-v15": laptop5,
  "hp-omen-16": laptop4,
  "msi-katana-15": laptop2,
  "dell-g16": laptop6,
  "asus-rog-strix-g15": laptop4,
  "lenovo-ideapad-gaming-3": laptop5,
  "asus-zephyrus-g14": laptop5,
  "acer-predator-helios-neo": laptop2,
  "msi-thin-gf63": laptop3,
  "gigabyte-g5": laptop1,
  "hp-victus-16": laptop6,
  "lenovo-legion-slim-5": laptop3,
  "asus-tuf-a16": laptop1,
  "razer-blade-15": laptop4,
  "msi-cyborg-15": laptop2,
  "dell-g15": laptop6,
};

export const getLaptopImage = (id: string): string => {
  return laptopImages[id] || laptop1;
};
