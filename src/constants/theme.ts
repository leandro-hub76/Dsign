import { colors } from './colors';
export const theme = {
colors,
// Spacing: select a frame with auto layout → Design panel → Auto layout → Gap and Padding.
// No auto layout? Select an element, hold Alt (Option on Mac) and hover another one to see the distance.
spacing: {
xs: 10, // smallest gap: an icon and its text
sm: 12, // gap between lines inside a card
md: 15, // gap between items in a row
lg: 20, // gap between blocks of the screen
xl: 25, // biggest gap: padding of the whole screen
},
// Radius: select a box or button → Design panel → Corner radius.
radius: {
sm: 16, // chips and small buttons
md: 16, // buttons and inputs
lg: 16, // cards
full: 999, // circles and pills: leave it as is
},
// Text sizes: select a text → Design panel → Typography → Font size.
text: {
display: 32, // biggest text: a big number or hero title
title: 20, // screen title
subtitle: 16, // section title
heading: 16, // card title
body: 14, // normal text
small: 12, // secondary text
caption: 12, // smallest text: tags and hints
},
};
