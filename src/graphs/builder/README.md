# Graph Builder

### Series Types
Each graph takes in a list of series, where each series
represents one set of data that can be plotted on a graph.
"series" is simply another property in the options object.<br />
[Highcharts Series Object](https://www.highcharts.com/docs/chart-concepts/series)
  * **Series Types**: line | spline | column | bar | area | areaspline | pie

### Auxiliary Types
The series types are grouped as either primary or secondary types
as secondary types may have incompatible properties. For instance,
a Pie series is the only type that contains the `size` property as 
well as the only type that does not contain the `stacking` property.
  * **Primary Types**: line, spline, column, bar, area, areaspline
  * **Secondary Types**: pie

### Graph Types
Each of the graph types consist of a different subset of series
types, each of which are rendered on a chart.
There are four main graph types:
  * **Basic Graph**: Multiple Primary Series or 1 Secondary Series
  * **3D Graph**: Multiple Primary Series or 1 Secondary Series
  * **Combined Graph**: Multiple Primary Series & 1 Secondary Series
  * **Synchronized Graph**: Multiple Primary Series

#### Basic Graphs
A Basic Graph is the simplest type of graph that can render either
multiple primary series **or** one secondary series on one graph.
<br/>
[Highcharts Line Graph Demo](https://www.highcharts.com/demo/line-basic)

#### 3D Graphs
A 3D Graph is only allowed to render multiple rectangular series
types (bar or column) **or** one secondary series on one graph.
<br />
[Highcharts 3D Graph Demo](https://www.highcharts.com/demo/3d-column-interactive)

#### Combined Graphs
Combined Graphs are able to render multiple primary series
**and** one secondary series on the same graph.
<br />
[Highcharts Combined Graph Demo](https://www.highcharts.com/demo/combo)

#### Synchronized Graphs
Synchronized graph are merely a collection of Basic graphs that
are each rendered separately, but with synchronized events.
<br />
[Highcharts Synchronized Graph Demo](https://www.highcharts.com/demo/synchronized-charts)

