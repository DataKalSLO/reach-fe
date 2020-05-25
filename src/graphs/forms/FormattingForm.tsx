import { Divider, styled } from '@material-ui/core';
import React, { ChangeEvent, Fragment, useState } from 'react';
import { ColorResult } from 'react-color';
import { useDispatch } from 'react-redux';
import { isUndefined } from 'util';
import FormBlock from '../../common/components/FormBlock';
import { TextFieldSelect } from '../../common/components/FormSelectionField';
import { TextField } from '../../common/components/FormTextField';
import { Switch } from '../../common/components/Switch';
import { editGraph, updateLocalGraph } from '../../redux/graphbuilder/actions';
import { GraphMetaData } from '../../redux/graphbuilder/types';
import { GRAPH_COLORS } from '../builder/constants';
import { seriesTypesEnum } from '../builder/types';
import {
  GRAPH_LABEL,
  INPUT_3D_LABEL,
  INPUT_DATA_LABELS_LABEL,
  INPUT_PREFIX_LABEL,
  INPUT_SUBTITLE_LABEL,
  INPUT_SUFFIX_LABEL,
  INPUT_TITLE_LABEL,
  INPUT_TYPE_LABEL,
  SERIES_LABEL,
  X_AXIS_LABEL,
  Y_AXIS_LABEL
} from './constants';
import FormColorPicker from './FormColorPicker';
import { FormFooter } from './FormFooter';
import { GraphFormProps, FormProps } from './types';

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
      graphOptions: { ...formatState.graphOptions, xConfig: { title: title } }
    });
  };

  const handleXPrefixChange = (prefix: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        xConfig: { valuePrefix: prefix }
      }
    });
  };

  const handleXSuffixChange = (suffix: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        xConfig: { valueSuffix: suffix }
      }
    });
  };

  const handleYTitleChange = (title: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        yConfig: { title: title }
      }
    });
  };

  const handleYPrefixChange = (prefix: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        yConfig: { valuePrefix: prefix }
      }
    });
  };

  const handleYSuffixChange = (suffix: string) => {
    setFormatState({
      ...formatState,
      graphOptions: {
        ...formatState.graphOptions,
        yConfig: { valueSuffix: suffix }
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
            value={formatState.graphOptions.yConfig?.valueSuffix}
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
      <FormBlock>
        {formatState.graphOptions.seriesConfigs.map((seriesConfig, index) => {
          return (
            <FormBlock key={index} label={`${SERIES_LABEL} ${index + 1}`}>
              <FormTextField
                label={INPUT_TITLE_LABEL}
                value={seriesConfig.name}
                onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                  handleSeriesNameChange(index, value.target.value)
                }
              />
              <FormSelection
                label={INPUT_TYPE_LABEL}
                value={seriesConfig.seriesType}
                data={Object.keys(seriesTypesEnum)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSeriesTypeChange(index, e.target.value)
                }
              />
              <FormColorPicker
                initialColor={
                  !isUndefined(seriesConfig.color)
                    ? seriesConfig.color
                    : GRAPH_COLORS[index]
                }
                handleChange={(color: ColorResult) =>
                  handleColorChange(index, color)
                }
              />
              <FormBlock
                innerBlockProps={{
                  style: {
                    justifyContent: 'space-between'
                  }
                }}
              >
                <Switch
                  label={INPUT_DATA_LABELS_LABEL}
                  checked={
                    !isUndefined(seriesConfig.dataLabels)
                      ? seriesConfig.dataLabels
                      : false
                  }
                  onChange={() => handleDataLabelsChange}
                />
              </FormBlock>
            </FormBlock>
          );
        })}
      </FormBlock>
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

const FormSelection = styled(TextFieldSelect)({
  marginRight: '10px'
});

const FormTextField = styled(TextField)({
  marginRight: '10px'
});
