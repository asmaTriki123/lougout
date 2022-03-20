import React, {useEffect, useState} from "react";
import Layout from "../layout/Layout";
import EditUser from "../components/modal/edit/EditUser";
import {useRouter} from "next/router";
import Delete from "../components/modal/delete/DeleteConfirmation";
import AddUser from "../components/modal/add/AddUser";

function Index(props) {







    const [searchby, setSearchby] = useState("id");

    const [users, setUsers] = useState()
    const [user, setUser] = useState()
    const [token, setToken] = useState()
    const [status, setStatus] = useState("false")

    const router = useRouter()


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUser(JSON.parse(localStorage.getItem('user')))
            setToken(JSON.parse(localStorage.getItem('token')))
        } else {
            router.push("/auth/login")
        }
    }, [])

    useEffect(() => {
        setUsers(props.users)
        console.log({users : users})
    })

    const approveUser = (id) => {

        let payload = JSON.stringify({
          status: true,
        });
    
        fetch(
          process.env.REACT_APP_STRAPI_API_URL +
            "/users/" +
            id,
          {
            method: "PUT",
            headers: { Authorization: "Bearer " + token },
            body: payload,
          }
        ).then((res) => {
          console.log(res);
          if (!res.ok) {
            console.log("Probléme de modification")
          }
          if (res.ok) {
            console.log('Modification effectuée avec succeé')
    
            const payload = {
              identifier,
              password,
            };
    
            fetch(process.env.REACT_APP_STRAPI_API_URL + "/auth/local", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.user) {
                  localStorage.setItem("user", JSON.stringify(res.user));
                  localStorage.setItem("token", JSON.stringify(res.jwt));
                  router.push("/load#edit-data");
                }
              });
          }
        });
      }


    return (
        <div className="">
            <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
                <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0">
                    <h3 className="text-5xl my-3">Stations Lavages</h3>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="lg:flex items-center">
                                <div className="relative w-full px-4 max-w-full flex">
                                    <select className="p-2 rounded-tl-xl rounded-bl-xl   bg-gray-100 justify-start"
                                        onChange={
                                            (e) => {
                                                setSearchby(e.target.value);
                                                console.log(e, searchby);
                                            }
                                    }>
                                        <option value="id">All</option>
                                        <option value="id">ID</option>
                                        <option value="type">Phone</option>
                                    </select>
                                    <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl  border border-gray-100 p-2  item-center">
                                        {/* <figure className="w-5 h-5">
                                            <img src="/search_icon.svg" className="w-5 h-5"/>
                                </figure> */}
                                        <input type="text" placeholder="Search" className="placeholder-gray-500 w-full font-medium focus:outline-none"
                                            onChange={
                                                (e) => {
                                                    setSearch(e.target.value);
                                                }
                                            }/>
                                    </div>
                            </div>
                            <div className=" w-full px-4 max-w-full gap-5">
                                <select className="m-3 lg:mt-0 lg:absolute right-0  p-2 text-xs font-bold bg-gray-100 rounded-xl top-5">
                                     <option>Bulk action</option>
                                    <option>Expor .csv</option>
                                    <option>Delete</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="items-center  w-full border-collapse rounded-xl">
                            <thead className="rounded-xl">
                                <tr className="bg-gray-900 rounded-xl text-gray-100">
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        <input type="checkbox"/>
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        ID
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                       Nom de la station
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        email
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        role
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        statut
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        latitude
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        longitude
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody> {
                                users ?. map((user) => (
                                    <tr className="font-medium">
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            <input type="checkbox"/>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {
                                            user._id.slice(0,5)
                                        } </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {
                                            user.Nom_station
                                        } </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {
                                            user.email
                                        } </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {
                                            user.Role
                                        } </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {
                                            user.statut ? <span className="text-green-500">Confirmer</span> : <span className="text-red-500">Non confirmer</span>
                                        } </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {
                                            user.latitude
                                        } </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                            {
                                            user.longitude
                                        } </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex">
                                            <div className="rounded-full mx-1 p-2 bg-gray-100">
                                                <EditUser user={
                                                    user.user
                                                }/>
                                            </div>
                                            <div className="rounded-full mx-1 p-2 bg-blue-500">
                                                <button className="rounded-full focus:outline-none"
                                                    onClick={
                                                        () => {
                                                            approveUser(user.user.id)
                                                        }
                                                }>
                                                    <figure className="w-3 h-3">
                                                        <img src="/valid.svg"/>
                                                    </figure>
                                                </button>
                                            </div>
                                            <div className="rounded-full mx-1 p-2 bg-red-500">
                                                <Delete/>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            } </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
}

export default Layout(Index);




/*export async function getServerSideProps(context) {

    let res = await fetch(process.env.REACT_APP_STRAPI_API_URL + "http://localhost:3001/utilisateur/getAll");
    let users = await res.json()
    if (!users) {
        return {
            redirect: {
                destination: '',
                permanent: false
            }
        }
    }
    return {props: {
            users
        }}

}*/
