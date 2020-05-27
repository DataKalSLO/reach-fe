import { Divider, styled } from '@material-ui/core';
import React, { Fragment } from 'react';
import { ColorResult } from 'react-color';
import FormBlock from '../../common/components/FormBlock';
import {
  axisFormatLabels,
  graphFormatLabels,
  GRAPH_LABEL,
  X_AXIS_LABEL,
  Y_AXIS_LABEL
} from './constants';
import { FormMutiTextFieldSection } from './FormAxisFormatter';
import { FormSeriesFormatter } from './FormSeriesFormatter';
import { FormattingFormProps } from './types';
import { changeEntryAtIndex } from './utilities';

export default function FormattingForm(props: FormattingFormProps) {
  const { state, setState, children } = props;

  const handleTitleChange = (title: string) => {
    setState({ ...state, title: title });
  };

  const handleSubtitleChange = (subtitle: string) => {
    setState({ ...state, subtitle: subtitle });
  };

  const handleXTitleChange = (title: string) => {
    setState({ ...state, xConfig: { ...state.xConfig, title: title } });
  };

  const handleXPrefixChange = (prefix: string) => {
    setState({ ...state, xConfig: { ...state.xConfig, valuePrefix: prefix } });
  };

  const handleXSuffixChange = (suffix: string) => {
    setState({ ...state, xConfig: { ...state.xConfig, valueSuffix: suffix } });
  };

  const handleYTitleChange = (title: string) => {
    setState({ ...state, yConfig: { ...state.yConfig, title: title } });
  };

  const handleYPrefixChange = (prefix: string) => {
    setState({ ...state, yConfig: { ...state.yConfig, valuePrefix: prefix } });
  };

  const handleYSuffixChange = (suffix: string) => {
    setState({ ...state, yConfig: { ...state.yConfig, valueSuffix: suffix } });
  };

  const handleSeriesNameChange = (seriesIndex: number, name: string) => {
    setState({
      ...state,
      seriesConfigs: changeEntryAtIndex(
        state.seriesConfigs,
        'name',
        name,
        seriesIndex
      )
    });
  };

  const handleSeriesTypeChange = (seriesIndex: number, type: string) => {
    setState({
      ...state,
      seriesConfigs: changeEntryAtIndex(
        state.seriesConfigs,
        'seriesType',
        type,
        seriesIndex
      )
    });
  };

  const handleDataLabelsChange = (seriesIndex: number, isOn: boolean) => {
    setState({
      ...state,
      seriesConfigs: changeEntryAtIndex(
        state.seriesConfigs,
        'dataLabels',
        isOn,
        seriesIndex
      )
    });
  };

  const handleColorChange = (seriesIndex: number, color: ColorResult) => {
    setState({
      ...state,
      seriesConfigs: changeEntryAtIndex(
        state.seriesConfigs,
        'color',
        color.hex,
        seriesIndex
      )
    });
  };

  return (
    <Fragment>
      <FormBlock label={GRAPH_LABEL}>
        <FormBlock>
          <FormMutiTextFieldSection
            labels={graphFormatLabels}
            values={[state.title, state.subtitle]}
            handlers={[handleTitleChange, handleSubtitleChange]}
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormBlock label={X_AXIS_LABEL}>
        <FormBlock direction="row">
          <FormMutiTextFieldSection
            labels={axisFormatLabels}
            values={[
              state.xConfig?.title,
              state.xConfig?.valuePrefix,
              state.xConfig?.valueSuffix
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
          <FormMutiTextFieldSection
            labels={axisFormatLabels}
            values={[
              state.yConfig?.title,
              state.yConfig?.valuePrefix,
              state.yConfig?.valueSuffix
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
        seriesConfigs={state.seriesConfigs}
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
