import Button from "../Component/SharedComponent/Button";
import banner from "../../src/assets/bneer.png";
import logo from '../../src/assets/h13.png'
import { useNavigate } from "react-router";

export default function Banner() {
  const navigate = useNavigate()

  const handelTask = ()=>{
    navigate('/all-task')
  }

  const handelWorker = ()=>{
    navigate('/all-worker')
  }
  return (
    <div className="bg-[#1D3E3E] text-white w-full">
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between py-10">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug">
            Deliver exceptional results <br /> with freelance professionals
          </h1>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Elevate your projects with top-notch freelance services and
            stand out by leveraging professional expertise.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Button
            onClick={handelTask}
              className="px-4 py-2 bg-[#00C4CC] hover:bg-[#00c4ccb8] text-[#0F3C3C] font-medium rounded-md transition"
              label="Find Work"
            />
            <Button
            onClick={handelWorker }
              className="px-4 py-2 border border-white text-white hover:bg-white hover:text-[#0F3C3C] transition rounded-md"
              label="Find Talent"
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 hidden md:block relative">
          <img
            src={banner}
            alt="banner"
            className="w-[280px] sm:w-[350px] lg:w-[480px] mx-auto md:mx-0 h-auto"
          />
          <div className="absolute top-30 right-20">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
