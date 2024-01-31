import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa"
import StatItem from "./StatItem"
import Wrapper from "../assets/wrappers/StatsContainer"

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "Pending Applications ",
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bcg: "#fef3c7",
      count: defaultStats?.pending || 0,
    },
    {
      title: "Interviews Scheduled ",
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
      count: defaultStats?.interview || 0,
    },
    {
      title: "Declined Applications ",
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
      count: defaultStats?.declined || 0,
    },
  ]

  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
