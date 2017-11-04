import { Component, OnInit, ViewEncapsulation, Input }  from '@angular/core';
import { UserDBService }                                from '../../services/user-db-service';
import {ChartPathService}                               from '../../services/chart-path.service';

import * as chartUtilities                              from './../../utilities/utilities'
import { ChartDomain }                                  from './../chartDomain';

@Component({
  selector: 'app-histogram-chart',
  templateUrl: './histogram-chart.component.html',
  styleUrls: ['./histogram-chart.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class HistogramChartComponent implements OnInit {
    @Input() gender:     string;
    @Input() formType:   string;
    @Input() isStrength: boolean;
    @Input() userFormValue: number;

    setUserBar: boolean;

    theme = 'dark';

    single: any[];
    multi: any[];
    chartData: any[];

    chartName: string;
    // view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = true;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = 'Weight Lifted';
    showYAxisLabel = true;
    yAxisLabel = 'Persons Per Category';

    colorScheme = {
        domain: ['#647c8a', '#3f51b5', '#2196f3',
            '#00b862', '#afdf0a', '#a7b61a', '#f3e562',
            '#ff9800', '#ff5722', '#ff4514']
    };
    colorScheme2: ChartDomain;

    constructor(private userDB: UserDBService, private chartPathService: ChartPathService) {
        this.chartData = new Array();
        this.colorScheme2 = new ChartDomain();
        this.colorScheme2.domain = [];
        this.setUserBar = false;
    }

    ngOnInit() {
        // CREATE VARIABLE TO PASS TO RETURN LIST THAT RETURNS THE CORRECT CHART DATA
        this.chartPathService.currentMessage.subscribe( path => {
            console.log(path);
            this.userDB.returnChartData(path, this.isStrength).subscribe(snapshot => {   // <--- snapshot contains the object from the database
                let name, entry, suffix, value;
                const endValue: number = chartUtilities.getEndValue(this.gender, this.formType);  // <!-- end value needs to be determined by lift choice

                console.log(snapshot);

                if (this.isStrength) {
                    suffix = parseInt(snapshot[1].$key, 10) * 10;

                    for (let i = 0; i < snapshot.length; i++) {
                        if (i === 0) {
                            name =  'Less than ' + (snapshot[(i + 1)].$key * 10) + 'KG';
                            value = snapshot[(i + 1)].$key * 10;
                        } else if (i === (snapshot.length - 1)) {
                            name = 'Over ' + (snapshot[i].$key * 10) + 'KG';
                            value = snapshot[i].$key * 10;
                        } else {
                            suffix += endValue;
                            name = (snapshot[i].$key * 10) + '-' + suffix + 'KG';
                            value = snapshot[i].$key * 10;
                        }

                        if (this.userFormValue < value && i === 0 &&  !this.setUserBar) {
                            this.setUserBar = true;

                            this.colorScheme2.domain.push('#FFD700');
                            entry = {
                                name: 'YOUR VALUE',
                                value:  snapshot[i].$value
                            };
                            this.chartData = [...this.chartData, entry];

                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                        } else if (this.userFormValue < value && !this.setUserBar) {
                            this.setUserBar = true;

                            this.colorScheme2.domain.push('#FFD700');
                            entry = {
                                name: 'YOUR VALUE',
                                value:  snapshot[i - 1].$value
                            };
                            this.chartData = [...this.chartData, entry];

                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                        } else if (this.userFormValue > value && i === (snapshot.length - 1) &&  !this.setUserBar) {
                            this.setUserBar = true;

                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                            this.chartData = [...this.chartData, entry];

                            this.colorScheme2.domain.push('#FFD700');
                            entry = {
                                name: 'YOUR VALUE',
                                value:  snapshot[i].$value
                            };
                        } else {
                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                        }

                        this.chartData = [...this.chartData, entry];
                    }
                } else if (this.formType === 'bmi') {
                    suffix = parseInt(snapshot[1].$key, 10);

                    for (let i = 0; i < snapshot.length; i++) {
                        if (i === 0) {
                            name =  'Less than ' + (snapshot[(i + 1)].$key);
                            value = snapshot[(i + 1)].$key;
                        } else if (i === (snapshot.length - 1)) {
                            name = 'Over ' + (snapshot[i].$key);
                            value = snapshot[i].$key;
                        } else {
                            suffix += endValue;
                            name = (snapshot[i].$key) + '-' + suffix;
                            value = snapshot[(i + 1)].$key;
                        }

                        if (this.userFormValue < value && i === 0 &&  !this.setUserBar) {
                            this.setUserBar = true;

                            this.colorScheme2.domain.push('#FFD700');
                            entry = {
                                name: 'YOUR VALUE',
                                value:  snapshot[i].$value
                            };
                            this.chartData = [...this.chartData, entry];

                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                        } else if (this.userFormValue < value && !this.setUserBar) {
                            this.setUserBar = true;

                            this.colorScheme2.domain.push('#FFD700');
                            entry = {
                                name: 'YOUR VALUE',
                                value:  snapshot[i - 1].$value
                            };
                            this.chartData = [...this.chartData, entry];

                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                        } else if (this.userFormValue > value && i === (snapshot.length - 1) &&  !this.setUserBar) {
                            this.setUserBar = true;

                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                            this.chartData = [...this.chartData, entry];

                            this.colorScheme2.domain.push('#FFD700');
                            entry = {
                                name: 'YOUR VALUE',
                                value:  snapshot[i].$value
                            };
                        } else {
                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                        }

                        this.chartData = [...this.chartData, entry];
                    }
                } else {
                    suffix = parseInt(snapshot[1].$key, 10) * 100;

                    for (let i = 0; i < snapshot.length; i++) {
                        if (i === 0) {
                            name =  'Less than ' + ((snapshot[(i + 1)].$key) * 100);
                            value = snapshot[(i + 1)].$key * 100;
                        } else if (i === (snapshot.length - 1)) {
                            name = 'Over ' + ((snapshot[i].$key) * 100);
                            value = snapshot[i].$key * 100;
                        } else {
                            suffix += endValue;
                            name = ((snapshot[i].$key) * 100)  + '-' + suffix;
                            value = snapshot[i].$key * 100;
                        }

                        if (this.userFormValue < value && i === 0 &&  !this.setUserBar) {
                            this.setUserBar = true;

                            this.colorScheme2.domain.push('#FFD700');
                            entry = {
                                name: 'YOUR VALUE',
                                value:  snapshot[i].$value
                            };
                            this.chartData = [...this.chartData, entry];

                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                        } else if (this.userFormValue < value && !this.setUserBar) {
                            this.setUserBar = true;

                            this.colorScheme2.domain.push('#FFD700');
                            entry = {
                                name: 'YOUR VALUE',
                                value:  snapshot[i - 1].$value
                            };
                            this.chartData = [...this.chartData, entry];

                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                        } else if (this.userFormValue > value && i === (snapshot.length - 1) &&  !this.setUserBar) {
                            this.setUserBar = true;

                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                            this.chartData = [...this.chartData, entry];

                            this.colorScheme2.domain.push('#FFD700');
                            entry = {
                                name: 'YOUR VALUE',
                                value:  snapshot[i].$value
                            };
                        } else {
                            this.colorScheme2.domain.push('#1E90FF');
                            entry = {
                                name: name,
                                value: snapshot[i].$value
                            };
                        }

                        this.chartData = [...this.chartData, entry];
                    }
                }

                this.chartName = path.split('/').join(' ');
                const re = /[^0-9](?=[0-9])/g; // <!-- adds space between numbers and words
                this.chartName = this.chartName.replace(re, '$& ');
            });

            this.chartPathService.messageSource.complete(); // <--completes chart data stream to prevent leak
        });
    }

    onSelect(event) {
        console.log(event);
    }
}
