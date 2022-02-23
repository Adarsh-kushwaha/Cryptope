import React from 'react'

const Loader = () => {
    return (
        <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-25 w-25 border-b-2 border-blue-700" />
        </div>
    )
}

export default Loader