import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookies, setCookies } from "cookies-next";


export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const  [user, setUser] = useState(false)
    const [token, setToken] = useState("")

    const router = useRouter();

    useEffect(() => {
        if(localStorage && localStorage.getItem("token") ) {
                router.push("/")
        }
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
          Adr: email,
          MPass: password,
        };
    
        console.log(payload)

        let response = await fetch(
          process.env.REACT_APP_STRAPI_API_URL + "/utilisateur/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        ).then((res) => {
          if (res.status) {
           console.log(res.message)
          } else {
           console.log("Probléme de connexion")
          }
          return res;
        });
    
        if (response != undefined) {
          let whoami = await response.json();
          if (whoami.data.utilisateur != undefined) {
            localStorage.setItem("user", JSON.stringify(whoami.data.utilisateur));
          }
          if (whoami.data.token != undefined) {
            localStorage.setItem("token", JSON.stringify(whoami.data.token));
          }
    
          setUser(whoami.data.utilisateur);
          setToken(whoami.data.token);
        console.log(whoami.message)

        console.log({user: user})
        console.log({token: token})
        console.log(localStorage.getItem("user"))
        console.log(localStorage.getItem("token"))

        }
      };



    return (
        <form onSubmit={onSubmit}>
            <div className="bg-gray-900 text-gray-900 py-32">
                <p className="text-center text-3xl font-medium text-white my-10">
                    Welcome to
                    <br/>
                    Aghsalni
                </p>
                <p className="text-center text-xl font-medium text-gray-100 my-3">Super admin login interface</p>
                <div className="max-w-xl m-auto bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="email" name="email" type="text" placeholder="enter your email"
                        onChange={(e) => {setEmail(e.target.value)}} 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="enter your password"
                            onChange={
                                (e) => {
                                    setPassword(e.target.value);
                                }
                            }/>
                        <p className="text-red text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox"/>
                        <label className="ml-1 font-medium">Remember me</label>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                        <input type="submit" value="Sign in" className="text-white hover:bg-blue-dark bg-gray-900 font-bold py-2 px-4 rounded"
                            
                         />
                           
                        <a className="inline-block align-baseline font-medium text-sm text-blue hover:text-blue-darker" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </div>
            </div>
        </form>
    );
}
