import React from 'react'
import { PulseLoader } from "react-spinners";

const loading = () => {
  return (
	<div className="absolute inset-0 flex items-center justify-center">
        <PulseLoader size={14} color={"#fff"} />
      </div>
  )
}

export default loading