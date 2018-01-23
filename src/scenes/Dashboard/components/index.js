import React, { Component } from 'react';


// import 'font-awesome/css/font-awesome.css';
import styled from "styled-components";
import { Chart } from 'primereact/components/chart/Chart';
import {InputText} from 'primereact/components/inputtext/InputText';
// import {Bar} from 'react-chartjs-2';


class DashboardView extends Component {
    
    render() {
        var data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    fill : false,
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    fill : false,
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]    
        };

        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>BarChart</h1>
                        <p>A bar chart or bar graph is a chart that presents Grouped data with rectangular bars with lengths proportional to the values that they represent.</p>
                    </div>
                </div>

                <Chart type="line" data={data} width = {45}/>

            </div>
        )
    }
}

export default DashboardView;;