const TLRDesc = () => {
  return (
    <div className=" my-96 mx-10">
      
      <h1 className="text-5xl text-red-400 font-bold text-center">Linear Regression for Temperature</h1>

      <p className="text-2xl mt-12 text-justify-center mx-48 ">
        Since temperature typically exhibits <span className="font-bold text-red-400">less variance</span>, <span className="font-bold">linear regression </span>is more suitable for predicting temperature trends due to its ability to model linear relationships effectively.
      </p>

      <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mt-64 text-purple-400">Factors</h3>
          <ul className="list-disc ml-96 text-xl ">
            <li className="ml-52 mt-10 py-3 font-normal text-slate-400">Date</li>
            <li className="ml-52 py-3 font-normal text-slate-400">
              Precipitation
            </li>
            <li className="ml-52 py-3 font-normal text-slate-400">
              Wind Speed
            </li>
            <li className="ml-52 py-3 font-normal text-slate-400">
              Wind Direction
            </li>
            <li className="ml-52 py-3 font-normal text-slate-400">
              Evapotranspiration
            </li>
          </ul>
        </div>

    </div>
  )
}
export default TLRDesc