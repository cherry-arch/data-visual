
import { cn } from "@/lib/utils";

// Animation class utility to combine animation classes
export const animateElement = (
  baseClasses: string,
  {
    animation = "",
    duration = "",
    delay = "",
    repeat = "",
    fillMode = "",
    easing = "",
    direction = "",
  }: {
    animation?: string;
    duration?: string;
    delay?: string;
    repeat?: string;
    fillMode?: string;
    easing?: string;
    direction?: string;
  } = {}
) => {
  return cn(
    baseClasses,
    animation,
    duration && `duration-${duration}`,
    delay && `delay-${delay}`,
    repeat,
    fillMode,
    easing,
    direction
  );
};

// Predefined animation combinations
export const animations = {
  fadeIn: "animate-fade-in",
  scaleIn: "animate-scale-in",
  enter: "animate-enter", // Combined animation
  slideInRight: "animate-slide-in-right",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  spin: "animate-spin",
  ping: "animate-ping",
  hoverScale: "hover-scale",
  storyLink: "story-link",
};

// Create animation variants
export const createAnimationVariants = () => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
  exit: { opacity: 0, y: -20 },
});
