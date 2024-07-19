// components/EditableTextField.tsx
import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';

interface EditableTextFieldProps {
  label: string;
  defaultValue: string;
  onChange: (value: string) => void;
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({ label, defaultValue, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    onChange(defaultValue);
  };

  return (
    <div>
      {isEditing ? (
        <TextField
          label={label}
          defaultValue={defaultValue}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleSave}
          autoFocus
          fullWidth
          size="small"
          sx={{ marginY: 2 }}
          variant="filled"
        />
      ) : (
        <Typography sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>{label}: {defaultValue || `Click to edit ${label}`}</Typography>
      )}
    </div>
  );
};

export default EditableTextField;