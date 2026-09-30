import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TFTable({
  columns,
  data,
  getRowKey,
  emptyMessage = "No data available",

  // Customization props
  tableClassName = "",
  headerClassName = "",
  headerRowClassName = "",
  headerCellClassName = "",
  bodyClassName = "",
  rowClassName = "",
}) {
  return (
    <div className={`w-full overflow-x-auto rounded-md border ${tableClassName}`}>
      <Table>

        {/* Table Header */}
        <TableHeader className={headerClassName}>
          <TableRow className={headerRowClassName}>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={column.headerClassName || headerCellClassName}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody className={bodyClassName}>
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                key={getRowKey ? getRowKey(row) : index}
                className={
                  typeof rowClassName === "function"
                    ? rowClassName(row)
                    : rowClassName
                }
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={column.cellClassName || ""}
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key] ?? "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </div>
  );
}