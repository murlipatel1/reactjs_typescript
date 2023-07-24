// DepartmentList.tsx
import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';

import { Department } from './Department';

interface DepartmentListProps {
  data: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ data }) => {
  const [departments, setDepartments] = useState<Department[]>(data);

  const handleExpandCollapse = (index: number) => {
    setDepartments((prevDepartments) => {
      const newDepartments = [...prevDepartments];
      newDepartments[index].expanded = !newDepartments[index].expanded;
      return newDepartments;
    });
  };

  const handleDepartmentSelection = (index: number) => {
    setDepartments((prevDepartments) => {
      const newDepartments = [...prevDepartments];
      const department = newDepartments[index];
      department.selected = !department.selected;
      if (department.selected) {
        department.sub_departments.forEach((subDept) => {
          subDept.selected = true;
        });
      } else {
        department.sub_departments.forEach((subDept) => {
          subDept.selected = false;
        });
      }
      return newDepartments;
    });
  };

  const handleSubDepartmentSelection = (
    departmentIndex: number,
    subDepartmentIndex: number
  ) => {
    setDepartments((prevDepartments) => {
      const newDepartments = [...prevDepartments];
      const subDepartment = newDepartments[departmentIndex].sub_departments[
        subDepartmentIndex
      ];
      subDepartment.selected = !subDepartment.selected;
      if (subDepartment.selected) {
        const allSelected = newDepartments[departmentIndex].sub_departments.every(
          (subDept) => subDept.selected
        );
        if (allSelected) {
          newDepartments[departmentIndex].selected = true;
        }
      } else {
        newDepartments[departmentIndex].selected = false;
      }
      return newDepartments;
    });
  };

  return (
    <List>
      {departments.map((department, index) => (
        <React.Fragment key={index}>
          <ListItem button onClick={() => handleExpandCollapse(index)}>
            <ListItemIcon>
              {department.expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </ListItemIcon>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={department.selected}
                tabIndex={-1}
                disableRipple
                onClick={() => handleDepartmentSelection(index)}
              />
            </ListItemIcon>
            <ListItemText primary={department.department} />
          </ListItem>
          <Collapse in={department.expanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.sub_departments.map((subDepartment, subIndex) => (
                <ListItem
                  key={subIndex}
                  button
                  onClick={() =>
                    handleSubDepartmentSelection(index, subIndex)
                  }
                  sx={{ pl: 4 }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={subDepartment.selected}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
