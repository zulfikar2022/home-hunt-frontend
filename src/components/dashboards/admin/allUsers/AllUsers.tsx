/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { IUser } from "../../landlord/rentalRequests/RentalRequests";
import { BASE_URL } from "../../../../../utils/constants";
import { TMetadata } from "@/common_pages/Rentals";
import Pagination from "@/components/utils-components/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteConfirmation from "@/components/utils-components/DeleteConfirmation";
import toast from "react-hot-toast";

const AllUsers = () => {
  const [users, setUsers] = useState<IUser[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [metadata, setMetadata] = useState<TMetadata | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/users`, {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          cache: "no-store",
        });
        const data = await response.json();

        setMetadata(data.data.metadata);
        setUsers(data.data.users);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const onPageChange = async (page: number) => {
    console.log(page);
    const res = await fetch(`${BASE_URL}/admin/users?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();

    setUsers(data.data.rentals);
    setMetadata(data.data.metadata);
  };

  const handleDelete = async (id: string) => {
    try {
      console.log("Inside delete: ", id);
      const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUsers(users.filter((user) => user._id !== id));
      }
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    }
  };
  const handleDeactivateAndDeactivate = async (id: string) => {
    try {
      console.log("Inside delete: ", id);
      const res = await fetch(`${BASE_URL}/admin/users/change-status/${id}`, {
        method: "GET",
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        const targetUser = users.find((user) => user._id === id);
        if (targetUser) {
          targetUser.isDeactivated = !targetUser.isDeactivated;
        }
        const newUsers = users.filter((user) => user._id !== id);
        newUsers.push(targetUser as IUser);
        setUsers(newUsers);
      }
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "An error occurred");
    }
  };

  if (loading) return <div>Loading...</div>;
  console.log(users);
  return (
    <div className="flex flex-col justify-center items-center my-4">
      <h1 className="font-bold text-3xl mb-3">All Users here</h1>

      <div className="w-[95%]">
        {users?.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>isVerified</TableHead>
                <TableHead>isDeactivated</TableHead>
                <TableHead>isDeleted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isVerified ? "true" : "false"}</TableCell>
                  <TableCell>{user.isDeactivated ? "true" : "false"}</TableCell>
                  <TableCell>{user.isDeleted ? "true" : "false"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {!user.isDeactivated && (
                        <DeleteConfirmation
                          buttonValue="Deactivate"
                          description="Are you sure you want to deactivate this user?"
                          onConfirm={() =>
                            handleDeactivateAndDeactivate(user._id)
                          }
                        >
                          <Button
                            className="hover:cursor-pointer "
                            variant="outline"
                          >
                            Deactivate
                          </Button>
                        </DeleteConfirmation>
                      )}
                      {user?.isDeactivated && (
                        <DeleteConfirmation
                          buttonValue="Activate"
                          description="Are you sure you want to activate this user?"
                          onConfirm={() =>
                            handleDeactivateAndDeactivate(user._id)
                          }
                        >
                          <Button
                            className="hover:cursor-pointer bg-green"
                            variant="outline"
                          >
                            Activate
                          </Button>
                        </DeleteConfirmation>
                      )}
                      <DeleteConfirmation
                        buttonValue="Delete"
                        description="Are you sure you want to delete this user?"
                        onConfirm={() => handleDelete(user._id)}
                      >
                        <Button
                          className="hover:cursor-pointer "
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </DeleteConfirmation>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <Pagination
        metadata={
          metadata || { eachPageItem: 5, totalPages: 1, currentPage: 1 }
        }
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AllUsers;
