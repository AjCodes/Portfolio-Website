import { motion } from 'framer-motion';

/**
 * ScrollReveal — reusable scroll-triggered animation wrapper.
 *
 * Presets:
 *   fade-up     — translate Y 40px → 0, opacity 0 → 1
 *   fade-left   — translate X -40px → 0, opacity 0 → 1
 *   fade-right  — translate X 40px → 0, opacity 0 → 1
 *   scale-in    — scale 0.92 → 1, opacity 0 → 1
 *   blur-in     — filter blur(8px) → 0, opacity 0 → 1
 *
 * For stagger, wrap children in ScrollReveal and set stagger prop.
 * Each direct child will be auto-wrapped in a motion.div with stagger delay.
 */

const presets = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-left': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  'fade-right': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-in': {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  'blur-in': {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};

const ScrollReveal = ({
  children,
  preset = 'fade-up',
  delay = 0,
  duration = 0.7,
  threshold = 0.2,
  stagger = 0,
  className = '',
  as = 'div',
  style,
  once = true,
  ...rest
}) => {
  const { hidden, visible } = presets[preset] || presets['fade-up'];

  const MotionTag = motion[as] || motion.div;

  // Stagger mode: wrap each child in its own reveal
  if (stagger > 0) {
    const childArray = Array.isArray(children) ? children : [children];

    return (
      <MotionTag
        className={className}
        style={style}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: stagger,
              delayChildren: delay,
            },
          },
        }}
        {...rest}
      >
        {childArray.map((child, i) => (
          <motion.div
            key={child?.key || i}
            variants={{
              hidden,
              visible: {
                ...visible,
                transition: { duration, ease: [0.25, 0.1, 0.25, 1] },
              },
            }}
          >
            {child}
          </motion.div>
        ))}
      </MotionTag>
    );
  }

  // Single element mode
  return (
    <MotionTag
      className={className}
      style={style}
      initial={hidden}
      whileInView={visible}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default ScrollReveal;
