import React, { useEffect, useState } from 'react'

const useDebounce = (value, delay = 500) => {
    const [debounceValue, serDeBounceValue] = useState(value);

    useEffect(() => {
        const timeOut = setTimeout(() => {
            serDeBounceValue(value)
        }, delay);

        return () => {
            clearTimeout(timeOut)
        }
    }, [value, delay])

    return debounceValue;
}

export default useDebounce;