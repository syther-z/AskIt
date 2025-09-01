import React from 'react'

const Page = ({ children }) => {
    return (
        <div className={`w-full h-full  p-[20px] m-0 overflow-y-scroll`}>
            {children}
        </div>
    )
}

export default Page