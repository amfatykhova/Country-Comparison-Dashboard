Welcome to the country comparison dashboard! This dashboard allows you to select two countries and compare their metrics. You can directly compare "birth rate / time", 
"death rate / time", "life expectancy / time", "population growth / time", and the ratio of rural to urban average populations within a given country. In addition, you 
can scroll down to view two scatter plots. The two scatter plots bellow are not dependant on country selection, but do highlight data points that correspond to the two 
currently chosen countries. These scatter plots function as exploratory visualizations. For the first scatter plot, users can customize the X and Y axes with the full 
range of columns in the dataset. For the second scatter plot, users can customize the Y axis, but the X axis is always set to a timeScale by year. These exploratory
 scatterplots allow users to identify datapoints and countries of interest. They assist users with deciding which two countries they want to compare next.

This dashboard has several interactability features:

1. There is a "time brush". Each shape represents a year. When the brush is used, bars and scatter points that are in that year are highlighted with green stroke.
2. Each chart has a tool tip. Hover your mouse over a chart element to see the data that it repersents.
3. There are several selection menues. The first is a country selection. There are drop downs under "Country 1" and "Country 2" that allow you to select a country. The first
    four rows of charts are updated accordingly.
4. There are two scatter charts at the bottom of the dashboard. These don't change with the country selection, but the currently selected countries are highlighted: their dots
    are larger with greater staturation.
5. The first of the two scatter charts has X and Y axis selectors right above it. This allows the user to explore the relationship between different variables for every
    country in one view. This may assist users in determining which two countries they want to compare next. When a dot is hovered over, all the other dots from that country turn
    black so users can see "country clusters".
6. The second of the two scatter charts just has a Y axis selector. The X axis is always "year". This allows users to explore the relationship between variables and time for
    every country in one view. The tool tip for this scatter chart also highlights all of dots for a specific country by turning them black when you hover over a particular dot. 
    That way, users can see the "line over time" for a particular country.
