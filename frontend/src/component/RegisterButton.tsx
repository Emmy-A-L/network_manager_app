import { Link } from "react-router-dom"


const RegisterButton = () => {
  return (
    <Link
        to="/account/register"
        id="Register"
        className="bg-violet-500 text-gray-800 text-2xl font-mono pl-6 pr-6 pt-2 pb-2 rounded-lg hover:bg-violet-600 transition duration-300 ease-in-out"
        >
        Register
    </Link>
  )
}

export default RegisterButton