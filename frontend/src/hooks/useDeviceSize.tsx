import { useMediaQuery } from "@chakra-ui/react";

interface ReturnType {
  isMobile: boolean;
  isPhone: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isUltrawide: boolean;
}

export const useDeviceSize = (): ReturnType => {
  const [isPhone, isTablet, isLaptop, isDesktop, isUltrawide] = useMediaQuery([
    "(max-width: 480px)",
    "(min-width: 481px) and (max-width: 767px)",
    "(min-width: 768px) and (max-width: 1023px)",
    "(min-width: 1024px) and (max-width: 3439px)",
    "(min-width: 3440px)",
  ]);

  return {
    isMobile: isPhone || isTablet,
    isPhone,
    isTablet,
    isDesktop,
    isLaptop,
    isUltrawide,
  };
};
