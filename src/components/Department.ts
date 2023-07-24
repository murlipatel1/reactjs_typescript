// Department.ts
export interface SubDepartment {
  name: string;
  selected: boolean;
}

export interface Department {
  department: string;
  sub_departments: SubDepartment[];
  expanded: boolean;
  selected: boolean;
}
