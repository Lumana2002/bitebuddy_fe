import React from 'react'
import { UtensilsCrossed } from 'lucide-react'

const Divider = () => {
    return (
        <div className="flex items-center justify-center gap-3 w-full my-8">
            <div className="flex-1 h-px bg-gray-300" />
            <UtensilsCrossed className="w-5 h-5 text-amber-500" />
            <div className="flex-1 h-px bg-gray-300" />
        </div>

    )
}

export default Divider