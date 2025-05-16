import "../App.css";
import LoginButton from "../component/LoginButton";
import RegisterButton from "../component/RegisterButton";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center image">
      <div className="flex flex-col justify-center items-center gap-12 bg-gray-400/20 backdrop-blur-sm rounded-lg p-10 w-2/3 h-2/3">
        <h1 className="text-4xl font-serif text-gray-300 text-center">
            Monitor Devices On Your Network Seamlessly With our Advanced Monitoring
            Tools.
        </h1>


        <div className="flex gap-4 justify-center items-center">
            <LoginButton />

            <RegisterButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
