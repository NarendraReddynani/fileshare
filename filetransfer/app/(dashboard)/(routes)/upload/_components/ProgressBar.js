import React from 'react'

function ProgressBar({progress}) {
  return (
    <div className='bg-gray-400 w-full h-6 mt-4 rounded-full'>
        <div className=' bg-green-400 rounded-full h-6 text-[20px]'
        style={{width:`${progress}%`}}>
            {`${Number(progress).toFixed(0)}%`}
        </div>
    </div>
  )
}

export default ProgressBar