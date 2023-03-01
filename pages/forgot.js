import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Forgot = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
  };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <div className="min-h-screen">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {router.query.token ? <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Update Password</h2> : <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot Password</h2>}
            <p className="mt-2 text-center text-sm text-gray-600">
              Or&nbsp;
              <Link href={"/login"} className="font-medium text-red-600 hover:text-red-500">
                Login
              </Link>
            </p>
          </div>
          {router.query.token && (
            <div>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="password" className="sr-only">
                    New Password
                  </label>
                  <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="password" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm" placeholder="New Password" />
                </div>
                <div>
                  <label htmlFor="cpassword" className="sr-only">
                    Confirm New Password
                  </label>
                  <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="password" autoComplete="cpassword" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm" placeholder="Confirm New Password" />
                </div>
              </div>
              <div>
                <button onClick={()=>{}} type="submit" className="group mt-8 relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Continue
                </button>
              </div>
              {password && password != cpassword && <span className="text-red-600">Passwords don't match</span>}
              {password && password == cpassword && <span className="text-green-600">Passwords match</span>}
            </div>
          )}
          {!router.query.token && (
            <div>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input onChange={handleChange} value={email} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm" placeholder="Email address" />
                </div>
              </div>
              <div>
                <button onClick={()=>{}} type="submit" className=" mt-8 group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forgot;
