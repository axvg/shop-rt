import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, y: 0, scale: 1.1 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 0, scale: 1.1 },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;