const Loader = () => {
  let circleCommonClasses = "h-3 w-3 bg-primary rounded-full";

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
};

export default Loader;
