import { Column } from '../redux/vizbuilder/types';
import { ValueColumn } from './components/types';

export const ColumnCX: Column = {
  name: 'Test Category',
  valueType: 'string',
  values: [
    'label_a',
    'label_b',
    'label_c',
    'label_d',
    'label_e',
    'label_f',
    'label_g',
    'label_h',
    'label_i'
  ]
};

export const ColumnDX: Column = {
  name: 'Test Date',
  valueType: 'date',
  values: [
    new Date(1359676800000),
    new Date(1362096000000),
    new Date(1364774400000),
    new Date(1367366400000),
    new Date(1370044800000),
    new Date(1372636800000),
    new Date(1375315200000),
    new Date(1377993600000),
    new Date(1380585600000)
  ]
};

export const ColumnCXS: Column = {
  name: 'Test Other',
  valueType: 'string',
  values: ['one', 'two']
};

export const Column1Y: ValueColumn = {
  name: 'Test Y Values 1',
  valueType: 'number',
  values: [52, 10, 56, 45, 11, 52, 54, 32, 76]
};

export const Column2Y: ValueColumn = {
  name: 'Test Y Values 2',
  valueType: 'number',
  values: [32, 50, 36, 25, 51, 32, 24, 32, 26]
};

export const Column3Y: ValueColumn = {
  name: 'Test Y Values 3',
  valueType: 'number',
  values: [32, 30, 96, 25, 81, 12, 34, 22, 86]
};

export const Column4Y: ValueColumn = {
  name: 'Test Y Values 4',
  valueType: 'number',
  values: [350, 400]
};
