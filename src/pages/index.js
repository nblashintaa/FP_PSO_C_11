import Head from "next/head";
import { BiUserPlus, BiX, BiCheck } from "react-icons/bi";
import Table from "../components/Table";
import Form from "../components/Form";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction, deleteAction } from "../redux/reducer";
import { deleteUser, getUsers } from "../lib/helper";
import { useQueryClient } from "react-query";

export default function Home() {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId);

  const queryclient = useQueryClient();
  const dispatch = useDispatch();

  const handler = () => {
    dispatch(toggleChangeAction());
  };

  const deletehandler = async () => {
    if (deleteId) {
      await deleteUser(deleteId);
      await queryclient.prefetchQuery("users", getUsers);
      await dispatch(deleteAction(null));
    }
  };

  const canclehandler = async () => {
    await dispatch(deleteAction(null));
  };

  return (
    <section>
      <Head>
        <title>Employee Management</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-10 px-4">

        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8">

          {/* HEADER */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-200 via-purple-100 to-pink-100 py-16 mb-10">

            {/* ORNAMENT */}
            <div className="absolute top-5 left-10 w-24 h-24 bg-purple-300 opacity-20 rounded-full"></div>
            <div className="absolute bottom-0 right-10 w-40 h-40 bg-pink-300 opacity-20 rounded-full"></div>

            <div className="relative z-10 text-center">
              <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                Employee Management
              </h1>

              <p className="text-gray-600 text-lg">
                Manage employee data efficiently
              </p>
            </div>
          </div>

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">

            <button
              onClick={handler}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 duration-300"
            >
              Add Employee
              <BiUserPlus size={22} />
            </button>

            {deleteId ? (
              DeleteComponent({ deletehandler, canclehandler })
            ) : null}
          </div>

          {/* FORM */}
          {visible ? (
            <div className="bg-gray-100 p-6 rounded-2xl shadow-inner mb-10">
              <Form />
            </div>
          ) : null}

          {/* TABLE */}
          <Table />

        </div>
      </main>
    </section>
  );
}

function DeleteComponent({ deletehandler, canclehandler }) {
  return (
    <div className="flex gap-4 items-center">
      <span className="font-medium text-gray-700">
        Are you sure?
      </span>

      <button
        onClick={deletehandler}
        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Yes
        <BiX size={20} />
      </button>

      <button
        onClick={canclehandler}
        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        No
        <BiCheck size={20} />
      </button>
    </div>
  );
}