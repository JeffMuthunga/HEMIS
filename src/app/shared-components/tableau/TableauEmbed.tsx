import {Card, CardContent, CardHeader} from "@mui/material";
import React, {useState, useEffect} from "react";
import {useGetStudentsQuery} from "../../../app/main/dashboards/students/StudentsApi"; // Update this import path as needed
// import { useGetFacilitiesQuery } from './FacilitiesApi';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const CustomDashboard = () => {
    const {
        data: studentsData,
        isLoading: isLoadingStudents,
        error: studentsError,
    } = useGetStudentsQuery();
    //   const {
    //     data: facilitiesData,
    //     isLoading: isLoadingFacilities,
    //     error: facilitiesError,
    //   } = useGetFacilitiesQuery();

    const getDistribution = (data, key) => {
        if (!data) return [];
        const distribution = data.reduce((acc, item) => {
            acc[item[key]] = (acc[item[key]] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(distribution).map(([label, count]) => ({
            label,
            count,
        }));
    };

    const facultyDistribution = getDistribution(studentsData, "faculty");
    const gradeDistribution = getDistribution(studentsData, "examinationGrade");
    //   const facilityUsageTypes = getDistribution(facilitiesData, "usageType");
    const genderDistribution = getDistribution(studentsData, "sex");
    const marginalizedDistribution = getDistribution(
        studentsData,
        "marginalized"
    );

    const COLORS = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
        "#8884D8",
        "#82ca9d",
    ];

    if (isLoadingStudents) {
        return <div>Loading...</div>;
    }

    if (studentsError) {
        // return <div>Error: {studentsError}</div>;
    }

    const renderPieChart = (data, title) => (
        <Card>
            {/* <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader> */}
            <h2>{title}</h2>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                            label={({label, percent}) =>
                                `${label} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );

    const renderBarChart = (data, title, dataKey, barFill) => (
        <Card>
            {/* <CardHeader> */}
            {/* <CardTitle> */}
            <h2>{title}</h2>
            {/* </CardTitle> */}
            {/* </CardHeader> */}
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="label"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey={dataKey} fill={barFill} name={title}/>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderBarChart(
                facultyDistribution,
                "Faculty Distribution",
                "count",
                "#8884d8"
            )}
            {renderPieChart(gradeDistribution, "Grade Distribution")}
            {/* {renderBarChart(
        facilityUsageTypes,
        "Facility Usage Types",
        "count",
        "#82ca9d"
      )} */}
            {renderPieChart(genderDistribution, "Gender Distribution")}
            {renderPieChart(
                marginalizedDistribution,
                "Marginalized Status Distribution"
            )}
        </div>
    );
};

export default CustomDashboard;
