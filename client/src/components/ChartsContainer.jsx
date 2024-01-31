import Wrapper from "../assets/wrappers/ChartsContainer"
import AreaChartComponent from "./AreaChart"
import BarChartComponent from "./BarChart"

import { useState } from "react"

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true)

  return (
    <Wrapper>
      <h2>Monthly Applications</h2>
      <button
        type="button"
        onClick={() => {
          setBarChart(!barChart)
        }}
      >
        {barChart ? "AreaChart" : "BarChart"}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  )
}

export default ChartsContainer
