export function MotionBad() {
  return (
    <div>
      <div className="transition-all duration-500 hover:bg-blue-800">a</div>
      <div className="duration-[420ms] ease-[cubic-bezier(.2,.8,.2,1)]">b</div>
      <div className="animate-bounce animate-spin">c</div>
      <div className="transition-[width,height] duration-200">d</div>
      <motion.div transition={{ duration: 0.45 }} />
      <p className="bg-blue-300 text-blue-500">low contrast pair</p>
      <p className="bg-blue-700 text-black-0">fine pair</p>
      <p className="text-black-400">pale copy</p>
    </div>
  );
}
