// CloseButton.js
import React from 'react';
import { Button } from '@chakra-ui/react';

const CloseTabButton = ({ onClose }) => {
  return (
    <Button
      background="transparent"
      border="none"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      ×
    </Button>
  );
};

export default CloseTabButton;
