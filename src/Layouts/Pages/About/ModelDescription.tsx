import { ContainerScroll } from "@/components/ui/container-scroll-animation"

const DoubleScroll = () => {
  return (
    <div>  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <ContainerScroll
      titleComponent={
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center scroll-smooth">
            <span className="text-blue-400">Linear Regression</span>
          </h1>
        </div>
      }
      children={
        <div className="pb-10 sm:pb-32">
          <div className="mb-10 sm:mb-16 mt-10 text-xl sm:text-3xl font-normal text-justify-center">
            <p>
              Linear Regression is a method that{" "}
              <span className="text-blue-400 font-extrabold">
                finds the best-fitting line
              </span>{" "}
              to model the relationship between a dependent variable and
              one or more independent variables.
            </p>
            <div className="mt-10 sm:mt-20">
              This method aims to{" "}
              <span className="text-blue-400 font-extrabold">
                minimize the difference
              </span>{" "}
              between the{" "}
              <span className="text-blue-400 font-extrabold">
                actual data points{" "}
              </span>{" "}
              and the{" "}
              <span className="text-blue-400 font-extrabold">
                predicted values.{" "}
              </span>{" "}
            </div>
          </div>
        </div>
      }
    />
    <ContainerScroll
      titleComponent={
        <div>
          <h1 className="text-5xl font-bold text-center scroll-smooth">
            <span className="text-green-400">Random Forest</span>
          </h1>
        </div>
      }
      children={
        <div className="mb-16 mt-10 text-3xl font-normal text-justify-center text-black dark:text-slate-300">
          <p>
            Random forest is an algorithm that{" "}
            <span className="text-green-400 font-extrabold">
              combines the predictions of multiple decision trees
            </span>{" "}
            to improve accuracy and reduce overfitting.
          </p>
          <p className="mt-20">
            Each decision tree in the forest is trained on a{" "}
            <span className="text-green-400 font-extrabold">
              random subset{" "}
            </span>
            of the data and uses a random subset of features to make
            decisions.
          </p>
        </div>
      }
    />
  </div>
</div>
  )
}
export default DoubleScroll