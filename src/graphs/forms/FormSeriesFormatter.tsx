import { styled } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { ColorResult } from 'react-color';
import FormBlock from '../../common/components/FormBlock';
import { TextFieldSelect } from '../../common/components/FormSelectionField';
import { TextField } from '../../common/components/FormTextField';
import { Switch } from '../../common/components/Switch';
import { GRAPH_COLORS } from '../builder/constants';
import { SeriesConfiguration } from '../builder/types';
import {
  INPUT_DATA_LABELS_LABEL,
  INPUT_TITLE_LABEL,
  INPUT_TYPE_LABEL,
  SERIES_LABEL,
  supportedSeriesTypes
} from './constants';
import FormColorPicker from './FormColorPicker';
import { isDefinedElse } from './utilities';

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
              value={isDefinedElse(seriesConfig.name, '')}
              onChange={(value: React.ChangeEvent<HTMLInputElement>) =>
                props.handleSeriesNameChange(index, value.target.value)
              }
            />
            <FormSelection
              label={INPUT_TYPE_LABEL}
              value={seriesConfig.seriesType}
              data={supportedSeriesTypes}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                props.handleSeriesTypeChange(index, e.target.value)
              }
            />
            <FormColorPicker
              initialColor={isDefinedElse(
                seriesConfig.color,
                GRAPH_COLORS[index]
              )}
              handleChange={(color: ColorResult) =>
                props.handleColorChange(index, color)
              }
            />
            <FormBlock>
              <Switch
                label={INPUT_DATA_LABELS_LABEL}
                checked={isDefinedElse(seriesConfig.dataLabels, false)}
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
