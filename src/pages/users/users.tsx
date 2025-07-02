import { useQuery } from "@tanstack/react-query";
import { Table } from "../../components";
import { UserType } from "../../models";
import axios from "axios";
const column: Record<keyof Omit<UserType, "userId">, string> = {
  firstName: "نام",
  lastName: "نام خانوادگی",
  email: "ایمیل",
};

export default function UsersPage() {
  const { isPending, data } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      const result = await axios.get("/api/users/Get/All");
      return result.data;
    },
  });
  return (
    <div className="flex justify-center  w-full h-full p-3 overflow-y-auto">
      {isPending ? (
        <h1>Loading...</h1>
      ) : (
        <Table columnTbl={column} rowTble={data} />
      )}
    </div>
  );
}
