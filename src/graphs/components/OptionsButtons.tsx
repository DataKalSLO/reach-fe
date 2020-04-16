import { BottomNavigationAction } from '@material-ui/core';
import {
  BusinessCenterOutlined,
  EmojiTransportation,
  HouseOutlined,
  PeopleAltOutlined,
  SchoolOutlined
} from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { uuid } from 'uuidv4';
import { addGraphsForInitiativeAction } from '../../redux/graphs/actions';
import {
  ASSETS,
  DEMOGRAPHICS,
  EDUCATION,
  HOUSING,
  INDUSTRY
} from '../../redux/graphs/constants';
import { useOptionsButtonsStyles } from './styles';
import { InitiativeIcon } from './types';

/*
 * Contains the buttons for the options toolbar, which simply
 * includes a button for each of the defined initiatives.
 */

function OptionsButtons() {
  const dispatch = useDispatch();
  const classes = useOptionsButtonsStyles();
  const initiativeIcons: InitiativeIcon[] = [
    {
      name: INDUSTRY,
      icon: <EmojiTransportation key={uuid()} fontSize={'large'} />
    },
    {
      name: DEMOGRAPHICS,
      icon: <PeopleAltOutlined key={uuid()} fontSize={'large'} />
    },
    {
      name: ASSETS,
      icon: <BusinessCenterOutlined key={uuid()} fontSize={'large'} />
    },
    {
      name: EDUCATION,
      icon: <SchoolOutlined key={uuid()} fontSize={'large'} />
    },
    {
      name: HOUSING,
      icon: <HouseOutlined key={uuid()} fontSize={'large'} />
    }
  ];

  const initiatives = () => {
    return initiativeIcons.map((initiative, index) => {
      return (
        <BottomNavigationAction
          showLabel={true}
          key={index}
          className={classes.root}
          label={initiative.name}
          icon={initiative.icon}
          onClick={() =>
            dispatch(addGraphsForInitiativeAction(initiative.name))
          }
        />
      );
    });
  };

  return <Fragment>{initiatives()}</Fragment>;
}

export default OptionsButtons;
