import React, { useState, Fragment, ChangeEvent, useEffect } from 'react';
import FormTextField from './FormTextField';
import FormBlock from './FormBlock';

import {
  Grid,
  Switch,
  FormControlLabel,
  styled,
  Box,
  Divider
} from '@material-ui/core';
import { FormSelectionField } from './FormSelectionField';
import ColorPicker from './ColorPicker';
import { ColorResult, ColorChangeHandler } from 'react-color';
import { GraphRecord } from '../../redux/graphs/types';
import { GraphPrebuiltProps } from './types';
import { isUndefined, isNull } from 'util';
import {
  DataLabelsOptionsObject,
  YAxisOptions,
  XAxisOptions,
  TitleOptions,
  SeriesOptionsType
} from 'highcharts';
import { theme } from '../../theme/theme';
import { updateGraphAction } from '../../redux/graphs/actions';
import { useDispatch } from 'react-redux';
import Button from '../../common/components/Button';

interface SeriesProps {
  title: string;
  subtitle: string;
  allow_3d: boolean;
  dataLabels: boolean;
  xAxis: { name: string; prefix: string; suffix: string };
  yAxis: {
    title: string;
    name: string;
    prefix: string;
    suffix: string;
    color: string;
  };
  stack: { name: string; type: string };
}

const GRAPH_LABEL = 'Graph Formatting:';
const X_LABEL = 'X-Axis Formatting:';
const Y_LABEL = 'Y-Axis Formatting:';
const SERIES_LABEL = 'Series Formatting:';
const STACK_LABEL = 'Stack Formatting:';
const types = ['line', 'pie', 'bar', 'column'];

