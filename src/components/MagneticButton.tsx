import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

type MagneticProps = HTMLMotionProps<"a"> & { className?: string };

export default function MagneticButton({
  children,
  className = "",
  ...rest
}: MagneticProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.a
      {...rest}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
        x.set(((e.clientX - r.left) - r.width / 2) * 0.15);
        y.set(((e.clientY - r.top) - r.height / 2) * 0.25);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: sx, y: sy }}
      className={`inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 transition ${className}`}
    >
      {children}
    </motion.a>
  );
}
