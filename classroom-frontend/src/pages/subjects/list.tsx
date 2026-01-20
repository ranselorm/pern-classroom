import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS_OPTIONS } from "@/constants";
import { Subject } from "@/types";
import { useTable } from "@refinedev/react-table";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

const SubjectsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  //filters
  const departmentFilters =
    selectedDepartment === "all"
      ? []
      : [
          {
            field: "deparment",
            operator: "eq" as const,
            value: selectedDepartment,
          },
        ];

  const searchFilter = searchQuery
    ? [
        {
          field: "name",
          operator: "eq" as const,
          value: searchQuery,
        },
      ]
    : [];

  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(
      () => [
        {
          id: "code",
          accessorKey: "code",
          header: () => <p className="ml-2 column-title">Code</p>,
          cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
        },
        {
          id: "name",
          accessorKey: "name",
          header: () => <p className="column-title">Name </p>,
          cell: ({ getValue }) => <span>{getValue<string>()}</span>,
          size: 200,
          filterFn: "includesString",
        },
        {
          id: "department",
          accessorKey: "department",
          header: () => <p className="column-title">Department</p>,
          cell: ({ getValue }) => (
            <Badge variant="secondary">{getValue<string>()}</Badge>
          ),
          size: 150,
        },
        {
          id: "description",
          accessorKey: "description",
          header: () => <p className="column-title">Description</p>,
          cell: ({ getValue }) => (
            <span className="truncate line-clamp-2">{getValue<string>()}</span>
          ),
          size: 300,
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "subjects",
      pagination: { pageSize: 10, mode: "server" },
      filters: { permanent: [...departmentFilters, ...searchFilter] },
      sorters: {
        initial: [
          {
            field: "id",
            order: "desc",
          },
        ],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Subjects</h1>

      <div className="intro-row">
        <p>Quick asses to essential metrics and management tools</p>

        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon " />
            <Input
              className="pl-10 w-full"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by departments" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                {DEPARTMENTS_OPTIONS.map((department) => (
                  <SelectItem value={department.value} key={department.value}>
                    {department.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton />
          </div>
        </div>
      </div>

      <DataTable table={subjectTable} />
    </ListView>
  );
};

export default SubjectsList;