export default function FormattingForm({ graph }: GraphPrebuiltProps) {
  // TODO: add ID to series
  const graphState = createFormatOptions(graph);
  const [formatState, setFormatState] = useState(graphState);
  const dispatch = useDispatch();

  useEffect(() => {
    const graphState = createFormatOptions(graph);
    setFormatState(graphState);
  }, [graph]);

  const handleTitleChange = (title: string) => {
    setFormatState({ ...formatState, title: title });
  };

  const handleSubtitleChange = (subtitle: string) => {
    setFormatState({ ...formatState, subtitle: subtitle });
  };

  const handleXTitleChange = (title: string) => {
    setFormatState({
      ...formatState,
      xAxis: { ...formatState.xAxis, name: title }
    });
  };

  const handleXPrefixChange = (prefix: string) => {
    setFormatState({
      ...formatState,
      xAxis: { ...formatState.xAxis, prefix: prefix }
    });
  };

  const handleXSuffixChange = (suffix: string) => {
    setFormatState({
      ...formatState,
      xAxis: { ...formatState.xAxis, suffix: suffix }
    });
  };

  const handleYTitleChange = (title: string) => {
    setFormatState({
      ...formatState,
      yAxis: { ...formatState.yAxis, name: title }
    });
  };

  const handleYPrefixChange = (prefix: string) => {
    setFormatState({
      ...formatState,
      yAxis: { ...formatState.yAxis, prefix: prefix }
    });
  };

  const handleYSuffixChange = (suffix: string) => {
    setFormatState({
      ...formatState,
      yAxis: { ...formatState.yAxis, suffix: suffix }
    });
  };

  const handleSeriesNameChange = (id: string, name: string) => {
    const newSeries = formatState.series.map(serie => {
      if (id === serie.seriesId) {
        return { ...serie, seriesName: name };
      }
      return serie;
    });
    setFormatState({ ...formatState, series: newSeries });
  };

  const handleSeriesTypeChange = (id: string, type: string) => {
    const newSeries = formatState.series.map(serie => {
      if (id === serie.seriesId) {
        return { ...serie, seriesType: type };
      }
      return serie;
    });
    setFormatState({ ...formatState, series: newSeries });
  };

  const handleStackNameChange = (name: string) => {
    setFormatState({
      ...formatState,
      stack: { ...formatState.stack, name: name }
    });
  };

  const handleStackTypeChange = (id: string, type: string) => {
    console.log(type);
    setFormatState({
      ...formatState,
      stack: { ...formatState.stack, type: type }
    });
  };

  const handleDataLabelsChange = () => {
    setFormatState({ ...formatState, dataLabels: !formatState.dataLabels });
  };

  const handle3DChange = () => {
    setFormatState({ ...formatState, allow3d: !formatState.allow3d });
  };

  const handleColorChange = (id: string, color: ColorResult) => {
    const newSeries = formatState.series.map(serie => {
      if (serie.seriesId == id) {
        return { ...serie, seriesColor: color.hex };
      }
      return serie;
    });
    setFormatState({ ...formatState, series: newSeries });
  };

  const handleCancel = () => {
    setFormatState(createFormatOptions(graph));
  };

  const handleUpdate = () => {
    const newGraphOptions = { ...graph.options };

    newGraphOptions.chart = {
      ...newGraphOptions.chart,
      options3d: {
        enabled: formatState.allow3d,
        alpha: 15,
        beta: 15,
        depth: 50
      }
    };

    newGraphOptions.title = {
      ...newGraphOptions.title,
      text: formatState.title
    };
    newGraphOptions.subtitle = {
      ...newGraphOptions.subtitle,
      text: formatState.subtitle
    };
    // TODO: check if stack is given
    console.log(formatState.stack.type);
    newGraphOptions.plotOptions = {
      ...newGraphOptions.plotOptions,
      series: {
        ...newGraphOptions.plotOptions?.series,
        dataLabels: { enabled: formatState.dataLabels },
        stacking: formatState.stack.type === 'normal' ? 'normal' : 'percent'
      },
      column: {
        ...newGraphOptions.plotOptions?.column,
        stacking: formatState.stack.type === 'normal' ? 'normal' : 'percent'
      }
    };
    newGraphOptions.xAxis = {
      ...newGraphOptions.xAxis,
      title: { text: formatState.xAxis.name },
      labels: {
        // add the prefix/suffix the x-axis labels
        formatter: function() {
          return (
            formatState.xAxis.prefix +
            // use the automatic formatting provided by highcharts
            this.axis.defaultLabelFormatter.call(this) +
            formatState.xAxis.suffix
          );
        }
      }
    };
    newGraphOptions.yAxis = {
      ...newGraphOptions.yAxis,
      title: { text: formatState.yAxis.name },
      labels: {
        // add the prefix/suffix the x-axis labels
        formatter: function() {
          return (
            formatState.yAxis.prefix +
            // use the automatic formatting provided by highcharts
            this.axis.defaultLabelFormatter.call(this) +
            formatState.yAxis.suffix
          );
        }
      }
    };
    newGraphOptions.tooltip = {
      ...newGraphOptions.tooltip,
      footerFormat: `${
        formatState.stack.name === '' ? 'Stack' : formatState.stack.name
      }: ({series.userOptions.stack})`
    };
    newGraphOptions.series = newGraphOptions.series?.map((serie, index) => {
      return {
        ...serie,
        name: formatState.series[index].seriesName,
        type: formatState.series[index].seriesType,
        color: formatState.series[index].seriesColor
      } as SeriesOptionsType;
    });
    dispatch(updateGraphAction({ id: graph.id, options: newGraphOptions }));
  };

  return (
    <Fragment>
      <FormBlock label={GRAPH_LABEL}>
        <FormBlock direction="row">
          <FormTextField
            label="Title"
            value={formatState.title}
            defaultValue={formatState.title}
            style={{ width: '40%' }}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleTitleChange(value.target.value)
            }
          />
          <FormTextField
            label="Subtitle"
            value={formatState.subtitle}
            defaultValue={formatState.subtitle}
            style={{ width: '40%' }}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleSubtitleChange(value.target.value)
            }
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormBlock label={X_LABEL}>
        <FormBlock direction="row">
          <FormTextField
            label="Name"
            value={formatState.xAxis.name}
            defaultValue={formatState.xAxis.name}
            style={{ width: '30%' }}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleXTitleChange(value.target.value)
            }
          />
          <FormTextField
            label="Prefix"
            value={formatState.xAxis.prefix}
            defaultValue={formatState.xAxis.prefix}
            style={{ width: '20%' }}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleXPrefixChange(value.target.value)
            }
          />
          <FormTextField
            label="Suffix"
            value={formatState.xAxis.suffix}
            defaultValue={formatState.xAxis.suffix}
            style={{ width: '20%' }}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleXSuffixChange(value.target.value)
            }
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormBlock label={Y_LABEL}>
        <FormBlock direction="row">
          <FormTextField
            label="Name"
            value={formatState.yAxis.name}
            defaultValue={formatState.yAxis.name}
            style={{ width: '30%' }}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleYTitleChange(value.target.value)
            }
          />
          <FormTextField
            label="Prefix"
            value={formatState.yAxis.prefix}
            defaultValue={formatState.yAxis.prefix}
            style={{ width: '20%' }}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleYPrefixChange(value.target.value)
            }
          />
          <FormTextField
            label="Suffix"
            value={formatState.yAxis.suffix}
            defaultValue={formatState.yAxis.suffix}
            style={{ width: '20%' }}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleYSuffixChange(value.target.value)
            }
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormBlock label={SERIES_LABEL} direction="row" alignItems="center">
        {formatState.series.map((serie, index) => {
          return (
            <FormBlock
              key={index}
              label={serie.seriesTitle}
              direction="row"
              alignItems="center"
              style={{ marginTop: '10px' }}
            >
              <FormTextField
                label="Name"
                value={serie.seriesName}
                defaultValue={serie.seriesName}
                style={{ width: '25%' }}
                onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                  handleSeriesNameChange(serie.seriesId, value.target.value)
                }
              />
              <FormSelectionField
                required
                id={serie.seriesId}
                label="Type"
                value={serie.seriesType}
                data={types}
                style={{ width: '25%' }}
                handleChange={handleSeriesTypeChange}
              />
              <ColorPicker
                color={serie.seriesColor}
                handleChange={(color: ColorResult) =>
                  handleColorChange(serie.seriesId, color)
                }
              />
            </FormBlock>
          );
        })}
      </FormBlock>
      <FormDivider light />
      <FormBlock label={STACK_LABEL}>
        <FormBlock direction="row">
          <FormTextField
            label="Name"
            value={formatState.stack.name}
            defaultValue={formatState.stack.name}
            style={{ width: '40%' }}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleStackNameChange(value.target.value)
            }
          />
          <FormSelectionField
            id="Type"
            label="Type"
            value={formatState.stack.type}
            data={['normal', 'percent']}
            style={{ width: '40%' }}
            handleChange={handleStackTypeChange}
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormBlock label="Other">
        <FormBlock direction="row">
          <FormControlLabel
            control={<Switch checked={formatState.allow3d} name="Enable 3D" />}
            label="Enable 3D"
            labelPlacement="bottom"
            onChange={(event: ChangeEvent<{}>, checked: boolean) =>
              handle3DChange()
            }
          />
          <FormControlLabel
            control={
              <Switch checked={formatState.dataLabels} name="Data Labels" />
            }
            label="Data Labels"
            labelPlacement="bottom"
            onChange={(event: ChangeEvent<{}>, checked: boolean) =>
              handleDataLabelsChange()
            }
          />
        </FormBlock>
      </FormBlock>
      <FormFooter>
        <Button
          size="large"
          label="Cancel"
          color="default"
          variant="text"
          onClick={() => handleCancel()}
        />
        <Button
          size="large"
          label="Update"
          color="primary"
          variant="text"
          onClick={() => handleUpdate()}
        />
      </FormFooter>
    </Fragment>
  );
}

