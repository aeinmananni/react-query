type TableProps<T> = {
  columnTbl: T;
  rowTble: T[];
  children?: (v: { action: T }) => React.ReactNode;
};

export default function Table<T extends Record<keyof T, string>>({
  columnTbl,
  rowTble,
  children,
}: TableProps<T>) {
  return (
    <table className="w-1/2 h-max border">
      <thead>
        <tr className="">
          {Object.keys(columnTbl).map((it, index) => (
            <th className="border-2" key={index}>
              {columnTbl[it as keyof T]}
            </th>
          ))}
          <th className="border-2">ردیف</th>
        </tr>
      </thead>
      <tbody>
        {rowTble.map((item, index) => (
          <tr key={index}>
            {Object.keys(columnTbl).map((it, index) => (
              <td className="border-2 text-center p-2" key={index}>
                {it === 'operation' ? children?.({ action: item }) : item[it as keyof T]}
              </td>
            ))}
            <td className="text-center border-2">{index + 1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
