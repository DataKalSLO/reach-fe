import React from 'react';
import MyStuffWrapper from '../../my-stuff/MyStuffWrapper';
import GraphCard from '../../preview-cards/graph-card/GraphCard';
import { GraphMetaData } from '../../redux/graphs/types';

const sampleGraph: GraphMetaData = {
  graphId: '043707c7-b204-4150-aac8-d76809613da3',
  userId: 'test@gmail.com',
  timeStamp: 1591139888,
  userName: 'test account',
  graphTitle:
    'Covid-19 New vs. Total Confirmed Cases in San Luis Obispo County',
  snapshotUrl:
    'https://hourglass-graph-snapshots.s3.us-east-2.amazonaws.com/043707c7-b204-4150-aac8-d76809613da3.svg',
  dataSources: [
    {
      datasetName: 'covid_cases_slo',
      columnNames: ['day'],
      seriesType: 'X_AXIS'
    },
    {
      datasetName: 'covid_cases_slo',
      columnNames: ['new_cases', 'total_cases'],
      seriesType: 'Y_AXIS'
    }
  ],
  graphOptions: {
    title: 'Covid-19 New vs. Total Confirmed Cases in San Luis Obispo County',
    yConfig: { title: 'Number of Cases' },
    seriesConfigs: [
      {
        name: 'New Confirmed Cases',
        color: '#99D6D7',
        dataLabels: false,
        seriesType: 'column'
      },
      {
        name: 'Total Confirmed Cases',
        color: '#F2D17C',
        dataLabels: false,
        seriesType: 'spline'
      }
    ]
  }
};

export default function MyStuffCharts() {
  return (
    <MyStuffWrapper title="My Charts">
      {/* TODO: replace this with the content for the gallery view */}
      <GraphCard {...sampleGraph} />
      <React.Fragment />
    </MyStuffWrapper>
  );
}
