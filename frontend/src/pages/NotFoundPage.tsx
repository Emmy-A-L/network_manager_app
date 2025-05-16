import { Link } from "react-router-dom"


const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-gray-300">
        <h1 className="text-8xl font-bold">404!</h1>
        <p>You have found our hidden page (that doesn't exist)</p>
        <p>You need to Login to use this site</p>
        <div>
            <Link to="/account/login">Login</Link>
        </div>
    </div>
  )
}

export default NotFoundPage