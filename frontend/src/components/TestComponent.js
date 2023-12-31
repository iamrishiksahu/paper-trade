import * as React from 'react';
import { styled } from '@mui/system';

const MyComponent = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'black',
  padding: 8,
  borderRadius: 4,
  
});

export default function TestComponent() {


  return <MyComponent>Styled div</MyComponent>;
}