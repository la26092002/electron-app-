import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDataContext } from '../../Context/DataContext';

export default function PieActiveArc() {
  const { state, dispatch } = useDataContext();
  // Function to add a 'value' property to each item
function addValueProperty(items) {
  return items.map(item => {
      // Calculate the 'value' (e.g., profit or other logic)
      item.value = window.sqlite.personDB?.countProductsByBuyerId(item.id);
      item.label = item.name;
      return item;
  });
}

const updatedData = addValueProperty(state.Buyers);
  return (
    <PieChart
      series={[
        {
          data:  updatedData,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
  );
}