const FormFooter = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end'
});

interface FormatOptions {
  title: string;
  subtitle: string;
  allow3d: boolean;
  dataLabels: boolean;
  xAxis: { name: string; prefix: string; suffix: string };
  yAxis: { name: string; prefix: string; suffix: string };
  series: {
    seriesId: string;
    seriesTitle: string;
    seriesName: string;
    seriesType: string;
    seriesColor: string;
  }[];
  stack: { name: string; type: string };
}

const createFormatOptions = (graph: GraphRecord): FormatOptions => {
  const graphOptions: FormatOptions = {
    title: '',
    subtitle: '',
    allow3d: false,
    dataLabels: false,
    xAxis: { name: '', prefix: '', suffix: '' },
    yAxis: { name: '', prefix: '', suffix: '' },
    series: [],
    stack: { name: '', type: 'normal' }
  };
  if (!isUndefined(graph.options.title)) {
    if (!isUndefined(graph.options.title.text)) {
      graphOptions.title = graph.options.title.text;
    }
  }

  if (!isUndefined(graph.options.subtitle)) {
    if (!isUndefined(graph.options.subtitle.text)) {
      graphOptions.subtitle = graph.options.subtitle.text;
    }
  }

  if (!isUndefined(graph.options.plotOptions)) {
    if (!isUndefined(graph.options.plotOptions.series)) {
      if (!isUndefined(graph.options.plotOptions.series.dataLabels)) {
        const dataLabels = graph.options.plotOptions.series
          .dataLabels as DataLabelsOptionsObject;
        if (!isUndefined(dataLabels.enabled)) {
          graphOptions.dataLabels = dataLabels.enabled;
        }
        graphOptions.stack.type = graph.options.plotOptions.series
          .stacking as string;
      }
    }
  }

  if (!isUndefined(graph.options.chart)) {
    if (!isUndefined(graph.options.chart.options3d)) {
      if (!isUndefined(graph.options.chart.options3d.enabled)) {
        graphOptions.allow3d = graph.options.chart.options3d.enabled;
      }
    }
  }
  if (!isUndefined(graph.options.yAxis)) {
    const yAxis = graph.options.yAxis as YAxisOptions;
    if (!isUndefined(yAxis.title)) {
      if (yAxis.title !== null) {
        graphOptions.yAxis.name = yAxis.title.text as string;
      }
    }
  }
  if (!isUndefined(graph.options.xAxis)) {
    const xAxis = graph.options.xAxis as XAxisOptions;
    if (!isUndefined(xAxis.title)) {
      if (xAxis.title !== null) {
        graphOptions.xAxis.name = xAxis.title.text as string;
      }
    }
  }

  if (!isUndefined(graph.options.series)) {
    graph.options.series.map((serie: SeriesOptionsType, index: number) => {
      // https://api.highcharts.com/highcharts/colors
      // TODO: get default value
      const colors = [
        '#7cb5ec',
        '#434348',
        '#90ed7d',
        '#f7a35c',
        '#8085e9',
        '#f15c80',
        '#e4d354',
        '#2b908f',
        '#f45b5b',
        '#91e8e1'
      ];
      //  When all colors are used, new colors are pulled from the start again.
      const colorIndex = index % 10; // Highcharts colors array length
      const color = colors[colorIndex];
      graphOptions.series.push({
        seriesId: index.toString(),
        seriesTitle: !isUndefined(serie.name) ? serie.name : '',
        seriesName: !isUndefined(serie.name) ? serie.name : '',
        seriesType: serie.type,
        seriesColor: color
      });
    });
  }
  return graphOptions;
};

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});
