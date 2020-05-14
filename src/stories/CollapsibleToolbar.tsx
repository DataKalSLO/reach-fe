import { Box, styled } from '@material-ui/core';
import { MoreHorizRounded } from '@material-ui/icons';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import React, { useEffect, useState } from 'react';
import { IconButton } from '../reach-ui/core';

interface CollapsibleItemProps {
  hideWidth: number; // determines when an item will be moved to the hidden menu
  children: React.ReactNode;
}

const CollapsibleItem = (props: CollapsibleItemProps) => (
  <StyledBox>{props.children}</StyledBox>
);

interface CollapsibleMenuProps {
  children: React.ReactNode[];
}

const CollapsibleMenu = (props: CollapsibleMenuProps) => {
  const hideWidths: number[] = props.children.map(
    (child: any) => child.props.hideWidth
  );
  const maxNumVisibleItems = props.children.length;
  const [numVisibleItems, setNumVisibleItems] = useState(maxNumVisibleItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(
    numVisibleItems < maxNumVisibleItems
  );
  const windowWidth = useWindowWidth();

  useEffect(() => {
    // check if more items should be visible
    if (hideWidths[numVisibleItems] < windowWidth) {
      setNumVisibleItems(numVisibleItems + 1);
      setIsMenuOpen(false);
    }

    // check if less items should be visible
    if (hideWidths[numVisibleItems - 1] > windowWidth) {
      setNumVisibleItems(numVisibleItems - 1);
      setIsMenuOpen(false);
    }

    setIsCollapsed(numVisibleItems < maxNumVisibleItems);
  }, [hideWidths, maxNumVisibleItems, numVisibleItems, windowWidth]);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function getVisibleItems() {
    return props.children.slice(0, numVisibleItems);
  }

  function getHiddenItems() {
    if (isMenuOpen) {
      return props.children.slice(numVisibleItems, maxNumVisibleItems);
    } else return null;
  }

  function showMoreIcon() {
    if (isCollapsed) {
      return (
        <IconButton
          aria-label={'more editor options'}
          onClick={toggleMenu}
          icon={<MoreHorizRounded />}
        />
      );
    } else return null;
  }

  return (
    <div>
      <StyledBox>
        {getVisibleItems()}
        {showMoreIcon()}
      </StyledBox>
      {/* TODO: @daniel add floating menu here */}
      <StyledBox>{getHiddenItems()}</StyledBox>
    </div>
  );
};

export { CollapsibleMenu, CollapsibleItem };

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center'
});
