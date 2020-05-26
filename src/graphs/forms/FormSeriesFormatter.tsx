import React, { ChangeEvent } from 'react';
import { SeriesConfiguration, seriesTypesEnum } from '../builder/types';
import FormBlock from '../../common/components/FormBlock';
import {
  SERIES_LABEL,
  INPUT_TITLE_LABEL,
  INPUT_TYPE_LABEL,
  INPUT_DATA_LABELS_LABEL
} from './constants';
import FormColorPicker from './FormColorPicker';
import { isUndefined } from 'util';
import { GRAPH_COLORS } from '../builder/constants';
import { ColorResult } from 'react-color';
import { styled } from '@material-ui/core';
import { TextFieldSelect } from '../../common/components/FormSelectionField';
import { Switch } from '../../common/components/Switch';
import { TextField } from '../../common/components/FormTextField';

interface Props {
  seriesConfigs: SeriesConfiguration[];
  handleSeriesNameChange: (index: number, name: string) => void;
  handleSeriesTypeChange: (index: number, type: string) => void;
  handleColorChange: (index: number, color: ColorResult) => void;
  handleDataLabelsChange: (index: number, on: boolean) => void;
}

export function FormSeriesFormatter(props: Props) {
  return (
    <FormBlock>
      {props.seriesConfigs.map((seriesConfig, index) => {
        return (
          <FormBlock key={index} label={`${SERIES_LABEL} ${index + 1}`}>
            <FormTextField
              label={INPUT_TITLE_LABEL}
              value={seriesConfig.name}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                props.handleSeriesNameChange(index, value.target.value)
              }
            />
            <FormSelection
              label={INPUT_TYPE_LABEL}
              value={seriesConfig.seriesType}
              data={Object.keys(seriesTypesEnum)}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                props.handleSeriesTypeChange(index, e.target.value)
              }
            />
            <FormColorPicker
              initialColor={
                !isUndefined(seriesConfig.color)
                  ? seriesConfig.color
                  : GRAPH_COLORS[index]
              }
              handleChange={(color: ColorResult) =>
                props.handleColorChange(index, color)
              }
            />
            <FormBlock>
              <Switch
                label={INPUT_DATA_LABELS_LABEL}
                checked={
                  !isUndefined(seriesConfig.dataLabels)
                    ? seriesConfig.dataLabels
                    : false
                }
                onChange={() =>
                  props.handleDataLabelsChange(index, !seriesConfig.dataLabels)
                }
              />
            </FormBlock>
          </FormBlock>
        );
      })}
    </FormBlock>
  );
}

const FormSelection = styled(TextFieldSelect)({
  marginRight: '10px'
});

const FormTextField = styled(TextField)({
  marginRight: '10px'
});
