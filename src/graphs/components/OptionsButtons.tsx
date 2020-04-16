import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { uuid } from 'uuidv4';
import { BottomNavigationAction } from '@material-ui/core';
import { addGraphsForInitiativeAction } from '../../redux/graphs/actions';
import { useOptionsButtonsStyles } from './styles';
import { InitiativeIcon } from './types';
import {
  HouseOutlined,
  PeopleAltOutlined,
  EmojiTransportation,
  BusinessCenterOutlined,
  SchoolOutlined
} from '@material-ui/icons';
import * as consts from '../../redux/graphs/constants';

/*
 * Contains the buttons for the options toolbar, which simply
 * includes a button for each of the defined initiatives.
 */

function OptionsButtons() {
  const dispatch = useDispatch();
  const classes = useOptionsButtonsStyles();
  const initiativeIcons: InitiativeIcon[] = [
    {
      name: consts.INDUSTRY,
      icon: <EmojiTransportation key={uuid()} fontSize={'large'} />
    },
    {
      name: consts.DEMOGRAPHICS,
      icon: <PeopleAltOutlined key={uuid()} fontSize={'large'} />
    },
    {
      name: consts.ASSETS,
      icon: <BusinessCenterOutlined key={uuid()} fontSize={'large'} />
    },
    {
      name: consts.EDUCATION,
      icon: <SchoolOutlined key={uuid()} fontSize={'large'} />
    },
    {
      name: consts.HOUSING,
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
