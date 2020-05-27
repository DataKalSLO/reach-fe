import { Divider, styled } from '@material-ui/core';
import React, { Fragment, ReactNode } from 'react';
import { ColorResult } from 'react-color';
import FormBlock from '../../common/components/FormBlock';
import { GraphMetaData } from '../../redux/graphs/types';
import {
  axisFormatLabels,
  graphFormatLabels,
  GRAPH_LABEL,
  X_AXIS_LABEL,
  Y_AXIS_LABEL
} from './constants';
import { FormMutiTextFieldBlock } from './FormMultiTextFieldBlock';
import { FormSeriesFormatter } from './FormSeriesFormatter';
import { changeEntryAtIndex } from './utilities';

interface Props {
  state: GraphMetaData;
  setState: React.Dispatch<React.SetStateAction<GraphMetaData>>;
  children?: ReactNode;
}

export function FormattingForm(props: Props) {
  const { state, setState, children } = props;

  const handleTitleChange = (title: string) => {
    setState({ ...state, graphTitle: title });
  };

  const handleSubtitleChange = (subtitle: string) => {
    setState({
      ...state,
      graphOptions: { ...state.graphOptions, subtitle: subtitle }
    });
  };

  const handleXTitleChange = (title: string) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        xConfig: { ...state.graphOptions.xConfig, title: title }
      }
    });
  };

  const handleXPrefixChange = (prefix: string) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        xConfig: { ...state.graphOptions.xConfig, valuePrefix: prefix }
      }
    });
  };

  const handleXSuffixChange = (suffix: string) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        xConfig: { ...state.graphOptions.xConfig, valueSuffix: suffix }
      }
    });
  };

  const handleYTitleChange = (title: string) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        yConfig: { ...state.graphOptions.yConfig, title: title }
      }
    });
  };

  const handleYPrefixChange = (prefix: string) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        yConfig: { ...state.graphOptions.yConfig, valuePrefix: prefix }
      }
    });
  };

  const handleYSuffixChange = (suffix: string) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        yConfig: { ...state.graphOptions.yConfig, valueSuffix: suffix }
      }
    });
  };

  const handleSeriesNameChange = (seriesIndex: number, name: string) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        seriesConfigs: changeEntryAtIndex(
          state.graphOptions.seriesConfigs,
          'name',
          name,
          seriesIndex
        )
      }
    });
  };

  const handleSeriesTypeChange = (seriesIndex: number, type: string) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        seriesConfigs: changeEntryAtIndex(
          state.graphOptions.seriesConfigs,
          'seriesType',
          type,
          seriesIndex
        )
      }
    });
  };

  const handleDataLabelsChange = (seriesIndex: number, isOn: boolean) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        seriesConfigs: changeEntryAtIndex(
          state.graphOptions.seriesConfigs,
          'dataLabels',
          isOn,
          seriesIndex
        )
      }
    });
  };

  const handleColorChange = (seriesIndex: number, color: ColorResult) => {
    setState({
      ...state,
      graphOptions: {
        ...state.graphOptions,
        seriesConfigs: changeEntryAtIndex(
          state.graphOptions.seriesConfigs,
          'color',
          color.hex,
          seriesIndex
        )
      }
    });
  };

  return (
    <Fragment>
      <FormBlock label={GRAPH_LABEL}>
        <FormBlock>
          <FormMutiTextFieldBlock
            labels={graphFormatLabels}
            values={[state.graphTitle, state.graphOptions.subtitle]}
            handlers={[handleTitleChange, handleSubtitleChange]}
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormBlock label={X_AXIS_LABEL}>
        <FormBlock direction="row">
          <FormMutiTextFieldBlock
            labels={axisFormatLabels}
            values={[
              state.graphOptions.xConfig?.title,
              state.graphOptions.xConfig?.valuePrefix,
              state.graphOptions.xConfig?.valueSuffix
            ]}
            handlers={[
              handleXTitleChange,
              handleXPrefixChange,
              handleXSuffixChange
            ]}
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormBlock label={Y_AXIS_LABEL}>
        <FormBlock direction="row">
          <FormMutiTextFieldBlock
            labels={axisFormatLabels}
            values={[
              state.graphOptions.yConfig?.title,
              state.graphOptions.yConfig?.valuePrefix,
              state.graphOptions.yConfig?.valueSuffix
            ]}
            handlers={[
              handleYTitleChange,
              handleYPrefixChange,
              handleYSuffixChange
            ]}
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormSeriesFormatter
        seriesConfigs={state.graphOptions.seriesConfigs}
        handleSeriesNameChange={handleSeriesNameChange}
        handleSeriesTypeChange={handleSeriesTypeChange}
        handleColorChange={handleColorChange}
        handleDataLabelsChange={handleDataLabelsChange}
      />
      {children}
    </Fragment>
  );
}

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});
