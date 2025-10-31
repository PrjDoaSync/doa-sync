const App = () => {
  return (
    <div className="relative w-full min-h-screen">
      <img
        src="/background.png"
        alt="Background"
        className="w-full min-h-screen object-cover"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1280"
        fill="none"
        className="w-full h-auto -mt-50"
        preserveAspectRatio="none"
      >
        <path
          d="M0 188.79C959.571 -65.2643 1444.27 -60.5849 1920 188.79V1413.43H0V188.79Z"
          fill="#A5D6A7"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 720"
        fill="none"
        className="w-full h-auto -mt-50"
        preserveAspectRatio="none"
      >
        <path
          d="M0 188.79C959.571 -65.2643 1444.27 -60.5849 1920 188.79V1413.43H0V188.79Z"
          fill="#2E7D32"
        />
      </svg>
    </div>
  );
};

export default App;
