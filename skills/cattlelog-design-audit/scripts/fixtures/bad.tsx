export function Bad() {
  return (
    <div className="bg-slate-100 dark:bg-black p-[21px] mt-5 gap-4 z-[9999] text-[13px] outline-none">
      <div onClick={go} style={{ color: '#6DAEDF', background: '#123456' }}>x</div>
      <img src="/a.png" alt="" />
      <div role="dialog" aria-labelledby="t"><h2 id="t">Hi</h2></div>
      <button className="text-blue-100">no</button>
    </div>
  );
}
