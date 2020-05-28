import { Box, styled } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import React, { ChangeEvent, Fragment } from 'react';
import Button from '../../common/components/Button';
import FormBlock from '../../common/components/FormBlock';
import { TextFieldSelect } from '../../common/components/FormSelectionField';
import IconButton from '../../common/components/IconButton';
import { ADD_SERIES_LABEL, INPUT_SERIES_LABEL } from './constants';

interface Props {
  label: string;
  columnNames: string[];
  selectedColumnNames: string[];
  handleChange: (columnIndex: number, selectedColumn: string) => void;
  handleDelete: (columnIndex: number) => void;
  handleAdd: () => void;
}

export function FormSeriesSelection(props: Props) {
  return (
    <Fragment>
      <FormBlock label={props.label}>
        {props.selectedColumnNames.map((columnName, index) => {
          return (
            <FormBlock key={index}>
              <FormTextField
                label={`${INPUT_SERIES_LABEL} ${index + 1}`}
                value={columnName}
                data={props.columnNames}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  props.handleChange(index, e.target.value)
                }
              />
              {/* Prevent the deletion of all series, must keep at least one */}
              {props.selectedColumnNames.length > 1 && (
                <IconButton
                  size="small"
                  color="default"
                  aria-label="Delete"
                  icon={<Delete color="error" />}
                  onClick={() => props.handleDelete(index)}
                />
              )}
            </FormBlock>
          );
        })}
      </FormBlock>
      <FormBox>
        <Button
          label={ADD_SERIES_LABEL}
          variant="text"
          color="default"
          aria-label="Add"
          startIcon={<AddIcon color="primary" />}
          onClick={() => props.handleAdd()}
        />
      </FormBox>
    </Fragment>
  );
}

const FormTextField = styled(TextFieldSelect)({
  marginRight: '10px'
});

const FormBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  minWidth: '300px'
});
