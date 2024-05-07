import {
  useEffect,
  useState,
} from "react";


import { useTooltipInPortal, useTooltip, defaultStyles } from "@visx/tooltip";
import { timeFormat } from "d3-time-format";
import { Group } from "@visx/group";
import { scaleLinear, scaleTime } from "@visx/scale";
import { localPoint } from "@visx/event";
import { bisector, extent, max } from "d3-array";
import { Bar, Line, LinePath, AreaClosed } from "@visx/shape";
import { curveMonotoneX, curveNatural } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";


const colors = {
  white: "#FFFFFF",
  black: "#1f2937",
  gray: "#98A7C0",
  darkGray: "#2A2A2A",
  accent: "#40FEAE",
  darkAccent: "#256769"
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const getXValue = (d) => new Date(d[0]);

const getYValue = (d) => d[1];

//const bisectDate = bisector < Date > getXValue.left;

const bisectDate = bisector((d) => new Date(d[0])).left;

const tooltipStyles = {
  ...defaultStyles,
  borderRadius: 4,
  background: "#161434",
  color: "#ADADD3",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
};

const Graph = ({ height, width, id }) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0
  } = useTooltip();
  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,

    scroll: true
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=60`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.prices);
        setLoading(false);
      });
  }, []);

  if (!data) return null;

  // DATA FOR LINE
  const xXScale = scaleTime({
    range: [0, width],
    domain: extent(data, getXValue)
  });

  const yYScale = scaleLinear({
    range: [height, 0],
    round: true,
    domain: [
      Math.min(...data.map(getYValue)),
      Math.max(...data.map(getYValue))
    ],
    nice: true
  });

  const x = (d) => new Date(d[0] * 1000);

  const y = (d) => d[1];

  // Bounds
  const margin = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x)
  });
  const yScale = scaleLinear({
    range: [height, 0],
    round: true,
    domain: [
      Math.min(...data.map(getYValue)),
      Math.max(...data.map(getYValue))
    ],
    nice: true
  });

  
  return (
    <>
      <div className="">
      <svg width="100%" height="100%" ref={containerRef}>
        <LinearGradient
          id="area-background-gradient"
          from={colors.darkAccent}
          to={colors.black}
        />
        <LinearGradient
          id="area-gradient"
          from={colors.darkAccent}
          to={colors.black}
          toOpacity={0.1}
        />

        <Group>
          <AreaClosed
            data={data}
            yScale={yScale}
            x={(d) => xXScale(getXValue(d)) ?? 0}
            y={(d) => yYScale(getYValue(d)) ?? 0}
            strokeWidth={2}
            curve={curveNatural}
            stroke="url(#area-gradient)"
            fill="url(#area-background-gradient)"
          />
        </Group>

        <Group>
          <LinePath
            data={data}
            x={(d) => xXScale(getXValue(d)) ?? 0}
            y={(d) => yYScale(getYValue(d)) ?? 0}
            stroke="#23DBBD"
            strokeWidth={2}
            curve={curveMonotoneX}
          />
        </Group>

        <Group>
          <Bar
            width={width}
            height={height}
            fill="transparent"
            onMouseMove={(event) => {
              const { x } = localPoint(event) || { x: 0 };
              const x0 = xXScale.invert(x);
              const index = bisectDate(data, x0, 1);
              const d0 = data[index - 1];
              const d1 = data[index];
              let d = d0;
              if (d1 && getXValue(d1)) {
                d =
                  x0.valueOf() - getXValue(d0).valueOf() >
                  getXValue(d1).valueOf() - x0.valueOf()
                    ? d1
                    : d0;
              }

              showTooltip({
                tooltipData: d,
                tooltipLeft: x,

                tooltipTop: yYScale(getYValue(d))
              });
            }}
            onMouseLeave={() => hideTooltip()}
          />
        </Group>

        {tooltipData ? (
          <Group>
            <Line
              from={{ x: tooltipLeft, y: 0 }}
              to={{ x: tooltipLeft, y: height }}
              stroke="#59588D"
              strokeWidth={1}
              pointerEvents="none"
              strokeDasharray="5, 5"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={8}
              fill="#FF4DCA"
              fillOpacity={0.5}
              pointerEvents="none"
            />
            <circle
              cx={tooltipLeft}
              cy={tooltipTop}
              r={4}
              fill="#FF4DCA"
              pointerEvents="none"
            />
          </Group>
        ) : null}
      </svg>
      </div>

      {tooltipData && "username" in tooltipData === false ? (
        <TooltipInPortal
          zIndex={20}
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          {`${timeFormat("%b %d %H:%M ")(new Date(getXValue(tooltipData)))}`}:{" "}
          <b>{formatter.format(getYValue(tooltipData))}</b>
        </TooltipInPortal>
      ) : null}

      {tooltipData && "username" in tooltipData ? (
        <TooltipInPortal
          zIndex={30}
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
          style={tooltipStyles}
        >
          <div className="flex flex-col">
            <h1 className="mb-2 mt-1 font-semibold text-white">
              {tooltipData.username}
            </h1>
            <p
              className={`text-xs ${
                tooltipData.type === "Sold" ? "text-red-300" : "text-green-300"
              }`}
            >
              {tooltipData.type}{" "}
              <span className="font-bold">{tooltipData.value}</span> at{" "}
              {<b>{formatter.format(getYValue(tooltipData.data))}</b>}
            </p>
            <p className="text-[8px]">
              {`${timeFormat("%b %d %H:%M ")(
                new Date(getXValue(tooltipData.data))
              )}`}
            </p>
          </div>
        </TooltipInPortal>
      ) : null}
    </>
  );
};

export default Graph;
