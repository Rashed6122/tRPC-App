function Pinned() {
  return (
    <div>
      <div className="relative min-h-screen md:flex">
        <div className="sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
          <a href="#" className="text-white flex items-center space-x-2 px-4">
            <span className="text-2xl font-extrabold">Pinned Tasks</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Pinned;
