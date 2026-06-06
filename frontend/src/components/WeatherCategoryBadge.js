import React from 'react';
import { Badge } from 'react-bootstrap';

const categoryStyles = {
  sunny: 'success',
  rainy: 'primary',
  cold: 'info'
};

const WeatherCategoryBadge = ({ category }) => {
  if (!category?.label) {
    return null;
  }

  return (
    <Badge bg={categoryStyles[category.type] || 'secondary'} className="me-2">
      {category.label}
    </Badge>
  );
};

export default WeatherCategoryBadge;
