import { Divider, styled } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { ColorResult } from 'react-color';
import FormBlock from '../../common/components/FormBlock';
import { TextField } from '../../common/components/FormTextField';
import { Switch } from '../../common/components/Switch';
import { GraphMetaData } from '../../redux/graphbuilder/types';
import {
  GRAPH_LABEL,
  INPUT_3D_LABEL,
  INPUT_PREFIX_LABEL,
  INPUT_SUBTITLE_LABEL,
  INPUT_SUFFIX_LABEL,
  INPUT_TITLE_LABEL,
  X_AXIS_LABEL,
  Y_AXIS_LABEL
} from './constants';
import { FormFooter } from './FormFooter';
import { FormSeriesFormatter } from './FormSeriesFormatter';
import { FormProps } from './types';

export default function FormattingForm(props: FormProps) {
  const { graph, index, handleCancel, handleUpdate } = props;
  const [formatOtherState, setFormatOtherState] = useState({
    enable3D: graph.is3D
  });

  const [formatState, setFormatState] = useState<GraphMetaData>({
    ...graph.graphMetaData
  });

  const handleTitleChange = (title: string) => {
    setFormatState({ ...formatState, graphTitle: title });
  };

  const handleSubtitleChange = (subtitle: string) => {
    setFormatState({
      ...formatState,
      graphOptions: { ...formatState.graphOptions, subtitle: subtitle }
    });
  };

  const handleXTitleChange = (title: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        xConfig: { ...formatState.graphOptions.xConfig, title: title }
      }
    });
  };

  const handleXPrefixChange = (prefix: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        xConfig: { ...formatState.graphOptions.xConfig, valuePrefix: prefix }
      }
    });
  };

  const handleXSuffixChange = (suffix: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        xConfig: { ...formatState.graphOptions.xConfig, valueSuffix: suffix }
      }
    });
  };

  const handleYTitleChange = (title: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        yConfig: { ...formatState.graphOptions.yConfig, title: title }
      }
    });
  };

  const handleYPrefixChange = (prefix: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        yConfig: { ...formatState.graphOptions.yConfig, valuePrefix: prefix }
      }
    });
  };

  const handleYSuffixChange = (suffix: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        yConfig: { ...formatState.graphOptions.yConfig, valueSuffix: suffix }
      }
    });
  };

  const handleSeriesNameChange = (seriesIndex: number, name: string) => {
    const newSeriesConfigs = formatState.graphOptions.seriesConfigs.map(
      (seriesConfig, index) => {
        if (index === seriesIndex) {
          return { ...seriesConfig, name: name };
        }
        return seriesConfig;
      }
    );
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        seriesConfigs: newSeriesConfigs
      }
    });
  };

  const handleSeriesTypeChange = (seriesIndex: number, type: string) => {
    const newSeriesConfigs = formatState.graphOptions.seriesConfigs.map(
      (seriesConfig, index) => {
        if (index === seriesIndex) {
          return { ...seriesConfig, seriesType: type };
        }
        return seriesConfig;
      }
    );
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        seriesConfigs: newSeriesConfigs
      }
    });
  };

  const handleDataLabelsChange = (seriesIndex: number, on: boolean) => {
    const newSeriesConfigs = formatState.graphOptions.seriesConfigs.map(
      (seriesConfig, index) => {
        if (index === seriesIndex) {
          return { ...seriesConfig, dataLabels: on };
        }
        return seriesConfig;
      }
    );
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        seriesConfigs: newSeriesConfigs
      }
    });
  };

  const handle3DChange = () => {
    setFormatOtherState({ ...formatOtherState });
  };

  const handleColorChange = (seriesIndex: number, color: ColorResult) => {
    const newSeriesConfigs = formatState.graphOptions.seriesConfigs.map(
      (seriesConfig, index) => {
        if (index === seriesIndex) {
          return { ...seriesConfig, color: color.hex };
        }
        return seriesConfig;
      }
    );
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        seriesConfigs: newSeriesConfigs
      }
    });
  };

  const handleReset = () => {
    setFormatState({ ...graph.graphMetaData });
  };
  const updateForm = () => {
    handleUpdate({ ...graph, graphMetaData: formatState });
  };

  return (
    <Fragment>
      <FormBlock label={GRAPH_LABEL}>
        <FormBlock direction="row">
          <FormTextField
            label={INPUT_TITLE_LABEL}
            value={formatState.graphTitle}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleTitleChange(value.target.value)
            }
          />
          <FormTextField
            label={INPUT_SUBTITLE_LABEL}
            value={formatState.graphOptions.subtitle}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleSubtitleChange(value.target.value)
            }
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormBlock label={X_AXIS_LABEL}>
        <FormBlock direction="row">
          <FormTextField
            label={INPUT_TITLE_LABEL}
            value={formatState.graphOptions.xConfig?.title}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleXTitleChange(value.target.value)
            }
          />
          <FormTextField
            label={INPUT_PREFIX_LABEL}
            value={formatState.graphOptions.xConfig?.valuePrefix}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleXPrefixChange(value.target.value)
            }
          />
          <FormTextField
            label={INPUT_SUFFIX_LABEL}
            value={formatState.graphOptions.xConfig?.valueSuffix}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleXSuffixChange(value.target.value)
            }
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormBlock label={Y_AXIS_LABEL}>
        <FormBlock direction="row">
          <FormTextField
            label={INPUT_TITLE_LABEL}
            value={formatState.graphOptions.yConfig?.title}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleYTitleChange(value.target.value)
            }
          />
          <FormTextField
            label={INPUT_PREFIX_LABEL}
            value={formatState.graphOptions.yConfig?.valuePrefix}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleYPrefixChange(value.target.value)
            }
          />
          <FormTextField
            label={INPUT_SUFFIX_LABEL}
            value={formatState.graphOptions.yConfig?.valueSuffix}
            onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
              handleYSuffixChange(value.target.value)
            }
          />
        </FormBlock>
      </FormBlock>
      <FormDivider light />
      <FormSeriesFormatter
        seriesConfigs={formatState.graphOptions.seriesConfigs}
        handleSeriesNameChange={handleSeriesNameChange}
        handleSeriesTypeChange={handleSeriesTypeChange}
        handleColorChange={handleColorChange}
        handleDataLabelsChange={handleDataLabelsChange}
      />
      <FormDivider light />
      <FormBlock label="Other">
        <FormBlock direction="row">
          <Switch
            label={INPUT_3D_LABEL}
            checked={formatOtherState.enable3D}
            onChange={handle3DChange}
          />
        </FormBlock>
      </FormBlock>
      <FormFooter
        handleCancel={() => handleCancel(index)}
        handleReset={() => handleReset()}
        handleUpdate={() => updateForm()}
      />
    </Fragment>
  );
}

const FormDivider = styled(Divider)({
  margin: '10px 0px 10px 0px'
});

const FormTextField = styled(TextField)({
  marginRight: '10px'
});
