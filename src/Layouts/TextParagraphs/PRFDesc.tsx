const PRFDesc = () => {
  return (
    <div className=" my-96 mx-10">
      <h1 className="text-5xl text-red-400 font-bold text-center">
        {" "}
        Random Forest for Temperature
      </h1>

      <p className="text-2xl mt-12 text-justify-center mx-48 ">
        Since temperature typically exhibits{" "}
        <span className="font-bold text-red-400">less variance</span>,{" "}
        <span className="font-bold">linear regression </span>is more suitable
        for predicting temperature trends due to its ability to model linear
        relationships effectively.
      </p>
      
    </div>
  );
};
export default PRFDesc;
