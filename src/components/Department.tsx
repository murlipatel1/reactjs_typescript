import React, { useState } from 'react';
import { Checkbox, FormGroup, FormControlLabel, Grid, Button } from '@mui/material';


const departmentsData = [
  {
    "department": "customer_service",
    "sub_departments": [
      "support",
      "customer_success"
    ]
  },
  {
    "department": "design",
    "sub_departments": [
      "graphic_design",
      "product_design",
      "web_design"
    ]
  }
];



const Department: React.FC = () => {

  const initialSelectedDepartments = departmentsData.map((departmentData) => departmentData.department);
const initialSelectedSubDepartments = departmentsData.reduce((acc, departmentData) => [...acc, ...departmentData.sub_departments], []);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(initialSelectedDepartments);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>(initialSelectedSubDepartments);

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const departmentValue = event.target.value;
    if (event.target.checked) {
      
      setSelectedDepartments([...selectedDepartments, departmentValue]);
    } else {
      
      setSelectedDepartments(selectedDepartments.filter((dept) => dept !== departmentValue));

     
      const subDepartments = departmentsData.find((deptData) => deptData.department === departmentValue)?.sub_departments;
      if (subDepartments) {
        setSelectedSubDepartments(selectedSubDepartments.filter((subDept) => !subDepartments.includes(subDept)));
      }
    }
  };

  const handleSubDepartmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subDepartmentValue = event.target.value;
    if (event.target.checked) {
    
      setSelectedSubDepartments([...selectedSubDepartments, subDepartmentValue]);

  
      const department = departmentsData.find((deptData) => deptData.sub_departments.every((subDept) => selectedSubDepartments.includes(subDept)))?.department;
      if (department && !selectedDepartments.includes(department)) {
        
        setSelectedDepartments([...selectedDepartments, department]);
      }
    } else {
      
      setSelectedSubDepartments(selectedSubDepartments.filter((subDept) => subDept !== subDepartmentValue));

      const department = departmentsData.find((deptData) => deptData.sub_departments.some((subDept) => !selectedSubDepartments.includes(subDept)))?.department;
      if (department && selectedDepartments.includes(department)) {
        setSelectedDepartments(selectedDepartments.filter((dept) => dept !== department));
      }
    }
  };

  return (
    <>
      <h1>Welcome to Login</h1>
      <form>
        <Grid sx={{ minHeight: '60vh' }} direction="column" alignItems="center" justifyContent="center" container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormGroup>
              {departmentsData.map((departmentData) => (
                <FormControlLabel
                  key={departmentData.department}
                  control={
                    <Checkbox
                      checked={selectedDepartments.includes(departmentData.department)}
                      onChange={handleDepartmentChange}
                      value={departmentData.department}
                    />
                  }
                  label={departmentData.department}
                />
              ))}
            </FormGroup>
          </Grid>
          {selectedDepartments.length > 0 && (
            <Grid item xs={12} md={6}>
              <FormGroup>
                {departmentsData
                  .filter((deptData) => selectedDepartments.includes(deptData.department))
                  .map((deptData) => deptData.sub_departments.map((subDept) => (
                    <FormControlLabel
                      key={subDept}
                      control={
                        <Checkbox
                          checked={selectedSubDepartments.includes(subDept)}
                          onChange={handleSubDepartmentChange}
                          value={subDept}
                        />
                      }
                      label={subDept}
                    />
                  )))
                }
              </FormGroup>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Department;
