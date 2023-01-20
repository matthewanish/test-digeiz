import { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ScatterPlotProps } from './scatter-plot.types';
import React from 'react';
import * as Styled from './scatter-plot.styles';

const SCATTER_MARGIN = { top: 10, right: 30, bottom: 30, left: 20 };
const SCATTER_WIDTH = 800 - SCATTER_MARGIN.left - SCATTER_MARGIN.right;
const SCATTER_HEIGHT = 500 - SCATTER_MARGIN.top - SCATTER_MARGIN.bottom;
const POINT_COLOR = '#69b3a2';
const LINE_COLOR = '#90ee90';

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
  const axisRef = useRef(null);

  useLayoutEffect(() => {
    d3.select('svg').remove();

    const svg = d3
      .select(axisRef.current)
      .append('svg')
      .attr('width', SCATTER_WIDTH + SCATTER_MARGIN.left + SCATTER_MARGIN.right)
      .attr('height', SCATTER_HEIGHT + SCATTER_MARGIN.top + SCATTER_MARGIN.bottom)
      .append('g')
      .attr('transform', `translate(${SCATTER_MARGIN.left}, ${SCATTER_MARGIN.top})`);

    const x = d3.scaleLinear().domain([0, 10]).range([0, SCATTER_WIDTH]);
    svg.append('g').attr('transform', `translate(0, ${SCATTER_HEIGHT})`).call(d3.axisBottom(x));

    const y = d3.scaleLinear().domain([0, 10]).range([SCATTER_HEIGHT, 0]);
    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('line')
      .style('stroke', LINE_COLOR)
      .style('stroke-width', 1)
      .attr('x1', (d) => x(d.x))
      .attr('y1', (d) => y(d.y))
      .attr('x2', (d, index) => (data.length - 1 === index ? x(d.x) : x(data[index + 1].x)))
      .attr('y2', (d, index) => (data.length - 1 === index ? y(d.y) : y(data[index + 1].y)));

    svg
      .append('g')
      .selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.x))
      .attr('cy', (d) => y(d.y))
      .attr('r', 3)
      .style('fill', POINT_COLOR);
  }, [data]);

  return <Styled.Scatter ref={axisRef} />;
};

export default React.memo(ScatterPlot);
