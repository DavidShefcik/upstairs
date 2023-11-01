import { Box } from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./MFACarousel.css";

import MFAAppInstructions from "./AppInstructions";
import MFAQrCode from "./QRCode";
import MFAConfirmCode from "./ConfirmCode";

export const AMOUNT_OF_SLIDES = 3;

interface Props {
  currentIndex: number;
  setCurrentIndex(value: number): void;
  setCanCloseModal(value: boolean): void;
}
export default function MFACarousel({
  currentIndex,
  setCurrentIndex,
  setCanCloseModal,
}: Props) {
  return (
    <Carousel
      onChange={setCurrentIndex}
      selectedItem={currentIndex}
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      showIndicators={false}
      transitionTime={250}
      dynamicHeight
    >
      <Box>
        <MFAAppInstructions />
      </Box>
      <Box>
        <MFAQrCode />
      </Box>
      <Box>
        <MFAConfirmCode />
      </Box>
    </Carousel>
  );
}
