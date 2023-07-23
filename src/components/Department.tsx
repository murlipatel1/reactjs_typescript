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
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);
  
    const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const departmentValue = e.target.value;
      if (e.target.checked) {
        
        setSelectedDepartments([...selectedDepartments, departmentValue]);
  
        
        const subDepartments = departmentsData.find((deptData) => deptData.department === departmentValue)?.sub_departments;
        if (subDepartments) {
          setSelectedSubDepartments([...selectedSubDepartments, ...subDepartments]);
        }
      } else {
        setSelectedDepartments(selectedDepartments.filter((dept) => dept !== departmentValue));
        const subDepartments = departmentsData.find((deptData) => deptData.department === departmentValue)?.sub_departments;
        if (subDepartments) {
          setSelectedSubDepartments(selectedSubDepartments.filter((subDept) => !subDepartments.includes(subDept)));
        }
      }
    };
    
    const handleSubDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const subDepartmentValue = e.target.value;
      if (e.target.checked) {
        setSelectedSubDepartments([...selectedSubDepartments, subDepartmentValue]);
      } else {
        setSelectedSubDepartments(selectedSubDepartments.filter((subDept) => subDept !== subDepartmentValue));
      }
    };
  
    return (
      <>
        <h1>Selection for Departments</h1>
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
  