import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, styled } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CSVLink } from 'react-csv';

interface CSVTemplateProps {
  templateName: string;
  csvData: any;
  filename: string;
}

function CSVTemplate(props: CSVTemplateProps) {
  return (
    <React.Fragment>
      <SettingsBox>
        {props.templateName}
        <CSVLink data={props.csvData} filename={props.filename}>
          <GetAppIcon />
        </CSVLink>
      </SettingsBox>
      <Divider variant="middle" />
    </React.Fragment>
  );
}

const SettingsBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyItems: 'center',
  justifyContent: 'space-between',
  marginLeft: '30px',
  marginRight: '30px',
  marginTop: '5px',
  marginBottom: '5px'
});

CSVTemplate.propTypes = {
  templateName: PropTypes.string.isRequired,
  csvData: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired
};

export default CSVTemplate;
