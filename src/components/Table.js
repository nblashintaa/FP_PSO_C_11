import React from "react";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../redux/reducer";

const Table = () => {
  const { isLoading, isError, data, error } = useQuery(
    "users",
    getUsers
  );

  if (isLoading)
    return <div className="text-center py-5">Loading...</div>;

  if (isError)
    return <div>Error: {error.message}</div>;

  return (
    <div className="w-full overflow-x-auto rounded-2xl shadow-xl">

      <table className="w-full min-w-[900px] bg-white rounded-2xl overflow-hidden">

        {/* HEADER */}
        <thead>
          <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Salary</th>
            <th className="px-6 py-4 text-left">Birthday</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>

          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data?.map((obj, i) => (
            <Tr {...obj} key={i} />
          ))}
        </tbody>

      </table>
    </div>
  );
};

function Tr({ _id, name, avatar, email, salary, date, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));

    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="border-b hover:bg-indigo-50 duration-200">

      {/* NAME */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">

          {avatar ? (
            <img
              src={avatar}
              alt=""
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="h-11 w-11 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold uppercase">
              {name?.charAt(0)}
            </div>
          )}

          <span className="font-semibold text-gray-700">
            {name || "Unknown"}
          </span>

        </div>
      </td>

      {/* EMAIL */}
      <td className="px-6 py-4 text-gray-600">
        {email}
      </td>

      {/* SALARY */}
      <td className="px-6 py-4 text-gray-600">
        Rp {salary}
      </td>

      {/* DATE */}
      <td className="px-6 py-4 text-gray-600">
        {date}
      </td>

      {/* STATUS */}
      <td className="px-6 py-4">
        <span
          className={`px-4 py-1 rounded-full text-sm text-white ${
            status === "Active"
              ? "bg-green-500"
              : "bg-rose-500"
          }`}
        >
          {status}
        </span>
      </td>

      {/* ACTION */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-4">

          <button
            onClick={onUpdate}
            className="bg-yellow-400 p-2 rounded-lg hover:scale-110 duration-200"
          >
            <BiEdit size={20} color="white" />
          </button>

          <button
            onClick={onDelete}
            className="bg-rose-500 p-2 rounded-lg hover:scale-110 duration-200"
          >
            <BiTrashAlt size={20} color="white" />
          </button>

        </div>
      </td>
    </tr>
  );
}

export default Table;